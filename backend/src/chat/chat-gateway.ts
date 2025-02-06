import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8001, { cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('messages')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('messages', { message });
  }

  @SubscribeMessage('user-connected')
  handleUserConnected(@MessageBody() username: string) {
    this.server.emit('user-connected', { username });
  }
}
