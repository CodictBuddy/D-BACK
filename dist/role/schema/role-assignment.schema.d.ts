import * as mongoose from "mongoose";
export interface IRoleAssignmentModel extends mongoose.Document {
    organization_id?: any;
    user_id?: any;
    role_id?: any;
    created_by?: any;
    updated_by?: any;
}
export declare const roleAssignmentSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
