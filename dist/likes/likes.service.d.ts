import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { ILikesModel } from './schema/likes.schema';
export declare class LikesService {
    private likesModel;
    private notificationService;
    constructor(likesModel: Model<ILikesModel>, notificationService: NotificationService);
    create(organization_code: any, token: any, body: any): Promise<ILikesModel>;
    remove(organization_code: any, token: any, content_id: any): Promise<{
        message: string;
    }>;
    list(organization_code: any, token: any, content_id: any): Promise<{
        likes: Pick<import("mongoose")._LeanDocument<ILikesModel>, "_id" | "__v" | "id" | "organization_code" | "type" | "created_by" | "content_id">[];
        isLikedByMe: boolean;
        totalLikes: number;
    }>;
}
