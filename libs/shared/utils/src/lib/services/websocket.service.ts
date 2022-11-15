import {Injectable} from '@angular/core';
import {interval, mergeMap, take, timer} from "rxjs";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  static readonly USER_JOIN = 'user-join';
  static readonly ONLINE_USERS = 'online-users';

  websocket!: Socket;

  sendTo(room: string, payload: any) {
    this.checkConnection();
    this.websocket.emit(room, payload);
  }

  close() {
    this.checkConnection();
    this.websocket.disconnect();
  }

  listenTo(room: string) {
    this.checkConnection();
    return this.websocket.fromEvent(room)
  }

  private userPing(userName: string): void {
    this.checkConnection();
    this.sendTo(WebSocketService.USER_JOIN, userName);
  }

  ping(email: string) {
    if (!email) return;
    return interval(1000).subscribe(() => this.userPing(email));
  }

  fetchUsers(seconds: number) {
    return timer(0, seconds)
      .pipe(
        mergeMap(() => this.listenTo(WebSocketService.ONLINE_USERS)
          .pipe(take(1))
        )
      )
  }

  private checkConnection() {
    if (!this.websocket) {
      throw Error('No websocket connection...');
    }
  }

  connect() {
    this.websocket = new Socket({
      url: 'http://localhost:3333',
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: localStorage.getItem('token')
            }
          }
        }
      }
    });
    this.websocket.connect();
  }
}
