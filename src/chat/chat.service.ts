import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IChatMessageModel } from './schema/chat_message.schema';
import { IChatRoomModel } from './schema/chat_room.schema';
import { NotificationService } from './../notification/notification.service';
import { socketGateway } from './../utils/socket/socket-gateway.service';
import { UtilsService } from './../utils/utils.service';
import { SharedService } from './../shared/shared.service';
import { AuthService } from 'src/auth/auth.service';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('room')
    private cRoomModel: Model<IChatRoomModel>,
    @InjectModel('message')
    private cMessageModel: Model<IChatMessageModel>,
    private sservice: SharedService,
    private utilsService: UtilsService,
    private aservice: AuthService,
    private socket: socketGateway,
    private notificationService: NotificationService,
  ) {}

  // chat-room methods
  async createRoom(organization_code, token, body) {
    try {
      let conditionObj = {};
      let fv = {
        organization_code,
        room_name: body.room_name,
        room_cat: body.room_cat,
        room_type: body.room_type,
        members: body.members,
      };

      if (body.room_cat === 'CGroup') {
        (fv['created_by'] = body.created_by),
          (conditionObj = {
            $and: [{ room_cat: body.room_cat }, { room_name: body.room_name }],
          });
      }
      if (body.room_cat === 'individual') {
        (fv['created_by'] = token.id),
          (conditionObj = {
            $and: [
              { room_cat: body.room_cat },
              { members: { $all: body.members } },
            ],
          });
      }

      let persisting_room = await this.cRoomModel.findOne(conditionObj);
      if (persisting_room) {
        return persisting_room;
      } else {
        let createRoom = await this.cRoomModel.create(fv);
        return createRoom;
      }
    } catch (err) {
      throw err;
    }
  }

  async removeRoom(organization_code, id) {
    try {
      await this.cRoomModel.findOneAndDelete({ _id: id, organization_code });
      return { message: 'room destroyed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async getRoomDetail(organization_code, body) {
    try {
      let room_data = await this.cRoomModel.findOne({
        organization_code,
        room_id: body.room_id,
      });

      let chat_data = await this.cMessageModel
        .findOne({ organization_code, room_id: body.room_id, is_delete: false })
        .populate('room_id');
      //  need to populate sender and reciever data
      return { room_data, chat_data };
    } catch (err) {
      throw err;
    }
  }

  async getMyRoomList(organization_code, token) {
    try {
      let data = await this.cRoomModel
        .find({
          $and: [
            { members: { $in: [token.id] }, organization_code },
            { room_cat: { $ne: 'CGroup' } },
          ],
        })
        .sort({ createdAt: -1 });
      // .populate({
      //   path: "members",
      //   select: { first_name: 1 },
      //   populate: {
      //     path: "user_media.media_id",
      //     select: { media_url: 1 },
      //   },
      // })
      // .lean()
      // .select({ room_name: 1, room_cat: 1 });

      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].room_cat == "individual") {
      //     let member = data[i].members.find((el) => {
      //       return el._id != token.id;
      //     });

      //     if (member) {
      //       data[i]["room_name"] = member.first_name.find(
      //         (el) => el.description
      //       ).description;
      //       data[i]["room_media"] = member.user_media.find(
      //         (el) => el.media_id
      //       ).media_id.media_url;
      //     }
      //   }

      //   let messageData = await this.cMessageModel
      //     .findOne({ room_id: data[i]._id })
      //     .sort({ created_at: -1 });
      //   data[i]["current_message"] = messageData?.content;
      // }

      return data;
    } catch (err) {
      throw err;
    }
  }

  // chat-message methods

  async newMessage(organization_code, token, body) {
    try {
      let fv = {
        organization_code,
        room_id: body.room_id,
        sender_id: token.id,
        receiver_id: body.user_id,
        content: body.content,
        message_type: body.message_type,
      };
      let newMessage = await this.cMessageModel.create(fv);

      let roomMembers = await this.cRoomModel.findOne({
        organization_code,
        _id: body.room_id,
      });
      newMessage['userIds'] = roomMembers.members.filter(el => el != token.id);
      // trigger push notification to reciever
      await this.notificationService.triggerPushNotifications(
        'my name',
        'my name have sent u a new message',
        fv.receiver_id,
        organization_code,
      );
      // trigger socket
      this.socket.addMessage(newMessage);
      return newMessage;
    } catch (err) {
      throw err;
    }
  }

  async getMessageList(organization_code, token, body) {
    try {
      let filter = {
        organization_code,
        room_id: body.room_id,
        is_delete: false,
      };
      console.log('filter', JSON.stringify(filter));
      let messages = await this.cMessageModel
        .find(filter)
        .sort('-created_at DESC')
        .skip(body.skip)
        .limit(body.limit)
        .populate('sender_id')
        .populate('receiver_id')
        .populate('room_id')
        .populate('created_by', 'first_name');

      let count = await this.cMessageModel.find(filter).count();
      return { messages, count };
    } catch (err) {
      throw err;
    }
  }

  async deleteMessage(organization_code, token, body) {
    try {
      await this.cMessageModel.deleteOne({
        organization_code,
        room_id: body.room_id,
        _id: body.message_id,
      });

      // trigger socket
      this.socket.deleteMessage({
        room_id: body.room_id,
        position: body.position,
      });
      return { message: 'Message deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}
