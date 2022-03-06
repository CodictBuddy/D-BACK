import { AuthModule } from './../auth/auth.module';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { notificationSchema } from './schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'notification', schema: notificationSchema },
    ]),
    SharedModule,
    AuthModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
exports: [NotificationService],
})
export class NotificationModule {}
