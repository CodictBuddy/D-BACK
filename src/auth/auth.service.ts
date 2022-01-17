import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppException } from 'src/shared/app-exception';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserModel } from 'src/user/schema/user.schema';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { IUserActionModel } from 'src/user/schema/userAction.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('user') private User: Model<IUserModel>,

    @InjectModel('userAction') private UserAction: Model<IUserActionModel>,
  ) {}
  async validateUser(user_email: string, pass: string): Promise<any> {
    try {
      const user = await this.checkUser(user_email, pass);

      if (!user) return null;
      return user;
      //return null - unauthorized
      //return user - next go getnerate token
    } catch (err) {
      throw err;
    }
  }
  async checkUser(user_email: string, password: string): Promise<IUserModel> {
    try {
      let user = await this.User.findOne({ 'user_email.email': user_email });

      if (!user)
        throw new AppException(
          'Credentials not matched',
          HttpStatus.UNAUTHORIZED,
        );
      let attempts = await this.checkLoginAttempts(
        user._id,
        'loginFailureAttempts',
      );

      let checkPassword = bcrypt.compare(password, user.password);
      if (checkPassword) {
        await this.UserAction.findOneAndUpdate(
          {
            user_id: user._id,
            activity: 'loginFailureAttempts',
            identity: user.user_email._id,
          },
          { $set: { attempts: 0, last_attempt_on: 0 } },
        );
        return user;
      } else {
        let updatedData = await this.UserAction.findOneAndUpdate(
          {
            user_id: user._id,
            activity: 'loginFailureAttempts',
            identity: user.user_email._id,
          },
          { $set: { $inc: { attempts: 1 }, last_attempt_on: Date.now() } },
          { upsert: true, new: true },
        );

        return null;
      }
    } catch (err) {
      throw err;
    }
  }
  async getDuration(attempt, activity) {
    let data = {}; // await this.ConfigurationModel.findOne({});
    let configurationData = {}; // data.configurations[activity];
    // for (var i = 0; i < configurationData?.length; i++) {
    //   let ele = configurationData[i];
    //   if (attempt >= ele.condition.gte && attempt <= ele.condition.lte) {
    //     ele.duration;
    //   }
    // }
    return 0;
  }
  async checkLoginAttempts(user, activity) {
    let loginAttempts = await this.UserAction.findOne({
      user_id: user.user_id,
      activity: activity,
    });
    if (loginAttempts) {
      let duration = await this.getDuration(
        loginAttempts.attempts,
        loginAttempts.activity,
      );
      let delay = Date.now() - loginAttempts.last_attempt_on;
      if (delay < duration) {
        let remaining = duration - delay;
        let minutes = Math.round(remaining / 60000);
        throw new AppException(
          'Your Account is locked due to you exceed the limit,Retry after' +
            ' ' +
            `${minutes}`,
          +'Minutes' + HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } else return 0;
  }

  async loginUser(credentials, organization_code) {
    try {
      let data = await this.User.findOne({
        'user_email.email': credentials.user_email,
        organization_code,
      });

      if (!data) {
        throw new AppException(
          'no user fount with these credentials',
          HttpStatus.NOT_FOUND,
        );
      }

      let checkPassword = await bcrypt.compare(
        credentials.password,
        data.password,
      );

      if (!checkPassword) {
        throw new AppException('Incorrect password', HttpStatus.BAD_REQUEST);
      }

      return await this.generateToken(data);
    } catch (err) {
      throw err;
    }
  }

  async generateToken(user: IUserModel) {
    try {
      let data = await this.User.findOne({ _id: user._id })
        .lean()
        .select({
          _id: 1,
          first_name: 1,
          last_name: 1,
          user_phone_number: 1,
          user_dob: 1,
          user_gender: 1,
          user_about: 1,
        });

      const payload: UserToken = {
        id: user._id,
        email: user.user_email.email,
      };

      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.JWT_EXPIRATION,
        }),

        user: data,
      };
    } catch (err) {
      throw err;
    }
  }

  createPasswordHash(data) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data.password, salt);
  }
}
