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

@WebSocketGateway(8081, {
  namespace: 'documento',
})
export class DocumentoGateway {
  @WebSocketServer() wss: Server;

  private logger = new Logger('DocumentoGateway');
}
