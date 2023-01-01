import * as mongoose from "mongoose";
export interface IUserActionModel extends mongoose.Document {
    user_id: any;
    identity: any;
    activity: string;
    attempts: number;
    ip_address: string;
    last_attempt_on: number;
    createdOn: number;
    updatedOn: number;
}
export declare const UserActionSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
