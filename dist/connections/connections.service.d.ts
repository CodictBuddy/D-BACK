import { NotificationService } from './../notification/notification.service';
import { socketGateway } from './../utils/socket/socket-gateway.service';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SharedService } from 'src/shared/shared.service';
import { UtilsService } from 'src/utils/utils.service';
import { IConnectionsModel } from './schema/connections.schema';
export declare class ConnectionsService {
    private connModel;
    private sservice;
    private utilsService;
    private aservice;
    private socket;
    private notificationService;
    constructor(connModel: Model<IConnectionsModel>, sservice: SharedService, utilsService: UtilsService, aservice: AuthService, socket: socketGateway, notificationService: NotificationService);
    getConnectionList(organization_code: any, token: any, connection_status: any, type: any, view_type: any): Promise<{
        connections: Pick<import("mongoose")._LeanDocument<IConnectionsModel>, "_id" | "__v" | "id" | "organization_code" | "type" | "user_id" | "target_user_id" | "connection_status">[];
    }>;
    getDetail(organization_code: any, token: any, body: any): Promise<IConnectionsModel>;
    create(organization_code: any, token: any, body: any): Promise<IConnectionsModel>;
    update(organization_code: any, token: any, body: any): Promise<IConnectionsModel>;
    remove(organization_code: any, token: any, body: any): Promise<IConnectionsModel>;
}
