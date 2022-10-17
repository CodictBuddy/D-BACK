import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface ILikesModel extends mongoose.Document {
    organization_code?: number;
    type?: string;
    created_by?: string;
    content_id?: string;
}
export const likesSchema = new mongoose.Schema(
    {
        organization_code: {
            type: Number,
        },
        type: { type: String, example: 'content/comment/profile' },
        created_by: { type: obj_id, ref: 'user' },
        content_id: { type: obj_id },
    },
    {
        collection: 'likes',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);
