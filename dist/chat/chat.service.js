"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const app_exception_1 = require("./../shared/app-exception");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./../notification/notification.service");
const socket_gateway_service_1 = require("./../utils/socket/socket-gateway.service");
const utils_service_1 = require("./../utils/utils.service");
const shared_service_1 = require("./../shared/shared.service");
const auth_service_1 = require("../auth/auth.service");
const mongoose_2 = require("mongoose");
let ChatService = class ChatService {
    constructor(cRoomModel, cMessageModel, sservice, utilsService, aservice, socket, notificationService) {
        this.cRoomModel = cRoomModel;
        this.cMessageModel = cMessageModel;
        this.sservice = sservice;
        this.utilsService = utilsService;
        this.aservice = aservice;
        this.socket = socket;
        this.notificationService = notificationService;
    }
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
            }
            else {
                let createRoom = await this.cRoomModel.create(fv);
                return createRoom;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async removeRoom(organization_code, id) {
        try {
            await this.cRoomModel.findOneAndDelete({ _id: id, organization_code });
            return { message: 'room destroyed successfully' };
        }
        catch (err) {
            throw err;
        }
    }
    async getRoomDetail(organization_code, token, body) {
        var _a;
        try {
            let chat_data = {};
            let room_data = await this.cRoomModel
                .findOne({
                organization_code,
                room_cat: { $eq: 'individual' },
                $or: [
                    {
                        members: { $all: [token.id, body.user_id] }
                    }, {
                        _id: body.room_id
                    }
                ]
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
            if (!room_data)
                return { message: 'no room found' };
            room_data['members'] = (_a = room_data.members.filter(el => el['_id'] != token.id)) === null || _a === void 0 ? void 0 : _a[0];
            return room_data;
        }
        catch (err) {
            throw err;
        }
    }
    async getChatList(organization_code, token, room_id) {
        try {
            return await this.cMessageModel.findOne({
                organization_code,
                room_id,
            });
        }
        catch (err) {
            throw err;
        }
    }
    async getMyRoomList(organization_code, token, skip = 0, limit = 20) {
        var _a;
        try {
            let filter = {
                organization_code,
                $or: [{ sender_id: token.id }, { receiver_id: token.id }],
                is_delete: false,
            };
            const messages = await this.cMessageModel
                .find(filter)
                .sort('-created_at DESC')
                .skip(skip)
                .limit(limit * 10).lean();
            const messagesCopy = [...messages];
            let messageIds = this.sservice.returnUniqueRecords(messages.map(el => el.room_id));
            let data = await this.cRoomModel
                .find({
                $and: [
                    { _id: { $in: messageIds }, organization_code },
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
                data[i]['members'] = (_a = data[i].members.filter(el => el['_id'] != token.id)) === null || _a === void 0 ? void 0 : _a[0];
                if (messages.length) {
                    const fetchMessage = messages.find(el => el.room_id.toString() == data[i]._id.toString());
                    if (fetchMessage && !data[i]['lastMessage']) {
                        data[i]['lastMessage'] = fetchMessage.sender_id == token.id ? 'You: ' + fetchMessage.content : fetchMessage.content;
                        data[i]['lastMessageCreated'] = fetchMessage['created_at'];
                    }
                }
            }
            data.sort((a, b) => {
                return (a['lastMessageCreated'] > b['lastMessageCreated']) ? -1 : ((a['lastMessageCreated'] < b['lastMessageCreated']) ? 1 : 0);
            });
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async getMyRoomIdsList(organization_code, token) {
        try {
            let data = await this.cRoomModel
                .find({
                $and: [
                    { members: { $in: [token.id] }, organization_code },
                    { room_cat: { $ne: 'CGroup' } },
                ],
            })
                .sort({ created_at: -1 })
                .select('_id')
                .lean();
            return data;
        }
        catch (err) {
            throw err;
        }
    }
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
            if (!newMessage)
                throw new app_exception_1.AppException('failed to send message', common_1.HttpStatus.FORBIDDEN);
            const newMessageProcessed = await this.cMessageModel
                .findOne({ _id: newMessage._id })
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
            });
            let roomMembers = await this.cRoomModel.findOne({
                organization_code,
                _id: body.room_id,
            });
            newMessage['userIds'] = roomMembers.members.filter(el => el != token.id);
            this.socket.addMessage(newMessageProcessed);
            return newMessageProcessed;
        }
        catch (err) {
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
            });
            messages.reverse();
            let count = await this.cMessageModel.find(filter).count();
            return { messages, count };
        }
        catch (err) {
            throw err;
        }
    }
    async updateMessage(organization_code, token, body) {
        try {
            const date = new Date().toISOString();
            if (body.created_at.split('T')[0] !== date.split('T')[0])
                return { message: 'cannot update old message' };
            const updatedData = await this.cMessageModel.findOneAndUpdate({
                organization_code,
                room_id: body.room_id,
                _id: body.message_id,
                sender_id: token.id,
            }, {
                content: body.content,
                is_edited: true,
            }, {
                new: true,
            });
            this.socket.updateMessage({
                room_id: body.room_id,
                position: body.position,
                data: updatedData,
            });
            return { message: 'Message updated successfully', updatedData };
        }
        catch (err) {
            throw err;
        }
    }
    async deleteMessage(organization_code, token, body) {
        try {
            const date = new Date().toISOString();
            if (body.created_at.split('T')[0] !== date.split('T')[0])
                return { message: 'cannot delete old message' };
            const deletedData = await this.cMessageModel
                .deleteOne({
                organization_code,
                room_id: body.room_id,
                _id: body.message_id,
                sender_id: token.id,
            })
                .then(() => {
                this.socket.deleteMessage({
                    room_id: body.room_id,
                    position: body.position,
                    message_id: body.message_id,
                });
            });
            return { message: 'Message deleted successfully', deletedData };
        }
        catch (err) {
            throw err;
        }
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('chat-room')),
    __param(1, mongoose_1.InjectModel('chat-message')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        shared_service_1.SharedService,
        utils_service_1.UtilsService,
        auth_service_1.AuthService,
        socket_gateway_service_1.socketGateway,
        notification_service_1.NotificationService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map