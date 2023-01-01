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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const auth_service_1 = require("./auth.service");
const shared_service_1 = require("../shared/shared.service");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const app_exception_1 = require("../shared/app-exception");
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
let AuthController = class AuthController {
    constructor(auth, sservice) {
        this.auth = auth;
        this.sservice = sservice;
    }
    async login(req, res, body, organization) {
        try {
            let token = await this.auth.loginUser(body, +organization);
            return res.status(200).send(token);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async validateToken(token, body) {
        let returnValue = { token };
        if (body.doAuthorityCheck) {
        }
        return returnValue;
    }
    async tokenPermissionCheck(success, failure, res) {
        try {
            if (success)
                return res.json();
            if (failure)
                return res.json();
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    common_1.Post('login'),
    __param(0, common_1.Request()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __param(3, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('validate-user'),
    __param(0, getuser_decorator_1.GetToken()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    common_1.Get('loginstatus'),
    __param(0, common_1.Query('success')),
    __param(1, common_1.Query('failure')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "tokenPermissionCheck", null);
AuthController = __decorate([
    common_1.Controller(':organization_code/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, shared_service_1.SharedService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map