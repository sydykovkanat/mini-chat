import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gateway';
import { PrismaService } from '../../prisma/prisma.service';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatGateway, PrismaService, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
