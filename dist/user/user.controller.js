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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const shared_service_1 = require("../shared/shared.service");
const user_service_1 = require("./user.service");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const usertoken_dto_1 = require("./dto/usertoken.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService, sservice) {
        this.userService = userService;
        this.sservice = sservice;
    }
    async signUp(body, res, organization) {
        try {
            let data = await this.userService.signUp(body, +organization);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async forgotPassword(body, res, organization) {
        try {
            let data = await this.userService.forgotPassword(body, +organization);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async resetPassword(body, res, organization) {
        try {
            let data = await this.userService.resetPassword(body, +organization);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async suggestions(res, token, organization) {
        try {
            let data = await this.userService.suggestions(+organization, token);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async get(user_id, res, token, organization) {
        try {
            let data = await this.userService.getProfile(user_id, +organization, token);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async patchUser(body, res, token, organization) {
        try {
            let data = await this.userService.updateProfile(body, +organization, token);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async verifyEmail(body, res, organization) {
        try {
            let data = await this.userService.verifyCode(body, +organization);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async resendCode(body, res, organization) {
        try {
            let data = await this.userService.retryCode(body, +organization);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
};
__decorate([
    common_1.Post('signup'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    common_1.Post('forgotPassword'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    common_1.Post('resetPassword'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('suggestions'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "suggestions", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __param(2, getuser_decorator_1.GetToken()),
    __param(3, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, getuser_decorator_1.GetToken()),
    __param(3, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "patchUser", null);
__decorate([
    common_1.Post('verify/email'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyEmail", null);
__decorate([
    common_1.Post('resend/code'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendCode", null);
UserController = __decorate([
    common_1.Controller(':organization_code/user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        shared_service_1.SharedService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map