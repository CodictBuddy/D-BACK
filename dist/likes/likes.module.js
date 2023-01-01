"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const shared_module_1 = require("../shared/shared.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const likes_controller_1 = require("./likes.controller");
const likes_service_1 = require("./likes.service");
const notification_module_1 = require("../notification/notification.module");
const likes_schema_1 = require("./schema/likes.schema");
let LikesModule = class LikesModule {
};
LikesModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'likes', schema: likes_schema_1.likesSchema },
            ]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            notification_module_1.NotificationModule],
        controllers: [likes_controller_1.LikesController],
        providers: [likes_service_1.LikesService]
    })
], LikesModule);
exports.LikesModule = LikesModule;
//# sourceMappingURL=likes.module.js.map