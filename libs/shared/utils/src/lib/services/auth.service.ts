import {Injectable} from '@angular/core';
import {removeUser, saveUser, User} from "../+state";
import {Store} from "@ngrx/store";
import {WebSocketService} from "./websocket.service";
import {ConstantsClient} from "../contants/constants-client";
import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<{ user: User }>,
              private websocketService: WebSocketService,
              private httpClient: HttpClient) {
  }

  public parseJwt(token: string) {
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logOut() {
    localStorage.removeItem(ConstantsClient.auth().accessToken);
    localStorage.removeItem(ConstantsClient.auth().refreshToken);
    // this.websocketService.close();
    this.store.dispatch(removeUser())
  }

  removeUser() {
    localStorage.removeItem(ConstantsClient.auth().accessToken);
    this.store.dispatch(removeUser())
  }

  me(): Observable<any> {
    return this.httpClient.get(ConstantsClient.endpoints().api.me);
  }

  refreshToken() {
    const params = new HttpParams()
      .set('refreshToken', localStorage.getItem(ConstantsClient.auth().refreshToken.toString()) as string);

    return this.httpClient.get<any>(ConstantsClient.endpoints().api.refreshTokenUrl, {params: params})
      .pipe(
        map(tokens => {
          if (!tokens || !tokens.refreshToken) {
            throw Error("Invalid Refresh Token")
          }
          return tokens;
        }),
        tap((tokens) => {
          localStorage.setItem(ConstantsClient.auth().accessToken, tokens.accessToken)
          localStorage.setItem(ConstantsClient.auth().refreshToken, tokens.refreshToken)
          const user = this.parseJwt(tokens.accessToken);
          if (!user) return;
          this.store.dispatch(saveUser({user: user}));
        }));
  }

  cloneRequest(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }
}
