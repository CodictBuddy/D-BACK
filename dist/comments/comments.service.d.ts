import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { ICommentsModel } from './schema/comments.schema';
export declare class CommentsService {
    private commentsModel;
    private notificationService;
    constructor(commentsModel: Model<ICommentsModel>, notificationService: NotificationService);
    create(organization_code: any, token: any, body: any): Promise<ICommentsModel>;
    remove(organization_code: any, token: any, id: any): Promise<{
        message: string;
    }>;
    update(organization_code: any, token: any, body: any): Promise<ICommentsModel>;
    list(organization_code: any, token: any, content_id: any): Promise<{
        comments: Pick<import("mongoose")._LeanDocument<ICommentsModel>, "_id" | "__v" | "id" | "organization_code" | "type" | "created_by" | "content_id" | "comment_data">[];
        isMyComment: boolean;
        totalComments: number;
    }>;
}
