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
exports.NotificationController = void 0;
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const shared_service_1 = require("./../shared/shared.service");
const notification_service_1 = require("./notification.service");
const common_1 = require("@nestjs/common");
let NotificationController = class NotificationController {
    constructor(notiService, sservice) {
        this.notiService = notiService;
        this.sservice = sservice;
    }
    async unreadList(res, token, organization) {
        try {
            let data = await this.notiService.getUnreadList(+organization, token);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async create(token, organization, res, body) {
        try {
            let data = await this.notiService.create(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async update(token, organization, res, body) {
        try {
            let data = await this.notiService.update(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async remove(token, organization, notification_id, notification_type, res) {
        try {
            let data = await this.notiService.remove(+organization, token, {
                notification_id,
                notification_type,
            });
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async list(res, token, organization, skip, limit) {
        try {
            let data = await this.notiService.getList(+organization, token, {
                skip,
                limit,
            });
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('unread'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "unreadList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(''),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Param('organization_code')),
    __param(2, common_1.Res()),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(''),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Param('organization_code')),
    __param(2, common_1.Res()),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':notification_type/:notification_id'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Param('organization_code')),
    __param(2, common_1.Param('notification_id')),
    __param(3, common_1.Param('notification_type')),
    __param(4, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "remove", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(''),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Query('skip')),
    __param(4, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "list", null);
NotificationController = __decorate([
    common_1.Controller(':organization_code/notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        shared_service_1.SharedService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map