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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const shared_service_1 = require("../shared/shared.service");
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
const comments_service_1 = require("./comments.service");
let CommentsController = class CommentsController {
    constructor(commentsService, sservice) {
        this.commentsService = commentsService;
        this.sservice = sservice;
    }
    async create(res, token, organization, body) {
        try {
            let data = await this.commentsService.create(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async update(res, token, organization, id, body) {
        try {
            let data = await this.commentsService.update(+organization, token, Object.assign({ id }, body));
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async list(res, token, organization, content_id) {
        try {
            let data = await this.commentsService.list(+organization, token, content_id);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async remove(res, token, organization, id) {
        try {
            let data = await this.commentsService.remove(+organization, token, id);
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
    common_1.Post(''),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('id')),
    __param(4, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':content_id'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('content_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "list", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "remove", null);
CommentsController = __decorate([
    common_1.Controller(':organization_code/comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService,
        shared_service_1.SharedService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map