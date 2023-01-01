import * as mongoose from "mongoose";
export interface IRoleModel extends mongoose.Document {
    organization_id?: any;
    role_code: string;
    role_description: string;
    status: string;
    created_by: string;
    updated_by?: string;
    is_system?: boolean;
}
export declare const roleSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
