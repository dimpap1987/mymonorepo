import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";
import {UserSessionCache} from "../services/user-session-cache";

@WebSocketGateway({cors: true})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private userSessionCache: UserSessionCache) {
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');


  @SubscribeMessage('user-join')
  async joinRoom(client: Socket, payload: any) {
    this.logger.log("user-join", payload);
    await this.join(client, payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    await this.userSessionCache.remove(client.id);
    await this.publishOnlineUsers();
  }


  async join(client: Socket, payload: any) {
    client.join('online-room');
    await this.userSessionCache.addOrUpdate(payload, client.id);
    await this.publishOnlineUsers();
  }

  private async publishOnlineUsers() {
    this.logger.log(`Publish online users`);
    const activeUsers = await this.userSessionCache.getAllActive();
    this.server.emit('online-users', activeUsers.map(x => x.userName));
  }
}
