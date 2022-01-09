import { roleAssignmentSchema } from "./../role/schema/role-assignment.schema";
// import { UserSuggestionService } from "./../user-suggestion/user-suggestion.service";
// import { invitationSchema } from "./../invitation/schema/invitation.schema";
// import { activitiesSchema } from "./../activities/schema/activities.schema";
// import { groupMemberSchema } from "./../group/schema/group-member.schema";
// import { CategorySchema } from "./../category/schema/category.schema";
// import { CategoryModule } from "./../category/category.module";
// import { RatingsModule } from "./../ratings/ratings.module";
// import { RatingsService } from "./../ratings/ratings.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import { UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
// import { MailerModule } from "src/mailer/mailer.module";
import { SharedModule } from "src/shared/shared.module";
// import { AuthModule } from "src/auth/auth.module";
// import { MailerService } from "src/mailer/mailer.service";
import { UserActionSchema } from "./schema/userAction.schema";
// import { organizationSchema } from "src/organization/schema/organization.schema";
// import { roleSchema } from "src/role/schema/role.schema";
// import { moduleSchema } from "src/module/schema/module.schema";
// import { FormSchema } from "src/form/schema/form.schema";
// import { modulePermissionSchema } from "src/permission/schema/modulePermission.schema";
// import { dataPermissionSchema } from "src/permission/schema/dataPermission.schema";
// import { ConfigurationSchema } from "src/configuration/schema/configuration.schema";
// import { ConfigurationDefaultSchema } from "src/configuration/schema/configuration-defaults.schema";
// import { designationSchema } from "src/designation/schema/designation.schema";
// import { ConnectionsSchema } from "src/connections/schema/connections.schema";
// import { RoomSchema } from "src/chat/schema/room.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "user", schema: UserSchema },
      // { name: "organization", schema: organizationSchema },
      // { name: "role", schema: roleSchema },
      // { name: "userAction", schema: UserActionSchema },
      // { name: "module", schema: moduleSchema },
      // { name: "form", schema: FormSchema },
      // { name: "modulePermission", schema: modulePermissionSchema },
      // { name: "dataPermission", schema: dataPermissionSchema },
      // { name: "configuration", schema: ConfigurationSchema },
      // { name: "configurationDefaults", schema: ConfigurationDefaultSchema },
      // { name: "designation", schema: designationSchema },
      // { name: "connections", schema: ConnectionsSchema },
      // { name: "category", schema: CategorySchema },
      // { name: "groupMember", schema: groupMemberSchema },
      // { name: "activities", schema: activitiesSchema },
      // { name: "room", schema: RoomSchema },
      // { name: "roleAssignment", schema: roleAssignmentSchema },
    ]),
    // MailerModule,
    SharedModule,
    // AuthModule,
    // RatingsModule,
    // CategoryModule,
  ],
  controllers: [UserController],
  providers: [UserService
  ],
  // providers: [UserService, UserSuggestionService],
  exports: [UserService],
})
export class UserModule {}
