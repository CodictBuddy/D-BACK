import * as mongoose from 'mongoose';
export interface IConnectionsModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    user_id?: string;
    target_user_id?: string;
    connection_status?: string;
}
export declare const connectionsSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
