import * as mongoose from 'mongoose';
export interface IMediaModel extends mongoose.Document {
    organization_code?: any;
    public_id: string;
    user_id: string;
    url: string;
    type: string;
    created_by: string;
    updated_by?: string;
}
export declare const mediaSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
