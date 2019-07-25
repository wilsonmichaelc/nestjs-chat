import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Client } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(4001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    users: any[] = [];

    private logger = new Logger('ChatGateway');

    async handleConnection(client) {
        this.logger.log('new clent connected');
        client.emit('connect', 'connected.');
    }

    async handleDisconnect(client) {
        this.logger.log('client disconnected');
        this.server.emit('disconnect', 'disconnected');
    }

    @SubscribeMessage('message')
    async onChat(client, message) {
        this.logger.log(message);
        client.broadcast.emit('message', message);
    }

    test(): Promise<any> {
        return new Promise(resolve => {
            this.server.emit('message', 'hello!!!!');
            this.logger.log('emitting message: hello!!!!!');
            resolve();
        });
    }

}
