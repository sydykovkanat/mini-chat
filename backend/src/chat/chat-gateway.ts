import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`client ${client.id} connected`);

    this.server.emit('user-connected', {
      message: `client ${client.id} connected`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);

    this.server.emit('user-disconnected', {
      message: `client ${client.id} disconnected`,
    });
  }

  @SubscribeMessage('messages')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('messages', { message });
  }
}
