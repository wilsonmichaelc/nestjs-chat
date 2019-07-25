import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class InjectService {

    constructor(private chatService: ChatGateway) {}

    async test(): Promise<any> {
        return await this.chatService.test();
    }
}
