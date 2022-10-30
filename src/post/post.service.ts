import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectionsService } from 'src/connections/connections.service';
import { NotificationService } from 'src/notification/notification.service';
import { IPostModel } from './schema/post.schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel('post')
        private postModel: Model<IPostModel>,
        private notificationService: NotificationService,
        private connectionService: ConnectionsService,

    ) { }


    async getMyPostList(organization_code, token, body) {
        const filter = { organization_code, created_by: token.id }
        const posts = await this.postModel
            .find(filter).sort('-created_at DESC')
            .skip(body.skip)
            .limit(body.limit)
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
            .select('-organization_code')
        const count = await this.postModel.find(filter).count();
        return { posts, count }

    }


    async getAllPostList(organization_code, token, body) {
        const filter = { organization_code }
        const posts = await this.postModel
            .find(filter).sort('-created_at DESC')
            .skip(body.skip)
            .limit(body.limit)
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
            .select('-organization_code')
        const count = await this.postModel.find(filter).count();
        return { posts, count }

    }

    async getDetail(organization_code, token, post_id) {
        const filter = { organization_code, _id: post_id }
        const post = await this.postModel
            .findOne(filter).populate({
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
            .select('-organization_code')

        return { post, isSelfPost: post.created_by['_id'] == token.id }
    }

    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            type: body.type, //Anyone/Connections
            title: body.title,
            content: body.content
        };

        const doc = await this.postModel.create(fv);
        if (doc) {

            let connectionList = await this.connectionService.getConnectionList(
                organization_code,
                token,
                'Accept',
                'Connect',
                2,
            )['connections']

            console.log('what is connection list here', connectionList);
            
            if (connectionList && connectionList.length) {
                console.log('check to se what is connection list here before map', connectionList)
                console.log('----------------------------');
                
                connectionList = connectionList.map(el => el.connected_user._id)

                console.log('check to se what is connection list here after map', connectionList)

                for (const el of connectionList) {
                    const notificationObj = {
                        user_id: el,// this is target user id
                        notification_type: 'Post',// Post
                        notification_title: body.notification_title,
                        navigation_url: body.navigation_url + doc._id,
                        notification_message: body.message,
                    };
                    await this.notificationService.create(
                        organization_code,
                        token,
                        notificationObj,
                    );
                }

            }
        }

        return doc;
    }


    async update(organization_code, token, body) {
        const keys = ['type', 'title', 'content']
        const fv = { updated_at: Date.now() }
        for (const key of keys) {
            if (body[key]) {
                fv[key] = body[key]
            }
        }
        const doc = await this.postModel.findOneAndUpdate(
            {
                _id: body.post_id, organization_code,
                created_by: token.id
            },
            fv,
            { new: true },
        );
        return doc;
    }


    async remove(organization_code, token, post_id) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: post_id
        }
        await this.postModel.findOneAndRemove(fv);
        return { message: 'document deleted successfully' }
    }

}
