"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const connections_module_1 = require("../connections/connections.module");
const notification_module_1 = require("../notification/notification.module");
const shared_module_1 = require("../shared/shared.module");
const user_module_1 = require("../user/user.module");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const post_schema_1 = require("./schema/post.schema");
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'post', schema: post_schema_1.postSchema },
            ]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            connections_module_1.ConnectionsModule
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService]
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map