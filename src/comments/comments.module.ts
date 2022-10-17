import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SharedModule } from 'src/shared/shared.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { commentsSchema } from './schema/comments.schema';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: 'comments', schema: commentsSchema },
  ]),
  SharedModule,
  AuthModule,
  NotificationModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
