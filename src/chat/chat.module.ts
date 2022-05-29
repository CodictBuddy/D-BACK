import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { ChatMessageSchema } from './schema/chat_message.schema';
import { ChatRoomSchema } from './schema/chat_room.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { NotificationModule } from './../notification/notification.module';
import { SharedModule } from './../shared/shared.module';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'chat-room', schema: ChatRoomSchema },
      { name: 'chat-message', schema: ChatMessageSchema },
    ]),
    SharedModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
