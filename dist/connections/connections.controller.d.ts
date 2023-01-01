import { SharedService } from 'src/shared/shared.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { ConnectionsService } from './connections.service';
export declare class ConnectionsController {
    private connService;
    private sservice;
    constructor(connService: ConnectionsService, sservice: SharedService);
    getDetail(res: any, token: UserToken, organization: any, body: any): Promise<any>;
    create(res: any, token: UserToken, organization: any, body: any): Promise<any>;
    update(res: any, token: UserToken, organization: any, body: any): Promise<any>;
    remove(res: any, token: UserToken, organization: any, user_id: any, connection_type: any): Promise<any>;
    list(res: any, token: UserToken, organization: any, view_type: any, connection_status: any, connection_type: any): Promise<any>;
}
