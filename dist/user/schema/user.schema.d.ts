import * as mongoose from 'mongoose';
export interface ILanguageModel {
    description?: string;
    language?: string;
}
export declare const LanguageSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface IEmailModel {
    type?: string;
    email?: string;
    visibility?: string;
    addedOn?: string | Date;
    verification?: boolean;
    verifiedOn?: string | Date;
}
export declare const EmailSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface IPhoneNumberModel {
    type?: string;
    country?: string;
    ext?: string;
    phone_number?: string;
    visibility?: string;
    addedOn?: string | Date;
    verification?: boolean;
    verifiedOn?: string | Date;
}
export declare const PhoneNumberSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface IAddressModel {
    type?: string;
    address_line_one?: string;
    address_line_two?: string;
    city?: string;
    state?: string;
    country?: string;
    visibility?: string;
    pincode?: string;
}
export declare const AddressSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface IPasswordHistoryModel {
    password?: string;
    updatedOn?: Date;
}
export declare const PasswordHistorySchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export declare const MediaSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface IUserModel extends mongoose.Document {
    organization_code: Number;
    first_name?: ILanguageModel[];
    last_name?: ILanguageModel[];
    retry: number;
    code: number;
    user_profile_image?: string;
    user_background_image?: string;
    user_email?: any;
    user_role?: string;
    user_dob?: string;
    user_gender?: string;
    user_account_status?: string;
    user_account_verification?: boolean;
    user_password_history?: IPasswordHistoryModel[];
    user_password_secret?: number;
    user_password_secret_expires?: number;
    user_about?: ILanguageModel;
    user_headline?: ILanguageModel;
    password?: string;
    temp_password?: string;
    user_notification_token?: string;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
