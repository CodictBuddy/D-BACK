import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationService } from 'src/notification/notification.service';
import { AppException } from 'src/shared/app-exception';
import { ICommentsModel } from './schema/comments.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel('comments') private commentsModel: Model<ICommentsModel>,
        private notificationService: NotificationService,
    ) { }

    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            content_id: body.content_id,
            type: body.type,
            comment_data: body.comment_data
        };

        const doc = await this.commentsModel.create(fv);
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

    async remove(organization_code, token, id) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: id
        }
        const data = await this.commentsModel.findOne(fv)
        if (!data) {
            throw new AppException(
                'no user fount with these credentials',
                HttpStatus.NOT_FOUND,
            );
        }
        const res = await this.commentsModel.findOneAndRemove({
            _id: id,
            type: data.type,
        });
        if(res){
            return {message:'Record removed successfully'}
        }
    }

    async update(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: body.id
        }
        const data = await this.commentsModel.findOne(fv)
        if (!data) {
            throw new AppException(
                'no record found with these credentials',
                HttpStatus.NOT_FOUND,
            );
        }
        return await this.commentsModel.findOneAndUpdate(fv, { comment_data: body.comment_data, updated_at: Date.now() }, { new: true });
    }

    async list(organization_code, token, content_id) {
        const fv = {
            content_id, organization_code
        }
        let doc = await this.commentsModel.find(fv)
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

            doc.forEach(el => {
                el['isMyComment'] = el.created_by['_id'] == token.id
            })

        const totalCommentsCount = await this.commentsModel.find(fv).count()

        let myRecord = await this.commentsModel.findOne({ ...fv, created_by: token.id })

        return { comments: doc, isMyComment: !!myRecord, totalComments: totalCommentsCount }
    }

}
