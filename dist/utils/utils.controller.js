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
exports.UtilsController = void 0;
const shared_service_1 = require("../shared/shared.service");
const utils_service_1 = require("./utils.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("../media/media.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const getuser_decorator_1 = require("../shared/decorator/getuser.decorator");
const usertoken_dto_1 = require("../user/dto/usertoken.dto");
let UtilsController = class UtilsController {
    constructor(utilsS, sservice, mediaService) {
        this.utilsS = utilsS;
        this.sservice = sservice;
        this.mediaService = mediaService;
    }
    async create(file, token, res, organization_code, type) {
        try {
            const data = await this.utilsS.uploadImage(file);
            if (data) {
                const mediaData = await this.mediaService.uploadMedia(Object.assign(Object.assign({}, data), { _id: token.id, type }), organization_code);
                return res.json(mediaData);
            }
        }
        catch (e) {
            const { code, response } = this.sservice.processError(e, this.constructor.name);
            return res.status(code).send(response);
        }
    }
    async deleteFile(body, res, token, organization_code) {
        try {
            const data = await this.utilsS.deleteFile(body.public_id);
            if (data) {
                const mediaData = await this.mediaService.removeMedia({ public_id: body.public_id, user_id: token.id }, organization_code);
                return res.json(Object.assign({ data }, mediaData));
            }
        }
        catch (e) {
            const { code, response } = this.sservice.processError(e, this.constructor.name);
            return res.status(code).send(response);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('file/:type'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __param(1, getuser_decorator_1.GetToken()),
    __param(2, common_1.Res()),
    __param(3, common_1.Param('organization_code')),
    __param(4, common_1.Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usertoken_dto_1.UserToken, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('file'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, getuser_decorator_1.GetToken()),
    __param(3, common_1.Param('organization_code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, usertoken_dto_1.UserToken, Object]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "deleteFile", null);
UtilsController = __decorate([
    common_1.Controller(':organization_code/utils'),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        shared_service_1.SharedService,
        media_service_1.MediaService])
], UtilsController);
exports.UtilsController = UtilsController;
//# sourceMappingURL=utils.controller.js.map