"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const notification_module_1 = require("../notification/notification.module");
const shared_module_1 = require("../shared/shared.module");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
const comments_schema_1 = require("./schema/comments.schema");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: 'comments', schema: comments_schema_1.commentsSchema },
            ]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            notification_module_1.NotificationModule],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService]
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map