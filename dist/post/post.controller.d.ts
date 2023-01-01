import { UserToken } from 'src/user/dto/usertoken.dto';
import { SharedService } from './../shared/shared.service';
import { Response } from 'express';
import { PostService } from './post.service';
export declare class PostController {
    private postService;
    private sservice;
    constructor(postService: PostService, sservice: SharedService);
    myPostlist(res: Response, token: UserToken, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    list(res: Response, token: UserToken, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    create(token: UserToken, organization: any, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    update(res: Response, token: UserToken, organization: any, body: any): Promise<Response<any, Record<string, any>>>;
    getDetail(res: Response, token: UserToken, organization: any, post_id: string): Promise<Response<any, Record<string, any>>>;
    remove(res: Response, token: UserToken, organization: any, post_id: any): Promise<Response<any, Record<string, any>>>;
}
