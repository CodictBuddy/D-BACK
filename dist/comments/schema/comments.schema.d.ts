import * as mongoose from 'mongoose';
export interface ICommentsModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    created_by?: string;
    content_id?: string;
    comment_data?: string;
}
export declare const commentsSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
