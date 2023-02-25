import { Injectable } from '@angular/core'
import { first, interval, mergeMap, Observable, timer } from 'rxjs'
import { Socket } from 'ngx-socket-io'
import { User } from '../+state'
import { ConstantsClient } from '../contants/constants-client'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  static readonly USER_JOIN = 'user-join'
  static readonly ONLINE_USERS = 'online-users'

  websocket!: Socket

  constructor(private localStorageService: LocalStorageService) {}

  sendTo(room: string, payload: any) {
    this.checkConnection()
    this.websocket.emit(room, payload)
  }

  close() {
    this.checkConnection()
    this.websocket.disconnect()
  }

  listenTo(room: string) {
    this.checkConnection()
    return this.websocket.fromEvent(room)
  }

  private userPing(userName: string): void {
    this.checkConnection()
    this.sendTo(WebSocketService.USER_JOIN, userName)
  }

  ping(email: string) {
    if (!email) return
    return interval(1000).subscribe(() => this.userPing(email))
  }

  fetchUsers(seconds = 1000): Observable<User[]> {
    return timer(0, seconds).pipe(
      mergeMap(
        () =>
          <Observable<User[]>>this.listenTo(WebSocketService.ONLINE_USERS).pipe(first())
      )
    )
  }

  private checkConnection() {
    if (!this.websocket) {
      throw Error('No websocket connection...')
    }
  }

  connect() {
    this.websocket = new Socket({
      url: ConstantsClient.endpoints().api.apiBaseUrl,
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: this.localStorageService.accessToken.get(),
            },
          },
        },
      },
    })
    this.websocket.connect()
  }
}
