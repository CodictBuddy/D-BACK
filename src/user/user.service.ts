import { IRoleAssignmentModel } from './../role/schema/role-assignment.schema';
// import { UserSuggestionService } from "./../user-suggestion/user-suggestion.service";
// import { IInvitationModel } from "./../invitation/schema/invitation.schema";
// import { activitiesInterface } from "./../activities/schema/activities.schema";
// import { IGroupMemberModel } from "./../group/schema/group-member.schema";
// import { ICategoryModel } from "./../category/schema/category.schema";
// import { RatingsService } from "./../ratings/ratings.service";
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppException } from 'src/shared/app-exception';
import { IUserModel } from '../user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { SharedService } from 'src/shared/shared.service';
// import * as sendinblue from '../api/sendinblue';
// const sendinblue = require('../api/sendinblue');

var SibApiV3Sdk = require('sib-api-v3-typescript');

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Configure API key authorization: api-key

var apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey =
  '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';

// Configure API key authorization: partner-key

var partnerKey = apiInstance.authentications['partnerKey'];
partnerKey.apiKey =
  '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';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<IUserModel>,
    private sservice: SharedService,
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
      code: Math.floor(100000 + Math.random() * 900000),
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
        .then(r => {
          console.log('res here', r);
        });
    }, 180000);
    // trigger mail here with email id and code passed

    // this.triggerMail(createdUser);
    return createdUser; //'record created successfully';
  }

  async verifyCode(data, organization_code) {
    let userData = await this.userModel.findOne({
      _id: data._id,
      organization_code,
    });

    if (userData && data['code'] === userData.code) {
      console.log('coming in if block 1');
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
    if (!userData)
      throw new AppException('no data found', HttpStatus.NOT_FOUND);
    if (userData.retry === 3) {
      await this.userModel.deleteOne({ _id: userData, organization_code });
      throw new AppException(
        'please try again after some time',
        HttpStatus.FORBIDDEN,
      );
    }
    if (userData.retry >= 0 && userData.retry < 3) {
      counter = userData.retry + 1;
      // trigger code email
    }

    await this.userModel.updateOne(
      {
        _id: userData._id,
        organization_code,
      },
      { retry: counter },
    );
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
    this.sendinblue(sendSmtpEmail);
  }

  sendinblue(sendSmtpEmail) {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function(data) {
        console.log('data for email', data);
        return true;
      },
      function(error) {
        console.error(error);
        return false;
      },
    );
  }
}
