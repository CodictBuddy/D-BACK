import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface IChatRoomModel extends mongoose.Document {
  organization_code?: number;
  room_name?: string;
  recent_message?: number;
  room_cat?: string;
  room_type?: string;
  members?: any[];
  created_by?: string;
}
export const ChatRoomSchema = new mongoose.Schema(
  {
    organization_code: {
      type: Number,
    },
    room_name: { type: String },
    recent_message: { type: Number },
    room_cat: {
      type: 'String',
      example: 'Group/individual',
      default: 'individual',
    },
    room_type: { type: String, example: 'Private/Room', default: 'Private' },
    members: [{ type: obj_id, ref: 'user' }],
    created_by: { type: String },
  },
  {
    collection: 'chat-room',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
