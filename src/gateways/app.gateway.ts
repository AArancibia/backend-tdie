import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8081)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized ');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  // One to One
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {
      data: text,
      event: 'msgToServer',
    };
  }
}
