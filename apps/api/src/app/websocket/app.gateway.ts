import { UserInterface } from '@mymonorepo/shared/interfaces'
import { Logger, UseGuards } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import * as json from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'
import { WsGuard } from '../guards/ws-guard'
import { UserSessionCache } from '../services/user-session-cache'

@UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public static readonly ONLINE_ROOM = 'online-room'

  constructor(private userSessionCache: UserSessionCache) {}

  @WebSocketServer() server: Server
  private logger: Logger = new Logger('AppGateway')

  @SubscribeMessage('user-join')
  async joinRoom(client: Socket, payload: any) {
    await this.join(client, payload)
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
    const token = client.handshake.headers?.authorization
    const user = json.verify(token, process.env.JWT_SECRET_KEY) as UserInterface
    if (user) {
      // await this.userSessionCache.addOrUpdate(user.email, client.id)
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    await this.userSessionCache.handleDisconnection(client.id)
  }

  async join(client: Socket, payload: any, room = AppGateway.ONLINE_ROOM) {
    client.join(room)
    await this.userSessionCache.addOrUpdate(payload, client.id)
    await this.publishOnlineUsers()
  }

  private async publishOnlineUsers() {
    const activeUsers = await this.userSessionCache.getAllUsers()
    this.server.emit(
      'online-users',
      activeUsers?.map(x => ({
        email: x.userName,
        lastConnectedTime: x.lastConnectedTime,
        loggedIn: x.loggedIn,
      }))
    )
  }
}
