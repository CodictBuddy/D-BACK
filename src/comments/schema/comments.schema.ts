import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface ICommentsModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    created_by?: string;
    content_id?: string;
    comment_data?: string;
}
export const commentsSchema = new mongoose.Schema(
    {
        organization_code: {
            type: Number,
        },
        type: { type: String, example: 'content/comment/profile' },
        created_by: { type: obj_id, ref: 'user' },
        content_id: { type: obj_id },
        content_data: { type: String },
    },
    {
        collection: 'comments',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);
