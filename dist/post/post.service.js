"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const connections_service_1 = require("../connections/connections.service");
const notification_service_1 = require("../notification/notification.service");
let PostService = class PostService {
    constructor(postModel, notificationService, connectionService) {
        this.postModel = postModel;
        this.notificationService = notificationService;
        this.connectionService = connectionService;
    }
    async getMyPostList(organization_code, token, body) {
        const filter = { organization_code, created_by: token.id };
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
            .select('-organization_code');
        const count = await this.postModel.find(filter).count();
        return { posts, count };
    }
    async getAllPostList(organization_code, token, body) {
        let connectionList = await this.connectionService.getConnectionList(organization_code, token, 'Accept', 'Connect', 2);
        connectionList = connectionList.connections;
        if (connectionList && connectionList.length) {
            connectionList = connectionList.map(el => el.connected_user._id.toString());
        }
        const filter = {
            organization_code, $or: [{ type: "Anyone" },
                { type: "Connections only", created_by: { $in: [...connectionList, token.id.toString()] } }]
        };
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
            .select('-organization_code').lean();
        posts.forEach(el => {
            el['isSelfPost'] = el.created_by['_id'] == token.id;
        });
        const count = await this.postModel.find(filter).count();
        return { posts, count };
    }
    async getDetail(organization_code, token, post_id) {
        const filter = { organization_code, _id: post_id };
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
            .select('-organization_code');
        return { post, isSelfPost: post.created_by['_id'] == token.id };
    }
    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            type: body.type,
            title: body.title,
            content: body.content
        };
        const doc = await this.postModel.create(fv);
        let connectionList = await this.connectionService.getConnectionList(organization_code, token, 'Accept', 'Connect', 2);
        connectionList = connectionList.connections;
        if (doc) {
            if (connectionList && connectionList.length) {
                connectionList = connectionList.map(el => el.connected_user._id.toString());
                for (const el of connectionList) {
                    const notificationObj = {
                        user_id: el,
                        notification_type: 'Post',
                        notification_title: body.notification_title,
                        navigation_url: body.navigation_url + doc._id,
                        notification_message: body.notification_message,
                    };
                    await this.notificationService.create(organization_code, token, notificationObj);
                }
            }
        }
        return doc;
    }
    async update(organization_code, token, body) {
        const keys = ['type', 'title', 'content'];
        const fv = { updated_at: Date.now() };
        for (const key of keys) {
            if (body[key]) {
                fv[key] = body[key];
            }
        }
        const doc = await this.postModel.findOneAndUpdate({
            _id: body.post_id, organization_code,
            created_by: token.id
        }, fv, { new: true });
        return doc;
    }
    async remove(organization_code, token, post_id) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: post_id
        };
        await this.postModel.findOneAndRemove(fv);
        return { message: 'document deleted successfully' };
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('post')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService,
        connections_service_1.ConnectionsService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map