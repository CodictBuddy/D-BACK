import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { UserService } from './user.service';
import { GetToken } from 'src/shared/decorator/getuser.decorator';
import { UserToken } from './dto/usertoken.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Post('forgotPassword')
  async forgotPassword(
    @Body() body: any,
    @Res() res: any,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.forgotPassword(body, +organization);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @Post('resetPassword')
  async resetPassword(
    @Body() body: any,
    @Res() res: any,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.resetPassword(body, +organization);
      return res.json(data);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name,
      );
      return res.status(code).send(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchUser(
    @Body() body: any,
    @Res() res: any,
    @GetToken() token: UserToken,
    @Param('organization_portal_name') organization,
  ) {
    try {
      let data = await this.userService.updateProfile(body, +organization ,token);
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

}
