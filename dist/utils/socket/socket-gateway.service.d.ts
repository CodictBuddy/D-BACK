import { OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class socketGateway implements OnGatewayDisconnect, OnGatewayConnection {
    server: Server;
    nicknames: Map<string, string>;
    handleDisconnect(client: Socket): void;
    setNickname(client: Socket, myData: any): void;
    handleConnection(client: Socket): void;
    enterRoom(client: Socket, message: any): void;
    addMessage(message: any): Promise<void>;
    deleteMessage(message: any): void;
    updateMessage(message: any): void;
    addMemberInChat(client: Socket, message: any): Promise<void>;
    catchNotification(message: any): void;
    catchMessageNotification(message: any): void;
    createMessages(body: any): Promise<void>;
}
