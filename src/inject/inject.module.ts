import { Module } from '@nestjs/common';
import { InjectController } from './inject.controller';
import { InjectService } from './inject.service';
import { ChatGateway } from '../chat/chat.gateway';

@Module({
  imports: [],
  controllers: [InjectController],
  providers: [InjectService, ChatGateway],
})
export class InjectModule {}
