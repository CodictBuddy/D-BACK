import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";
import { SharedService } from "src/shared/shared.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private sservice: SharedService
  ) {
    super({
      usernameField: "user_email",
      passwordField: "password",
      // testField: "test"
    });
  }
  async validate(user_email: string, password: string): Promise<any> {
    try {
      console.log("user email here", user_email, password);
      const user = await this.authService.validateUser(user_email, password);
      // const user = null;
      if (!user) {
        console.log("error coming here");
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      const { code, response } = await this.sservice.processError(
        err,
        this.constructor.name
      );
      throw new HttpException(response, code);
    }
  }
}
