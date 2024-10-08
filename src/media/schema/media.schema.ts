import * as mongoose from 'mongoose';

import { obj_id } from '../../utils/common.constants';

export interface IMediaModel extends mongoose.Document {
  organization_code?: any;
  public_id: string;
  user_id: string;
  url: string;
  type: string;
  created_by: string;
  updated_by?: string;
}
export const mediaSchema = new mongoose.Schema(
  {
    organization_code: { type: String },
    public_id: { type: String },
    user_id: {
      type: obj_id,
      ref: 'user',
    },
    url: { type: String },
    type: { type: String },
    created_by: { type: String },
    updated_by: { type: String },
  },
  {
    collection: 'media',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
