import { AuthService } from './../auth/auth.service';
import { UtilsService } from './../utils/utils.service';
import { Model } from 'mongoose';
import { IUserModel } from '../user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { SharedService } from 'src/shared/shared.service';
export declare class UserService {
    private userModel;
    private sservice;
    private utilsService;
    private aservice;
    constructor(userModel: Model<IUserModel>, sservice: SharedService, utilsService: UtilsService, aservice: AuthService);
    findByLogin(userDto: LoginDto): Promise<IUserModel>;
    signUp(body: any, organization_code: any): Promise<any>;
    getProfile(user_id: any, organization_code: any, token: any): Promise<{
        userMeta: {};
        user: Pick<import("mongoose")._LeanDocument<IUserModel>, "password" | "organization_code" | "first_name" | "last_name" | "retry" | "code" | "user_profile_image" | "user_background_image" | "user_email" | "user_role" | "user_dob" | "user_gender" | "user_account_status" | "user_account_verification" | "user_password_history" | "user_password_secret" | "user_password_secret_expires" | "user_about" | "user_headline" | "temp_password" | "user_notification_token" | "_id" | "__v" | "id">;
    }>;
    suggestions(organization_code: any, token: any): Promise<{
        user: IUserModel[];
    }>;
    updateProfile(body: any, organization_code: any, token: any): Promise<{
        access_token: string;
        user: Pick<import("mongoose")._LeanDocument<IUserModel>, "password" | "organization_code" | "first_name" | "last_name" | "retry" | "code" | "user_profile_image" | "user_background_image" | "user_email" | "user_role" | "user_dob" | "user_gender" | "user_account_status" | "user_account_verification" | "user_password_history" | "user_password_secret" | "user_password_secret_expires" | "user_about" | "user_headline" | "temp_password" | "user_notification_token" | "_id" | "__v" | "id">;
    }>;
    forgotPassword(data: any, organization_code: any): Promise<{
        _id: any;
    }>;
    resetPassword(data: any, organization_code: any): Promise<{
        access_token: string;
        user: Pick<import("mongoose")._LeanDocument<IUserModel>, "password" | "organization_code" | "first_name" | "last_name" | "retry" | "code" | "user_profile_image" | "user_background_image" | "user_email" | "user_role" | "user_dob" | "user_gender" | "user_account_status" | "user_account_verification" | "user_password_history" | "user_password_secret" | "user_password_secret_expires" | "user_about" | "user_headline" | "temp_password" | "user_notification_token" | "_id" | "__v" | "id">;
    }>;
    resetCodeGeneratorDB(data: any): Promise<IUserModel>;
    verifyCode(data: any, organization_code: any): Promise<{
        status: string;
    }>;
    retryCode(data: any, organization_code: any): Promise<{
        status: string;
    }>;
    triggerMail(data: any): Promise<void>;
    getUserById(userId: any, organization_code: any): Promise<{
        user: IUserModel;
    }>;
}
