import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface IChatMessageModel extends mongoose.Document {
  organization_code?: number;
    room_id?: any;
    sender_id?: any;
    receiver_id?: any;
    content?: string;
    message_type?: string;
    message_status?: string;
    attachments?: string[];
    delete_type?: string;
    is_delete?: boolean;
  }
  
  export const ChatMessageSchema = new mongoose.Schema(
    {
      organization_code: {
        type: Number,
      },
      room_id: { type: obj_id, ref: "room" },
      sender_id: { type: obj_id, ref: "user" },
      receiver_id: { type: obj_id, ref: "user" },
      content: { type: String },
      message_type: {
        type: String,
        default: "conversation",
        example: "notification/conversation",
      },
      message_status: { type: String, default: "New", example: "read/delivered" },
      attachments: [{ type: String }],
      delete_type: { type: String },
      is_delete: { type: Boolean, default: false },
    },
    {
      collection: "chat-message",
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
  );
  