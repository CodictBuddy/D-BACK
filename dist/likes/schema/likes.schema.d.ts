import * as mongoose from 'mongoose';
export interface ILikesModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    created_by?: string;
    content_id?: string;
}
export declare const likesSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
