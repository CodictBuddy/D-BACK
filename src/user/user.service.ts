import { UtilsService } from './../utils/utils.service';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppException } from 'src/shared/app-exception';
import { IUserModel } from '../user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<IUserModel>,
    private sservice: SharedService,
    private utilsService: UtilsService,
  ) {}

  async findByLogin(userDto: LoginDto) {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ 'user_email.email': email });
    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
  }

  async signUp(body, organization_code) {
    const user = await this.userModel.findOne({
      organization_code: organization_code,
      'user_email.email': body.email,
    });

    if (user)
      throw new AppException('User already exist', HttpStatus.BAD_REQUEST);

    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(body.password, salt);

    let fv = {
      organization_code: organization_code,
      first_name: [
        {
          description: body.first_name,
          language: body.lng,
        },
      ],
      last_name: [
        {
          description: body.last_name,
          language: body.lng,
        },
      ],
      code: this.sservice.random6DigitCodeGenerator(),
      user_email: {
        type: 'primary',
        email: body.email,
      },
      password: hashed,
    };

    let createdUser = await this.userModel.create(fv);

    setTimeout(() => {
      this.userModel
        .updateOne({ _id: createdUser._id }, { code: null })
        .then(() => console.log('updated code'));
    }, 180000);

    this.triggerMail(createdUser);
    return createdUser; //'record created successfully';
  }

  async verifyCode(data, organization_code) {
    let userData = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });

    if (userData && data['code'] === userData.code) {
      await this.userModel.updateOne(
        { _id: userData._id },
        { code: null, 'user_email.verification': true },
      );
      return { status: 'verified' };
    }
    if (userData && data.code != userData.code) {
      console.log(
        'both code tracking here',
        data.code,
        'userData',
        userData.code,
      );
      throw new AppException(
        'the entered code is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async retryCode(data, organization_code) {
    let userData = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });
    let counter = 0;
    let code = this.sservice.random6DigitCodeGenerator();
    if (!userData)
      throw new AppException('no data found', HttpStatus.NOT_FOUND);
    if (userData.retry === 3) {
      await this.userModel.deleteOne({ _id: userData._id, organization_code });
      throw new AppException(
        'please try again after some time',
        HttpStatus.FORBIDDEN,
      );
    }
    if (userData.retry >= 0 && userData.retry < 3) {
      counter = userData.retry + 1;
      // trigger code email
    }

    const uData = await this.userModel.updateOne(
      {
        _id: userData._id,
        organization_code,
      },
      { retry: counter, code },
    );
    if (uData) {
      setTimeout(() => {
        this.userModel
          .updateOne({ _id: userData._id }, { code: null })
          .then(r => {
            console.log('res here', r);
          });
      }, 180000);
    }

    let latestCodeData = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });
    if (latestCodeData) {
      console.log('code', code, 'user info', latestCodeData.code);

      this.triggerMail(latestCodeData);
    }
    return { status: 'new code sent successfully' };
  }

  async triggerMail(data) {
    // https://api.sendinblue.com/v3/smtp/email
    let sendSmtpEmail = {
      to: [
        {
          email: data.user_email.email,
        },
      ],
      templateId: 1,
      params: {
        name: 'Malith',
        subject: 'Someone sent you a link',
        // code:data.code,
        text: data.code,
      },
    };
    await this.utilsService.sendinblue(sendSmtpEmail);
  }
}
