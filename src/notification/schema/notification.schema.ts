import * as mongoose from 'mongoose';
import { obj_id } from '../../utils/common.constants';

export interface INotificationModel extends mongoose.Document {
  organization_code: number;
  sender_id?: string;
  target_user_id?: string;
  notification_type?: any;
  notification_message?: string;
  navigation_url?: string;
  isRead: boolean;
  isNewNotification: boolean;
}
export const notificationSchema = new mongoose.Schema(
  {
    organization_code: {
      type: Number,
    },
    user_id: { type: obj_id, ref: 'user' },
    target_user_id: { type: obj_id, ref: 'user' },
    navigation_url: { type: String, example: '/connections/id' },
    type: {
      type: String,
      default: 'Action',
      example: 'Action/Connection/Post',
    },
    notification_message: { type: String },
    isRead: { type: Boolean, default: false },
    isNewNotification: { type: Boolean, default: true },
  },
  {
    collection: 'notification',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);
