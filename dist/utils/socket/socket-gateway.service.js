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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let socketGateway = class socketGateway {
    constructor() {
        this.nicknames = new Map();
    }
    handleDisconnect(client) {
        this.server.emit('users-changed', {
            user: this.nicknames[client.id],
            event: 'left',
        });
    }
    setNickname(client, myData) {
        this.nicknames[myData.myId] = myData.nickname;
        this.server
            .to(myData.room_id)
            .emit('user-changed', { user: '', event: 'joined' });
    }
    handleConnection(client) {
        console.log('client id tracker here', client.id);
        client.broadcast.emit('users-changed', {
            user: '',
            event: 'joined',
        });
    }
    enterRoom(client, message) {
        client.join(message.room_id);
    }
    async addMessage(message) {
        this.server.to(message.room_id).emit('add-message', message);
    }
    deleteMessage(message) {
        this.server.to(message.room_id).emit('deleteMessage', {
            position: message.position,
            room_id: message.room_id,
            message_id: message.message_id,
        });
    }
    updateMessage(message) {
        this.server.to(message.data.room_id).emit('updateMessage', {
            position: message.position,
            updated_mesasge: message.data
        });
    }
    async addMemberInChat(client, message) {
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
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], socketGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('set-nickname'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "setNickname", null);
__decorate([
    websockets_1.SubscribeMessage('enter-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "enterRoom", null);
__decorate([
    websockets_1.SubscribeMessage('addMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], socketGateway.prototype, "addMessage", null);
__decorate([
    websockets_1.SubscribeMessage('deleteMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "deleteMessage", null);
__decorate([
    websockets_1.SubscribeMessage('updateMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "updateMessage", null);
__decorate([
    websockets_1.SubscribeMessage('addMember'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], socketGateway.prototype, "addMemberInChat", null);
socketGateway = __decorate([
    websockets_1.WebSocketGateway({ path: '' })
], socketGateway);
exports.socketGateway = socketGateway;
//# sourceMappingURL=socket-gateway.service.js.map