import { SharedService } from 'src/shared/shared.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { LikesService } from './likes.service';
export declare class LikesController {
    private likesService;
    private sservice;
    constructor(likesService: LikesService, sservice: SharedService);
    create(res: any, token: UserToken, organization: any, body: any): Promise<any>;
    list(res: any, token: UserToken, organization: any, content_id: string): Promise<any>;
    remove(res: any, token: UserToken, organization: any, content_id: any): Promise<any>;
}
