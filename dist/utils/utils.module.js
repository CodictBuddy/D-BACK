"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsModule = void 0;
const common_1 = require("@nestjs/common");
const media_module_1 = require("../media/media.module");
const shared_module_1 = require("../shared/shared.module");
const cloudinary_provider_1 = require("./cloudinary.provider");
const utils_controller_1 = require("./utils.controller");
const utils_service_1 = require("./utils.service");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    common_1.Module({
        imports: [media_module_1.MediaModule, shared_module_1.SharedModule],
        controllers: [utils_controller_1.UtilsController],
        providers: [cloudinary_provider_1.CloudinaryProvider, utils_service_1.UtilsService],
    })
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map