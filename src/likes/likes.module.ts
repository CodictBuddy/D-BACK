import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { NotificationModule } from 'src/notification/notification.module';
import { likesSchema } from './schema/likes.schema';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: 'likes', schema: likesSchema },
  ]),
  SharedModule,
  AuthModule,
  NotificationModule],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
