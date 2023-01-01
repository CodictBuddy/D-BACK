import { IChatMessageModel } from './schema/chat_message.schema';
import { IChatRoomModel } from './schema/chat_room.schema';
import { NotificationService } from './../notification/notification.service';
import { socketGateway } from './../utils/socket/socket-gateway.service';
import { UtilsService } from './../utils/utils.service';
import { SharedService } from './../shared/shared.service';
import { AuthService } from 'src/auth/auth.service';
import { Model } from 'mongoose';
export declare class ChatService {
    private cRoomModel;
    private cMessageModel;
    private sservice;
    private utilsService;
    private aservice;
    private socket;
    private notificationService;
    constructor(cRoomModel: Model<IChatRoomModel>, cMessageModel: Model<IChatMessageModel>, sservice: SharedService, utilsService: UtilsService, aservice: AuthService, socket: socketGateway, notificationService: NotificationService);
    createRoom(organization_code: any, token: any, body: any): Promise<IChatRoomModel>;
    removeRoom(organization_code: any, id: any): Promise<{
        message: string;
    }>;
    getRoomDetail(organization_code: any, token: any, body: any): Promise<Pick<import("mongoose")._LeanDocument<IChatRoomModel>, "_id" | "__v" | "id" | "organization_code" | "created_by" | "room_cat" | "room_type" | "room_name" | "recent_message" | "members"> | {
        message: string;
    }>;
    getChatList(organization_code: any, token: any, room_id: any): Promise<IChatMessageModel>;
    getMyRoomList(organization_code: any, token: any, skip?: number, limit?: number): Promise<Pick<import("mongoose")._LeanDocument<IChatRoomModel>, "_id" | "__v" | "id" | "organization_code" | "created_by" | "room_cat" | "room_type" | "room_name" | "recent_message" | "members">[]>;
    getMyRoomIdsList(organization_code: any, token: any): Promise<Pick<import("mongoose")._LeanDocument<IChatRoomModel>, "_id" | "__v" | "id" | "organization_code" | "created_by" | "room_cat" | "room_type" | "room_name" | "recent_message" | "members">[]>;
    newMessage(organization_code: any, token: any, body: any): Promise<IChatMessageModel>;
    getMessageList(organization_code: any, token: any, body: any): Promise<{
        messages: IChatMessageModel[];
        count: number;
    }>;
    updateMessage(organization_code: any, token: any, body: any): Promise<{
        message: string;
        updatedData?: undefined;
    } | {
        message: string;
        updatedData: IChatMessageModel;
    }>;
    deleteMessage(organization_code: any, token: any, body: any): Promise<{
        message: string;
        deletedData?: undefined;
    } | {
        message: string;
        deletedData: void;
    }>;
}
