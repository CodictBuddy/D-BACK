// import { AuthModule } from "./../auth/auth.module";
import { SharedModule } from "./../shared/shared.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { roleSchema } from "./schema/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "role", schema: roleSchema }]),
    SharedModule,
    // AuthModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
