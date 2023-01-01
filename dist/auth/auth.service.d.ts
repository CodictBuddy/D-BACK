import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IUserModel } from 'src/user/schema/user.schema';
import { IUserActionModel } from 'src/user/schema/userAction.schema';
export declare class AuthService {
    private jwtService;
    private User;
    private UserAction;
    constructor(jwtService: JwtService, User: Model<IUserModel>, UserAction: Model<IUserActionModel>);
    validateUser(user_email: string, pass: string): Promise<any>;
    checkUser(user_email: string, password: string): Promise<IUserModel>;
    getDuration(attempt: any, activity: any): Promise<number>;
    checkLoginAttempts(user: any, activity: any): Promise<number>;
    loginUser(credentials: any, organization_code: any): Promise<{
        access_token: string;
        user: Pick<import("mongoose")._LeanDocument<IUserModel>, "_id" | "__v" | "id" | "organization_code" | "code" | "password" | "first_name" | "last_name" | "retry" | "user_email" | "user_profile_image" | "user_background_image" | "user_notification_token" | "temp_password" | "user_role" | "user_dob" | "user_gender" | "user_account_status" | "user_account_verification" | "user_password_history" | "user_about" | "user_headline" | "user_password_secret" | "user_password_secret_expires">;
    }>;
    generateToken(user: IUserModel): Promise<{
        access_token: string;
        user: Pick<import("mongoose")._LeanDocument<IUserModel>, "_id" | "__v" | "id" | "organization_code" | "code" | "password" | "first_name" | "last_name" | "retry" | "user_email" | "user_profile_image" | "user_background_image" | "user_notification_token" | "temp_password" | "user_role" | "user_dob" | "user_gender" | "user_account_status" | "user_account_verification" | "user_password_history" | "user_about" | "user_headline" | "user_password_secret" | "user_password_secret_expires">;
    }>;
    createPasswordHash(data: any): string;
}
