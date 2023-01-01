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
exports.ConnectionsService = void 0;
const notification_service_1 = require("./../notification/notification.service");
const socket_gateway_service_1 = require("./../utils/socket/socket-gateway.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
const shared_service_1 = require("../shared/shared.service");
const utils_service_1 = require("../utils/utils.service");
let ConnectionsService = class ConnectionsService {
    constructor(connModel, sservice, utilsService, aservice, socket, notificationService) {
        this.connModel = connModel;
        this.sservice = sservice;
        this.utilsService = utilsService;
        this.aservice = aservice;
        this.socket = socket;
        this.notificationService = notificationService;
    }
    async getConnectionList(organization_code, token, connection_status, type, view_type) {
        const filterObject = { organization_code, connection_status, type };
        let populateString = '';
        if (connection_status === 'Blocked') {
            filterObject['target_user_id'] = token.id;
            populateString = 'user_id';
        }
        else if (connection_status === 'Pending') {
            if (view_type === 1) {
                filterObject['target_user_id'] = token.id;
                populateString = 'user_id';
            }
            else if (view_type === 0) {
                filterObject['user_id'] = token.id;
                populateString = 'target_user_id';
            }
        }
        else if (view_type === 2 && connection_status === 'Accept') {
            filterObject['$or'] = [
                { user_id: token.id },
                { target_user_id: token.id },
            ];
            populateString = 'target_user_id user_id';
        }
        const connections = await this.connModel
            .find(filterObject)
            .populate({
            path: populateString,
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
        if (view_type === 2 && connection_status === 'Accept') {
            connections.forEach(el => {
                if (el.user_id['_id'].toString() == token.id.toString()) {
                    el['connected_user'] = el.target_user_id;
                }
                else if (el.target_user_id['_id'].toString() == token.id.toString()) {
                    el['connected_user'] = el.user_id;
                }
                el.user_id = el.user_id['_id'];
                el.target_user_id = el.target_user_id['_id'];
            });
        }
        return { connections };
    }
    async getDetail(organization_code, token, body) {
        const fo = this.sservice.processCondition(organization_code, token.id, body.user_id, body.connection_type);
        return await this.connModel.findOne(fo);
    }
    async create(organization_code, token, body) {
        const fv = {
            organization_code,
            user_id: token.id,
            target_user_id: body.user_id,
            type: body.type,
        };
        const doc = await this.connModel.create(fv);
        if (doc) {
            const notificationObj = {
                user_id: body.user_id,
                notification_type: body.type,
                notification_title: body.notification_title,
                navigation_url: body.navigation_url,
                notification_message: body.message,
            };
            await this.notificationService.create(organization_code, token, notificationObj);
        }
        return doc;
    }
    async update(organization_code, token, body) {
        const fo = this.sservice.processCondition(organization_code, token.id, body.user_id, body.connection_type);
        const doc = await this.connModel.findOneAndUpdate(Object.assign({ _id: body.conn_id }, fo), { connection_status: body.connection_status }, { new: true });
        if (doc) {
            const notificationObj = {
                user_id: body.user_id,
                notification_type: body.connection_type,
                notification_title: body.notification_title,
                notification_message: body.message,
                navigation_url: body.navigation_url,
            };
            await this.notificationService.create(organization_code, token, notificationObj);
        }
        return doc;
    }
    async remove(organization_code, token, body) {
        const fo = this.sservice.processCondition(organization_code, token.id, body.user_id, body.connection_type);
        return await this.connModel.findOneAndRemove(Object.assign(Object.assign({}, fo), { type: body.connection_type }));
    }
};
ConnectionsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('connections')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        shared_service_1.SharedService,
        utils_service_1.UtilsService,
        auth_service_1.AuthService,
        socket_gateway_service_1.socketGateway,
        notification_service_1.NotificationService])
], ConnectionsService);
exports.ConnectionsService = ConnectionsService;
//# sourceMappingURL=connections.service.js.map