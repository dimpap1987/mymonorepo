import {Injectable} from '@angular/core';
import {removeUser, saveUser, User} from "../+state";
import {Store} from "@ngrx/store";
import {ConstantsClient} from "../contants/constants-client";
import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
import {LocalStorageService} from "./local-storage.service";
import {JwtTokensInterface, UserJwtInterface} from "@mymonorepo/shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<{ user: User }>,
              // private websocketService: WebSocketService,
              private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  public parseJwt(token: string): UserJwtInterface | undefined {
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logOut() {
    this.localStorageService.refreshToken.remove();
    this.removeUser();
    // this.websocketService.close();
  }

  removeUser() {
    this.localStorageService.accessToken.remove();
    this.store.dispatch(removeUser())
  }

  me(): Observable<any> {
    return this.httpClient.get(ConstantsClient.endpoints().api.me);
  }

  fetchRefreshToken() {
    const params = new HttpParams().set('refreshToken', this.localStorageService.refreshToken.get() as string);
    return this.httpClient.get<JwtTokensInterface>(ConstantsClient.endpoints().api.refreshTokenUrl, {params: params})
      .pipe(
        map(tokens => {
          if (!tokens || !tokens.refreshToken) throw Error("Invalid Refresh Token")
          return tokens;
        }),
        tap((tokens: JwtTokensInterface) => {
          this.handleTokensResponse(tokens);
        }));
  }

  cloneRequestWithBearToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }

  handleTokensResponse(tokens: JwtTokensInterface) {
    this.localStorageService.accessToken.set(tokens.accessToken)
    this.localStorageService.refreshToken.set(tokens.refreshToken)
    const user = this.parseJwt(tokens.accessToken);
    if (!user) return;
    this.store.dispatch(saveUser({user: user}));
  }
}
