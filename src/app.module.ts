import { UtilsModule } from './utils/utils.module';
// import { DesignationModule } from './designation/designation.module';
// import { EntityModule } from './entity/entity.module';
// import { MediaModule } from './media/media.module';
// import { ConfigurationModule } from './configuration/configuration.module';
// import { PermissionModule } from './permission/permission.module';
// import { FormModule } from './form/form.module';
// import { DepartmentModule } from './department/department.module';
// import { RoleModule } from './role/role.module';
// import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { ConnectionsModule } from './connections/connections.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get('DB_URL'),
          useNewUrlParser: true,
          useFindAndModify: false,
        };
      },
      inject: [ConfigService],
    }),
    // AuthModule,
    SharedModule,
    UserModule,
    UtilsModule,
    MediaModule,
    ConnectionsModule,
    NotificationModule,
    ChatModule,
    // OrganizationModule,
    // RoleModule,
    // DepartmentModule,

    // FormModule,
    // PermissionModule,
    // ConfigurationModule,
    // MediaModule,

    // EntityModule,

    // DesignationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
