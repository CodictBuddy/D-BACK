// import { ChatService } from './../chat.service';
import {
  WebSocketGateway,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ path: '/socket' })
export class socketGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  nicknames: Map<string, string> = new Map();

  //   constructor(private chatService: ChatService) {}
  handleDisconnect(client: Socket) {
    this.server.emit('users-changed', {
      user: this.nicknames[client.id],
      event: 'left',
    });
  }

  @SubscribeMessage('set-nickname')
  setNickname(client: Socket, myData) {
    this.nicknames[myData.myId] = myData.nickname;

    this.server
      .to(myData.room_id)
      .emit('user-changed', { user: '', event: 'joined' });
  }
  handleConnection(client: Socket) {
    console.log('client id tracker here', client.id);
    client.broadcast.emit('users-changed', {
      user: '',
      event: 'joined',
    });
  }

  @SubscribeMessage('enter-room')
  enterRoom(client: Socket, message) {
    client.join(message.room_id);
  }

  @SubscribeMessage('add-message')
  async addMessage(message) {
    this.server.to(message.room_id).emit('add-message', message);
  }

  // @SubscribeMessage('deleteMessage')
  deleteMessage(message) {
    this.server.to(message.room_id).emit('deleteMessage', {
      position: message.position,
    });
  }

  // @SubscribeMessage('updateMessage')
  updateMessage(message) {
    this.server.to(message.data.room_id).emit('updateMessage', {
      position: message.position,
      updated_mesasge: message.data,
      room_id: message.room_id,
    });
  }

  @SubscribeMessage('addMember')
  async addMemberInChat(client: Socket, message) {
    let fv = {
      room_id: message.roomId,
      sender_id: message.myId,
      receiver_id: message.othrUsrId,
      content: message.content,
      message_type: 'notification',
    };
    let msgId = await this.createMessages(fv);
    this.server.to(message.roomId).emit('addMember', {
      _id: msgId,
      content: message.content,
      from: message.usrName,
      sender_id: {
        _id: message.othrUsrId,
      },
      receiver_id: {
        _id: message.myId,
      },
      message_type: 'notification',
      created: new Date(),
    });
  }

  catchNotification(message) {
    this.server.to(message.room_id).emit('new-notification');
  }

  catchMessageNotification(message) {
    message.room_id.forEach(el => {
      this.server.to(el).emit('new-message-notification', {
        roomId: message.message_room_id,
        messageContent: message.content,
      });
    });
  }

  async createMessages(body) {
    // let message = {} await this.chatService.newMessage(body);
    // this.catchMessageNotification({
    //   room_id: message['userIds'],
    //   message_room_id: message.room_id,
    //   content: message.content,
    // });
    //
    // return message._id;
  }
}
