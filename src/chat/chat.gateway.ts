import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Client } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(4001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    users: any[] = [];

    private logger = new Logger('AppGateway');

    async handleConnection(client) {
        this.logger.log('new clent connected');
        client.emit('users', this.users);
    }

    async handleDisconnect(client) {
        this.logger.log('client disconnected');
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('message')
    async onChat(client, message) {
        this.logger.log(message);
        client.broadcast.emit('message', message);
    }

}
