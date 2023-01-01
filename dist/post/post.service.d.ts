import { Model } from 'mongoose';
import { ConnectionsService } from 'src/connections/connections.service';
import { NotificationService } from 'src/notification/notification.service';
import { IPostModel } from './schema/post.schema';
export declare class PostService {
    private postModel;
    private notificationService;
    private connectionService;
    constructor(postModel: Model<IPostModel>, notificationService: NotificationService, connectionService: ConnectionsService);
    getMyPostList(organization_code: any, token: any, body: any): Promise<{
        posts: IPostModel[];
        count: number;
    }>;
    getAllPostList(organization_code: any, token: any, body: any): Promise<{
        posts: Pick<import("mongoose")._LeanDocument<IPostModel>, "_id" | "__v" | "id" | "organization_code" | "type" | "created_by" | "title" | "content">[];
        count: number;
    }>;
    getDetail(organization_code: any, token: any, post_id: any): Promise<{
        post: IPostModel;
        isSelfPost: boolean;
    }>;
    create(organization_code: any, token: any, body: any): Promise<IPostModel>;
    update(organization_code: any, token: any, body: any): Promise<IPostModel>;
    remove(organization_code: any, token: any, post_id: any): Promise<{
        message: string;
    }>;
}
