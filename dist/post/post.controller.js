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
exports.PostController = void 0;
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const shared_service_1 = require("./../shared/shared.service");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService, sservice) {
        this.postService = postService;
        this.sservice = sservice;
    }
    async myPostlist(res, token, organization, body) {
        try {
            let data = await this.postService.getMyPostList(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async list(res, token, organization, body) {
        try {
            let data = await this.postService.getAllPostList(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async create(token, organization, res, body) {
        try {
            let data = await this.postService.create(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = await this.sservice.processError(err, this.constructor.name);
            return res.status(code).json(response);
        }
    }
    async update(res, token, organization, body) {
        try {
            let data = await this.postService.update(+organization, token, body);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async getDetail(res, token, organization, post_id) {
        try {
            let data = await this.postService.getDetail(+organization, token, post_id);
            return res.json(data);
        }
        catch (err) {
            const { code, response } = this.sservice.processError(err, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async remove(res, token, organization, post_id) {
        try {
            let data = await this.postService.remove(+organization, token, post_id);
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
    common_1.Post('my_posts'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "myPostlist", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('all_posts'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "list", null);
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
], PostController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(''),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':post_id'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getDetail", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':post_id'),
    __param(0, common_1.Res()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Param('organization_code')),
    __param(3, common_1.Param('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
PostController = __decorate([
    common_1.Controller(':organization_code/post'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        shared_service_1.SharedService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map