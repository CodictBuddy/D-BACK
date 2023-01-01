import * as mongoose from 'mongoose';
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
export declare const notificationSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
