"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const local_statergy_1 = require("./strategies/local.statergy");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const shared_module_1 = require("../shared/shared.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const userAction_schema_1 = require("../user/schema/userAction.schema");
const role_assignment_schema_1 = require("../role/schema/role-assignment.schema");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            mongoose_1.MongooseModule.forFeature([
                { name: "user", schema: user_schema_1.UserSchema },
                { name: "userAction", schema: userAction_schema_1.UserActionSchema },
                { name: "roleAssignment", schema: role_assignment_schema_1.roleAssignmentSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: "SXUNBURNDTALKS#*DKJFDGF&#EF",
                signOptions: { expiresIn: "1d" },
            }),
            shared_module_1.SharedModule,
        ],
        providers: [
            auth_service_1.AuthService,
            local_statergy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map