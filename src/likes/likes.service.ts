import { AppException } from 'src/shared/app-exception';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { ILikesModel } from './schema/likes.schema';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel('likes') private likesModel: Model<ILikesModel>,
       private notificationService: NotificationService,
    ) { }

    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            content_id: body.content_id,
            type: body.type,
        };

        const doc = await this.likesModel.create(fv);
        if (doc && body.user_id !== token.id) {
            const notificationObj = {
                user_id: body.user_id,
                notification_type: body.type,
                notification_title: body.notification_title,
                navigation_url: body.navigation_url,
                notification_message: body.notification_message,
            };
            await this.notificationService.create(
                organization_code,
                token,
                notificationObj,
            );
        }
        return doc;
    }


    async remove(organization_code, token, content_id) {
        const fv = {
            organization_code,
            created_by: token.id,
            content_id
        }
        const data = await this.likesModel.findOne(fv)
        if (!data) {
            throw new AppException(
                'no user found with these credentials',
                HttpStatus.NOT_FOUND,
            );
        }
        return await this.likesModel.findOneAndRemove(fv);
    }

    async list(organization_code, token, content_id) {
        const fv = {
            content_id, organization_code
        }
        let doc = await this.likesModel.find(fv)
            .populate({
                path: "created_by",
                select: {
                    url: 1,
                    type: 1,
                    first_name: 1,
                    last_name: 1,
                    user_headline: 1,
                    user_profile_image: 1,
                },
                populate: {
                    path: 'user_profile_image',
                    model: 'media',
                    select: {
                        url: 1,
                    },
                },
            })
            .select('-organization_code').lean()

        const totalLikesCount = await this.likesModel.find(fv).count()

        let myRecord = await this.likesModel.findOne({ ...fv, created_by: token.id })

        return { likes: doc, isLikedByMe: !!myRecord, totalLikes: totalLikesCount }
    }

}
