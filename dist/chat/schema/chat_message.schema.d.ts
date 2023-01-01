import * as mongoose from 'mongoose';
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
export declare const ChatMessageSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
