import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Res,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
// import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { SharedService } from 'src/shared/shared.service';
import { UserService } from './user.service';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { UserToken } from './dto/usertoken.dto';
import { OnBoardUserDTO } from './dto/on-board-user.dto';
import { Response } from 'express';

@Controller(':organization_portal_name/user')
export class UserController {
  constructor(
    private userService: UserService,
    private sservice: SharedService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() body: any,
    @Res() res: any,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.signUp(body, +organization);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @Post('verify/email')
  async verifyEmail(
    @Body() body: any,
    @Res() res: any,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.verifyCode(body, +organization);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @Post('resend/code')
  async resendCode(
    @Body() body: any,
    @Res() res: any,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.retryCode(body, +organization);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  // @Post("create-user")
  // async createUser(
  //   @Body() body: any,
  //   @Res() res: any,
  //   @Param("organizationId") organizationId: string
  // ) {
  //   try {
  //     let data = await this.userService.createUser(body, organizationId);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("add-user")
  // async addUser(
  //   @Body() body: any,
  //   @Res() res: any,
  //   @Param("organizationId") organizationId: string
  // ) {
  //   try {
  //     let data = await this.userService.addUser(body, organizationId);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("invite-user")
  // async inviteUser(
  //   @Body() body: any,
  //   @Res() res: any,
  //   @Param("organizationId") organizationId: string
  // ) {
  //   try {
  //     let data = await this.userService.inviteUser(body, organizationId);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("onboard-user")
  // async onboardUser(@Body() body: OnBoardUserDTO, @Res() res: any) {
  //   try {
  //     let data = await this.userService.onboardUser(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post("get-user-list")
  // async getUserList(
  //   @Body() body: any,
  //   @Res() res: any,
  //   @GetToken() token: UserToken
  // ) {
  //   try {
  //     let data = await this.userService.getUserList(body, token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get("get-user-detail")
  // async getUserDetail(
  //   @Query("id") user_id,
  //   @Res() res: any,
  //   @GetToken() token: UserToken
  // ) {
  //   try {
  //     let data = await this.userService.getUserDetail(user_id, token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post("update-user-status")
  // async updateUserStatus(
  //   @Body() body: any,
  //   @Res() res: any,
  //   @GetToken() token: UserToken
  // ) {
  //   try {
  //     let data = await this.userService.updateUserStatus(body, token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get("get-user-profile")
  // async getUserProfile(@GetToken() token: UserToken, @Res() res: any) {
  //   try {
  //     let data = await this.userService.getUserProfile(token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post("update-user-profile")
  // async updateUserProfile(
  //   @GetToken() token: UserToken,
  //   @Body() body: any,
  //   @Res() res: Response
  // ) {
  //   try {
  //     let data = await this.userService.updateUserProfile(token, body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post("update-user-preference")
  // async updateUserPreference(
  //   @GetToken() token: UserToken,
  //   @Body() body: any,
  //   @Res() res: Response
  // ) {
  //   try {
  //     let data = await this.userService.updateUserPreference(token, body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Put("update-user")
  // updateUser(@Query("id") user_id, @Body() registerDto: CreateUserDTO) {
  //   return this.userService.updateUser(user_id, registerDto);
  // }

  // Delete a customer
  // @Delete("/delete")
  // deleteUser(@Query("id") user_id) {
  //   return this.userService.deleteUser(user_id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post("change-password")
  // async changePassword(
  //   @Body() body: any,
  //   @GetToken() token: UserToken,
  //   @Res() res: any
  // ) {
  //   try {
  //     let data = await this.userService.changePassword(body, token);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("forgot-password")
  // async forgotPassword(@Body() body: any, @Res() res: any) {
  //   try {
  //     let data = await this.userService.forgotPassword(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("verify-reset-code")
  // async checkSecretCode(@Body() body: any, @Res() res: any) {
  //   try {
  //     let data = await this.userService.checkSecretCode(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @Post("get-password-confirmation")
  // async getPasswordConfirmation(@Body() body: any, @Res() res: any) {
  //   try {
  //     let data = await this.userService.getPasswordConfirmation(body);
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch("update-user-notification-token/:id")
  // async updateUserNotificationToken(
  //   @Param("id") userId: string,
  //   @Res() res: Response,
  //   @Body() body: any
  // ) {
  //   try {
  //     let data = await this.userService.updateUserNotificationToken(
  //       userId,
  //       body
  //     );
  //     return res.json(data);
  //   } catch (err) {
  //     const { code, response } = this.sservice.processError(
  //       err,
  //       this.constructor.name
  //     );
  //     return res.status(code).send(response);
  //   }
  // }
  // @Post("verify-email")
  // async sendCode(@Body() payload) {
  //   return await this.userService.sendVerificationMail(payload);
  // }

  // @Post("verify-code")
  // async verifyCode(@Body() payload) {
  //   return await this.userService.verifyCode(payload);
  // }

  //   @Get("sendEmail")
  //   async sendEmail() {
  //     const email: mailDto = {
  //       mailTo: "ragavarvd@gmail.com",
  //       subject: "sample email to send",
  //       message: "this is the sample message",
  //       altText: "this is the alt text",
  //     };
  //     const message = await this.emailService.sendMail(email);
  //     console.log(message);
  //     return message;
  //   }

  // @Post('update-user')
  // updateUser(@Body() params:RegisterDto) {
  //     return this.userService.updateuser(params)
  // }
}
