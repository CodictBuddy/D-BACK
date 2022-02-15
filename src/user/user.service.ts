import { AuthService } from './../auth/auth.service';
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
    private aservice: AuthService,
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

    const hashed = await this.aservice.createPasswordHash(body);

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

      user_email: {
        type: 'primary',
        email: body.email,
      },
      password: hashed,
    };

    let createdUser = await this.userModel.create(fv);

    const d = await this.resetCodeGeneratorDB(createdUser);
    if (d) {
      this.triggerMail(d);
    }
    return await this.aservice.generateToken(d);
  }
  /**
   * get the user profile  function
   */
  async getProfile(user_id, organization_code, token) {
    const userMeta = {};
    const user = await this.userModel
      .findOne({
        _id: user_id,
        organization_code,
      })
      .lean()
      .select({
        user_account_status: 1,
        first_name: 1,
        last_name: 1,
        user_email: 1,
        user_phone_number: 1,
        user_dob: 1,
        user_gender: 1,
        user_about: 1,
        user_headline: 1,
        user_profile_image: 1,
        user_background_image: 1,
      })
      .populate('user_profile_image', {
        public_id: 1,
        url: 1,
        type: 1,
      })
      .populate('user_background_image', {
        public_id: 1,
        url: 1,
        type: 1,
      });
    if (!user)
      throw new AppException('User does not exist', HttpStatus.NOT_FOUND);

    userMeta['self'] = token.id === user_id;

    return { userMeta, user };
  }

  /**
   *
   * suggested users list based on users activities
   */

  async suggestions(organization_code, token) {
    const user = await this.userModel
      .find({
        organization_code: organization_code,
        _id: { $eq: token.id },
      })
      .select({
        first_name: 1,
        last_name: 1,
        user_email: 1,
        user_headline: 1,
        user_profile_image: 1,
      })
      .populate('user_profile_image', {
        url: 1,
        type: 1,
      });

    return { user };
  }

  async updateProfile(body, organization_code, token) {
    const user = await this.userModel.findOne({
      organization_code: organization_code,
      _id: token.id,
    });

    if (!user)
      throw new AppException('User does not exist', HttpStatus.NOT_FOUND);

    let fv = { updated_at: new Date().toISOString() };
    if (body.hasOwnProperty('first_name')) {
      fv['first_name'] = [
        {
          description: body.first_name,
          language: body.lng,
        },
      ];
    }

    if (body.hasOwnProperty('last_name')) {
      fv['last_name'] = [
        {
          description: body.last_name,
          language: body.lng,
        },
      ];
    }

    if (body.hasOwnProperty('user_profile_image')) {
      fv['user_profile_image'] = body.user_profile_image;
    }

    if (body.hasOwnProperty('user_background_image')) {
      fv['user_background_image'] = body.user_background_image;
    }

    if (body.hasOwnProperty('user_dob')) {
      fv['user_dob'] = body.user_dob;
    }
    if (body.hasOwnProperty('user_gender')) {
      fv['user_gender'] = body.user_gender;
    }

    if (body.hasOwnProperty('user_account_status')) {
      fv['user_account_status'] = body.user_account_status;
    }

    if (body.hasOwnProperty('user_about')) {
      fv['user_about'] = {
        description: body.user_about,
        language: body.lng,
      };
    }

    if (body.hasOwnProperty('user_headline')) {
      fv['user_headline'] = {
        description: body.user_headline,
        language: body.lng,
      };
    }

    await this.userModel.updateOne({ organization_code, _id: token.id }, fv, {
      new: true,
    });

    const d = await this.userModel.findOne({
      _id: token.id,
      organization_code,
    });

    return await this.aservice.generateToken(d);
  }

  async forgotPassword(data, organization_code) {
    let foundUser = await this.userModel.findOne({
      'user_email.email': data.email,
      organization_code,
    });

    if (!foundUser)
      throw new AppException('user does not exist', HttpStatus.NOT_FOUND);

    if (foundUser) {
      const data = await this.resetCodeGeneratorDB(foundUser);
      if (data) {
        this.triggerMail(data);
      }
    }
    return { _id: foundUser._id };
  }

  async resetPassword(data, organization_code) {
    const hashed = this.aservice.createPasswordHash(data);
    if (!hashed)
      throw new AppException(
        'no hashed created',
        HttpStatus.EXPECTATION_FAILED,
      );
    await this.userModel.updateOne(
      { _id: data._id, organization_code },
      { password: hashed },
    );

    const d = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });
    if (!d) throw new AppException('invalid credentials', HttpStatus.NOT_FOUND);
    return this.aservice.generateToken(d);
  }

  async resetCodeGeneratorDB(data) {
    const code = this.sservice.random6DigitCodeGenerator();
    const uData = await this.userModel.updateOne(
      { _id: data._id, organization_code: data.organization_code },
      { code },
    );
    if (uData) {
      setTimeout(() => {
        this.userModel
          .updateOne({ _id: data._id }, { code: null })
          .then(r => {});
      }, 180000);
    }

    return await this.userModel.findOne({
      _id: data._id,
      organization_code: data.organization_code,
    });
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
          .then(r => {});
      }, 180000);
    }

    let latestCodeData = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });
    if (latestCodeData) {
      this.triggerMail(latestCodeData);
    }
    return { status: 'new code sent successfully' };
  }

  async triggerMail(data) {
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
