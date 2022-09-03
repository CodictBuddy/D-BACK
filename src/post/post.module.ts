import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectionsModule } from 'src/connections/connections.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postSchema } from './schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'post', schema: postSchema },
    ]),
    SharedModule,
    AuthModule,
    UserModule,
    NotificationModule,
    ConnectionsModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
