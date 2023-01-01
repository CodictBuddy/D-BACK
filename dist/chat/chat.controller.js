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
exports.ChatController = void 0;
const jwt_auth_guard_1 = require("./../auth/guards/jwt-auth.guard");
const usertoken_dto_1 = require("./../user/dto/usertoken.dto");
const getuser_decorator_1 = require("./../shared/decorator/getuser.decorator");
const shared_service_1 = require("./../shared/shared.service");
const chat_service_1 = require("./chat.service");
const common_1 = require("@nestjs/common");
let ChatController = class ChatController {
    constructor(chatService, sservice) {
        this.chatService = chatService;
        this.sservice = sservice;
    }
    async newMessage(token, res, organization, body) {
        try {
            let data = await this.chatService.newMessage(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async createRoom(token, res, organization, body) {
        try {
            let data = await this.chatService.createRoom(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getRoomDetail(res, token, organization, body) {
        try {
            let data = await this.chatService.getRoomDetail(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getChatList(res, token, organization, roomId) {
        try {
            let data = await this.chatService.getChatList(+organization, token, roomId);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getRoomList(res, organization, skip, limit, token) {
        try {
            let data = await this.chatService.getMyRoomList(+organization, token, +skip, +limit);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getRoomIdsList(res, organization, token) {
        try {
            let data = await this.chatService.getMyRoomIdsList(+organization, token);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async getMessageList(token, res, organization, body) {
        try {
            let data = await this.chatService.getMessageList(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async updateMessage(token, res, organization, body) {
        try {
            let data = await this.chatService.updateMessage(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async deleteMessage(token, res, organization, body) {
        try {
            let data = await this.chatService.deleteMessage(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async deleteRoom(res, organization, id) {
        try {
            let data = await this.chatService.removeRoom(+organization, id);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('new-message'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newMessage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('create-room'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createRoom", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('get-room-detail'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomDetail", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-chat-list/:roomId'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-my-rooms-list'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('organization_code')),
    __param(2, common_1.Query('skip')),
    __param(3, common_1.Query('limit')),
    __param(4, getuser_decorator_1.GetToken()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, usertoken_dto_1.UserToken]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('get-my-rooms-id-list'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('organization_code')),
    __param(2, getuser_decorator_1.GetToken()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, usertoken_dto_1.UserToken]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getRoomIdsList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('get-message-list'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getMessageList", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('update-message'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updateMessage", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('delete-message'),
    __param(0, getuser_decorator_1.GetToken()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteMessage", null);
__decorate([
    common_1.Delete('delete-room/:id'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('organization_code')),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteRoom", null);
ChatController = __decorate([
    common_1.Controller(':organization_code/chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        shared_service_1.SharedService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map