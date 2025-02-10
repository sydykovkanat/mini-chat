import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';

@WebSocketGateway(8001, { cors: { origin: '*' } })
export class ChatGateway {
  constructor(private prisma: PrismaService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('messages')
  async handleMessage(@MessageBody() message: { message: string; name: string }) {
    await this.prisma.message.create({
      data: {
        message: message.message,
        name: message.name,
      },
    });

    this.server.emit('messages', { message });
  }

  @SubscribeMessage('user-connected')
  handleUserConnected(@MessageBody() username: string) {
    this.server.emit('user-connected', { username });
  }
}
