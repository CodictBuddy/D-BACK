import * as mongoose from 'mongoose';
export interface IPostModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    created_by?: string;
    title?: string;
    content?: string;
}
export declare const postSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
