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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_service_1 = require("../notification/notification.service");
const app_exception_1 = require("../shared/app-exception");
let CommentsService = class CommentsService {
    constructor(commentsModel, notificationService) {
        this.commentsModel = commentsModel;
        this.notificationService = notificationService;
    }
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
            await this.notificationService.create(organization_code, token, notificationObj);
        }
        return doc;
    }
    async remove(organization_code, token, id) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: id
        };
        const data = await this.commentsModel.findOne(fv);
        if (!data) {
            throw new app_exception_1.AppException('no user fount with these credentials', common_1.HttpStatus.NOT_FOUND);
        }
        const res = await this.commentsModel.findOneAndRemove({
            _id: id,
            type: data.type,
        });
        if (res) {
            return { message: 'Record removed successfully' };
        }
    }
    async update(organization_code, token, body) {
        const fv = {
            organization_code,
            created_by: token.id,
            _id: body.id
        };
        const data = await this.commentsModel.findOne(fv);
        if (!data) {
            throw new app_exception_1.AppException('no record found with these credentials', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.commentsModel.findOneAndUpdate(fv, { comment_data: body.comment_data, updated_at: Date.now() }, { new: true });
    }
    async list(organization_code, token, content_id) {
        const fv = {
            content_id, organization_code
        };
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
            .select('-organization_code').lean();
        doc.forEach(el => {
            el['isMyComment'] = el.created_by['_id'] == token.id;
        });
        const totalCommentsCount = await this.commentsModel.find(fv).count();
        let myRecord = await this.commentsModel.findOne(Object.assign(Object.assign({}, fv), { created_by: token.id }));
        return { comments: doc, isMyComment: !!myRecord, totalComments: totalCommentsCount };
    }
};
CommentsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('comments')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map