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
exports.NotificationService = void 0;
const user_service_1 = require("./../user/user.service");
const app_exception_1 = require("./../shared/app-exception");
const socket_gateway_service_1 = require("./../utils/socket/socket-gateway.service");
const shared_service_1 = require("../shared/shared.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin = require("firebase-admin");
let NotificationService = class NotificationService {
    constructor(notificationModel, userService, sservice, socket) {
        this.notificationModel = notificationModel;
        this.userService = userService;
        this.sservice = sservice;
        this.socket = socket;
    }
    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            user_id: token.id,
            target_user_id: body.user_id,
            type: body.notification_type,
            navigation_url: body.navigation_url,
            notification_message: body.notification_message,
            isRead: false,
            isNewNotification: true,
        };
        const ob = await this.notificationModel.create(fv);
        if (ob) {
            this.socket.catchNotification({ room_id: fv.target_user_id });
            await this.triggerPushNotifications(body.notification_title, fv.notification_message, fv.target_user_id, fv.organization_code);
        }
    }
    async update(organization_code, token, body) {
        return await this.notificationModel.findOneAndUpdate({
            _id: body.notification_id,
            organization_code,
            type: body.notification_type,
        }, { isRead: body.isRead }, { new: true });
    }
    async remove(organization_code, token, body) {
        const fo = this.sservice.processfetchMyRecordsCondition(organization_code, token.id, body.notification_type);
        return await this.notificationModel.findOneAndRemove(Object.assign(Object.assign({}, fo), { _id: body.notification_id }));
    }
    async getList(organization_code, token, body) {
        const fo = this.sservice.processfetchMyRecordsCondition(organization_code, token.id, null, 'mine');
        const notifications = await this.notificationModel
            .find(fo)
            .sort({ created_at: -1 })
            .skip(+body.skip)
            .limit(+body.limit)
            .populate({
            path: 'user_id',
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
        return { notifications, count: notifications.length };
    }
    async getUnreadList(organization_code, token) {
        const fo = this.sservice.processfetchMyRecordsCondition(organization_code, token.id, null, 'mine');
        const notifications = await this.notificationModel.find(Object.assign(Object.assign({}, fo), { isRead: false, isNewNotification: true }));
        return { notifications, count: notifications.length };
    }
    async triggerPushNotifications(notification_title, notification_message, toUserId, organization_code) {
        var _a;
        const userData = await this.userService.getUserById(toUserId, organization_code);
        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24,
        };
        const message = {
            notification: {
                title: notification_title || 'You have a new notification',
                body: notification_message,
                sound: 'default',
                click_action: 'FCM_PLUGIN_ACTIVITY',
            },
        };
        const notificationToken = (_a = userData === null || userData === void 0 ? void 0 : userData.user) === null || _a === void 0 ? void 0 : _a.user_notification_token;
        if (notificationToken) {
            console.log('notification', notificationToken);
            console.log('notification message tracker here', notification_message);
            console.log('notification message type  tracker here', typeof notification_message);
            await admin
                .messaging()
                .sendToDevice(notificationToken, message, options)
                .then(res => {
                console.log('response m getting her for sent successfully notification', res);
            })
                .catch(err => {
                console.log('err in push notification here', err);
                throw new app_exception_1.AppException('failed to send notification', 403);
            });
        }
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('notification')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        shared_service_1.SharedService,
        socket_gateway_service_1.socketGateway])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map