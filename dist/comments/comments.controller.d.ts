import { SharedService } from 'src/shared/shared.service';
import { UserToken } from 'src/user/dto/usertoken.dto';
import { CommentsService } from './comments.service';
export declare class CommentsController {
    private commentsService;
    private sservice;
    constructor(commentsService: CommentsService, sservice: SharedService);
    create(res: any, token: UserToken, organization: any, body: any): Promise<any>;
    update(res: any, token: UserToken, organization: any, id: any, body: any): Promise<any>;
    list(res: any, token: UserToken, organization: any, content_id: string): Promise<any>;
    remove(res: any, token: UserToken, organization: any, id: any): Promise<any>;
}
