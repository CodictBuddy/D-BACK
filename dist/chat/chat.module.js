"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const chat_message_schema_1 = require("./schema/chat_message.schema");
const chat_room_schema_1 = require("./schema/chat_room.schema");
const chat_controller_1 = require("./chat.controller");
const chat_service_1 = require("./chat.service");
const notification_module_1 = require("./../notification/notification.module");
const shared_module_1 = require("./../shared/shared.module");
const auth_module_1 = require("./../auth/auth.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'chat-room', schema: chat_room_schema_1.ChatRoomSchema },
                { name: 'chat-message', schema: chat_message_schema_1.ChatMessageSchema },
            ]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map