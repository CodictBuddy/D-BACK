import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface IConnectionsModel extends mongoose.Document {
  organization_code?: number;
  type?: string;
  user_id?: string;
  target_user_id?: string;
  connection_status?: string;
}
export const connectionsSchema = new mongoose.Schema(
  {
    organization_code: {
      type: Number,
    },
    type: { type: String, example: 'connection/following/block' },
    user_id: { type: obj_id, ref: 'user' },
    target_user_id: { type: obj_id, ref: 'user' },
    connection_status: {
      type: String,
      default: 'Pending',
      example: 'Accepted/Rejected/Blocked',
    },
  },
  {
    collection: 'connections',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
