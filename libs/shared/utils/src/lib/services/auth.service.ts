import {Injectable} from '@angular/core';
import {removeUser, User} from "../+state";
import {Store} from "@ngrx/store";
import {WebSocketService} from "./websocket.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<{ user: User }>,
              private websocketService: WebSocketService) {
  }

  public parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.websocketService.close();
    this.store.dispatch(removeUser())
  }
}
