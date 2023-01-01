import { UserService } from './../user/user.service';
import { socketGateway } from './../utils/socket/socket-gateway.service';
import { SharedService } from 'src/shared/shared.service';
import { Model } from 'mongoose';
import { INotificationModel } from './schema/notification.schema';
export declare class NotificationService {
    private notificationModel;
    private userService;
    private sservice;
    private socket;
    constructor(notificationModel: Model<INotificationModel>, userService: UserService, sservice: SharedService, socket: socketGateway);
    create(organization_code: any, token: any, body: any): Promise<void>;
    update(organization_code: any, token: any, body: any): Promise<INotificationModel>;
    remove(organization_code: any, token: any, body: any): Promise<INotificationModel>;
    getList(organization_code: any, token: any, body: any): Promise<{
        notifications: INotificationModel[];
        count: number;
    }>;
    getUnreadList(organization_code: any, token: any): Promise<{
        notifications: INotificationModel[];
        count: number;
    }>;
    triggerPushNotifications(notification_title: any, notification_message: any, toUserId: any, organization_code: any): Promise<void>;
}
