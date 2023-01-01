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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MediaService = class MediaService {
    constructor(mediaModel) {
        this.mediaModel = mediaModel;
    }
    async uploadMedia(body, organization_code) {
        const fv = {
            organization_code,
            public_id: body.public_id,
            user_id: body._id,
            url: body.secure_url,
            type: body.type,
            created_by: body._id,
        };
        return await this.mediaModel.create(fv);
    }
    async removeMedia(body, organization_code) {
        const data = await this.mediaModel.deleteOne({
            public_id: body.public_id,
            organization_code,
            user_id: body.user_id,
        });
        if (data) {
            return { status: 'success', message: 'record removed successfully' };
        }
    }
};
MediaService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('media')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map