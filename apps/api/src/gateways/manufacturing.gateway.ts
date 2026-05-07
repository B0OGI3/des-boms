import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' } })
export class ManufacturingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(ManufacturingGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:workstation')
  handleJoinWorkstation(@MessageBody() workstationId: string, @ConnectedSocket() client: Socket) {
    client.join(`workstation:${workstationId}`);
  }

  @SubscribeMessage('join:batch')
  handleJoinBatch(@MessageBody() batchId: string, @ConnectedSocket() client: Socket) {
    client.join(`batch:${batchId}`);
  }

  emitBatchUpdate(batchId: string, data: unknown) {
    this.server.to(`batch:${batchId}`).emit('batch:updated', data);
  }

  emitStepConfirmed(workstationId: string, data: unknown) {
    this.server.to(`workstation:${workstationId}`).emit('step:confirmed', data);
  }

  emitBatchStatusChanged(batchId: string, status: string) {
    this.server.emit('batch:status', { batchId, status });
  }
}
