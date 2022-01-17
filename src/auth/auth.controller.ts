import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Res,
  Get,
  Req,
  Param,
  Query,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { SharedService } from "src/shared/shared.service";
import { Response } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GetToken } from "src/shared/decorator/getuser.decorator";
import { AppException } from "src/shared/app-exception";
import { UserToken } from "src/user/dto/usertoken.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller(":organization_portal_name/auth")
export class AuthController {
  constructor(private auth: AuthService, private sservice: SharedService) {}
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res() res: Response, @Body() body: any, @Param('organization_portal_name') organization,) {
    try {
      let token = await this.auth.loginUser(body ,+organization);
      return res.status(200).send(token);
    } catch (err) {
      const { code, response } = this.sservice.processError(
        err,
        this.constructor.name
      );
      return res.status(code).send(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("validate-user")
  async validateToken(@GetToken() token: UserToken, @Body() body: any) {
    let returnValue = { token };
    if (body.doAuthorityCheck) {
      // let filters = this.auth.authorityCheck(
      //   token,
      //   body.template,
      //   body.activity,
      //   body.fieldMapping
      // );
      // returnValue["filters"] = filters;
    }
    return returnValue;
  }


  @Get("loginstatus")
  async tokenPermissionCheck(
    @Query("success") success: string,
    @Query("failure") failure: string,
    @Res() res: Response
  ) {
    try {
      if (success) return res.json();
      if (failure) return res.json();
    } catch (err) {
      throw err;
    }
  }

}
