import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { InjectModule } from './inject/inject.module';

@Module({
  imports: [
    ChatModule,
    InjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
