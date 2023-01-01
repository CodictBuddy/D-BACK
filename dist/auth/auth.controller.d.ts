import { AuthService } from './auth.service';
import { SharedService } from 'src/shared/shared.service';
import { Response } from 'express';
import { UserToken } from 'src/user/dto/usertoken.dto';
export declare class AuthController {
    private auth;
    private sservice;
    constructor(auth: AuthService, sservice: SharedService);
    login(req: any, res: Response, body: any, organization: any): Promise<Response<any, Record<string, any>>>;
    validateToken(token: UserToken, body: any): Promise<{
        token: UserToken;
    }>;
    tokenPermissionCheck(success: string, failure: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
