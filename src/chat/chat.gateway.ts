import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(4001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    users: number = 0;

    private logger = new Logger('AppGateway');

    constructor() {
        setInterval(() => {
            this.server.emit('chat', 'test fire');
          }, 5000);
    }

    async handleConnection(client){

        this.logger.log('new clent connected');
        // A client has connected
        this.users++;

        // Notify connected clients of current users
        client.emit('users', this.users);

    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    @SubscribeMessage('chat')
    async onChat(client, message){
        this.logger.log(message);
        client.broadcast.emit('chat', message);
    }

}