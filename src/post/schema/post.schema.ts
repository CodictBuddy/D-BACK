import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface IPostModel extends mongoose.Document {
  organization_code?: number;
  type?: string;
  created_by?: string;
  title?: string;
  content?: string;
}
export const postSchema = new mongoose.Schema(
  {
    organization_code: {
      type: Number,
    },
    type: { type: String, example: 'Anyone/Connections' },
    created_by: { type: obj_id, ref: 'user' },
    title: { type: String, require: true },
    content: { type: String, require: true },
  },
  {
    collection: 'post',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
