import { UserToken } from 'src/user/dto/usertoken.dto';
import { SharedService } from './../shared/shared.service';
import { NotificationService } from './notification.service';
import { Response } from 'express';
export declare class NotificationController {
    private notiService;
    private sservice;
    constructor(notiService: NotificationService, sservice: SharedService);
    unreadList(res: any, token: UserToken, organization: any): Promise<any>;
    create(token: UserToken, organization: any, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    update(token: UserToken, organization: any, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    remove(token: UserToken, organization: any, notification_id: any, notification_type: any, res: Response): Promise<Response<any, Record<string, any>>>;
    list(res: any, token: UserToken, organization: any, skip: any, limit: any): Promise<any>;
}
