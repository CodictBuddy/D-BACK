"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsModule = void 0;
const notification_module_1 = require("./../notification/notification.module");
const shared_module_1 = require("./../shared/shared.module");
const auth_module_1 = require("./../auth/auth.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const connections_controller_1 = require("./connections.controller");
const connections_service_1 = require("./connections.service");
const connections_schema_1 = require("./schema/connections.schema");
let ConnectionsModule = class ConnectionsModule {
};
ConnectionsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'connections', schema: connections_schema_1.connectionsSchema },
            ]),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [connections_controller_1.ConnectionsController],
        providers: [connections_service_1.ConnectionsService],
        exports: [connections_service_1.ConnectionsService],
    })
], ConnectionsModule);
exports.ConnectionsModule = ConnectionsModule;
//# sourceMappingURL=connections.module.js.map