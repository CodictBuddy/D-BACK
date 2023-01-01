import { SharedService } from 'src/shared/shared.service';
import { UserService } from './user.service';
import { UserToken } from './dto/usertoken.dto';
export declare class UserController {
    private userService;
    private sservice;
    constructor(userService: UserService, sservice: SharedService);
    signUp(body: any, res: any, organization: any): Promise<any>;
    forgotPassword(body: any, res: any, organization: any): Promise<any>;
    resetPassword(body: any, res: any, organization: any): Promise<any>;
    suggestions(res: any, token: UserToken, organization: any): Promise<any>;
    get(user_id: string, res: any, token: UserToken, organization: any): Promise<any>;
    patchUser(body: any, res: any, token: UserToken, organization: any): Promise<any>;
    verifyEmail(body: any, res: any, organization: any): Promise<any>;
    resendCode(body: any, res: any, organization: any): Promise<any>;
}
