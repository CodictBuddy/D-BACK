import { UserToken } from './../user/dto/usertoken.dto';
import { SharedService } from './../shared/shared.service';
import { ChatService } from './chat.service';
import { Response } from 'express';
export declare class ChatController {
    private chatService;
    private sservice;
    constructor(chatService: ChatService, sservice: SharedService);
    newMessage(token: UserToken, res: Response, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    createRoom(token: UserToken, res: Response, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    getRoomDetail(res: Response, token: UserToken, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    getChatList(res: Response, token: UserToken, organization: any, roomId: any): Promise<Response<any, Record<string, any>>>;
    getRoomList(res: Response, organization: any, skip: any, limit: any, token: UserToken): Promise<Response<any, Record<string, any>>>;
    getRoomIdsList(res: Response, organization: any, token: UserToken): Promise<Response<any, Record<string, any>>>;
    getMessageList(token: UserToken, res: Response, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    updateMessage(token: UserToken, res: Response, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    deleteMessage(token: UserToken, res: Response, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    deleteRoom(res: Response, organization: any, id: string): Promise<Response<any, Record<string, any>>>;
}
