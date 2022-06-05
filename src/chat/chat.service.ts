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
    @InjectModel('chat-room')
    private cRoomModel: Model<IChatRoomModel>,
    @InjectModel('chat-message')
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
        room_name: body.room_name || '',
        members: [...body.members, token.id],
      };
      if (body.room_cat) {
        fv['room_cat'] = body.room_cat;
      }
      if (body.room_type) {
        fv['room_type'] = body.room_type;
      }

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

  async getRoomDetail(organization_code, token, body) {
    try {
      let chat_data = {};
      let room_data = await this.cRoomModel
        .findOne({
          $and: [
            {
              organization_code,
              room_cat: { $eq: 'individual' },
            },
            { members: { $in: [token.id, body.user_id] } },
          ],
        })
        .populate({
          path: 'members',
          select: {
            url: 1,
            type: 1,
            first_name: 1,
            last_name: 1,
            user_headline: 1,
            user_profile_image: 1,
          },
          populate: {
            path: 'user_profile_image',
            model: 'media',
            select: {
              url: 1,
            },
          },
        })
        .select('-organization_code')
        .lean();

      if (!room_data) return { message: 'no room found' };
      room_data['members'] = room_data.members.filter(
        el => el['_id'] != token.id,
      )?.[0];

      return room_data;
    } catch (err) {
      throw err;
    }
  }

  async getChatList(organization_code, token, room_id) {
    try {
      return await this.cMessageModel.findOne({
        organization_code,
        room_id,
      });
    } catch (err) {
      throw err;
    }
  }

  async getMyRoomList(organization_code, token, skip = 0, limit = 20) {
    try {
      let data = await this.cRoomModel
        .find({
          $and: [
            { members: { $in: [token.id] }, organization_code },
            { room_cat: { $ne: 'CGroup' } },
          ],
        })
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'members',
          select: {
            url: 1,
            type: 1,
            first_name: 1,
            last_name: 1,
            user_headline: 1,
            user_profile_image: 1,
          },
          populate: {
            path: 'user_profile_image',
            model: 'media',
            select: {
              url: 1,
            },
          },
        })
        .select('-organization_code')
        .lean();

      for (let i = 0; i < data.length; i++) {
        data[i]['members'] = data[i].members.filter(
          el => el['_id'] != token.id,
        )?.[0];
      }

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
      // await this.notificationService.triggerPushNotifications(
      //   'my name',
      //   'my name have sent u a new message',
      //   fv.receiver_id,
      //   organization_code,
      // );
      // // trigger socket
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
        .populate({
          path: 'sender_id',
          select: {
            url: 1,
            type: 1,
            first_name: 1,
            last_name: 1,
            user_headline: 1,
            user_profile_image: 1,
          },
          populate: {
            path: 'user_profile_image',
            model: 'media',
            select: {
              url: 1,
            },
          },
        })
        .populate({
          path: 'receiver_id',
          select: {
            url: 1,
            type: 1,
            first_name: 1,
            last_name: 1,
            user_headline: 1,
            user_profile_image: 1,
          },
          populate: {
            path: 'user_profile_image',
            model: 'media',
            select: {
              url: 1,
            },
          },
        });

      let count = await this.cMessageModel.find(filter).count();
      return { messages, count };
    } catch (err) {
      throw err;
    }
  }

  async deleteMessage(organization_code, token, body) {
    try {
      const date = new Date().toISOString();
      if (body.created_at.split('T')[0] !== date.split('T')[0])
        return { message: 'cannot delelte old message' };
      const deletedData = await this.cMessageModel
        .deleteOne({
          organization_code,
          room_id: body.room_id,
          _id: body.message_id,
          sender_id: token.id,
        })
        .then(() => {
          // trigger socket
          this.socket.deleteMessage({
            room_id: body.room_id,
            position: body.position,
          });
        });

      return { message: 'Message deleted successfully', deletedData };
    } catch (err) {
      throw err;
    }
  }
}
