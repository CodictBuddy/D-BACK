import * as mongoose from 'mongoose';
export interface IChatRoomModel extends mongoose.Document {
    organization_code?: number;
    room_name?: string;
    recent_message?: number;
    room_cat?: string;
    room_type?: string;
    members?: any[];
    created_by?: string;
}
export declare const ChatRoomSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
