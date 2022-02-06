import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.statergy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { SharedModule } from "src/shared/shared.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/schema/user.schema";
import { UserActionSchema } from "src/user/schema/userAction.schema";
import { roleAssignmentSchema } from "src/role/schema/role-assignment.schema";

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      { name: "userAction", schema: UserActionSchema },
      { name: "roleAssignment", schema: roleAssignmentSchema },
    ]),
    JwtModule.register({
      secret: "SXUNBURNDTALKS#*DKJFDGF&#EF",
      signOptions: { expiresIn: "1d" },
    }),
    SharedModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
