"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const utils_module_1 = require("./utils/utils.module");
const user_module_1 = require("./user/user.module");
const shared_module_1 = require("./shared/shared.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_2 = require("@nestjs/config");
const media_module_1 = require("./media/media.module");
const connections_module_1 = require("./connections/connections.module");
const notification_module_1 = require("./notification/notification.module");
const chat_module_1 = require("./chat/chat.module");
const post_module_1 = require("./post/post.module");
const likes_module_1 = require("./likes/likes.module");
const comments_module_1 = require("./comments/comments.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_2.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_2.ConfigModule],
                useFactory: async (config) => {
                    return {
                        uri: config.get('DB_URL'),
                        useNewUrlParser: true,
                        useFindAndModify: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            shared_module_1.SharedModule,
            user_module_1.UserModule,
            utils_module_1.UtilsModule,
            media_module_1.MediaModule,
            connections_module_1.ConnectionsModule,
            notification_module_1.NotificationModule,
            chat_module_1.ChatModule,
            post_module_1.PostModule,
            likes_module_1.LikesModule,
            comments_module_1.CommentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map