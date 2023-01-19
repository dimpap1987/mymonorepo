import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { JwtPayloadInterface, JwtTokensInterface, SessionInterface } from "@mymonorepo/shared/interfaces";
import { Store } from "@ngrx/store";
import { catchError, Observable, tap, throwError } from "rxjs";
import { removeUser, saveUser, User } from "../+state";
import { ConstantsClient } from "../contants/constants-client";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<{ user: User }>,
              // private websocketService: WebSocketService,
              private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  public parseJwt(token: string): JwtPayloadInterface | undefined {
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

  session(): Observable<SessionInterface> {
    return this.httpClient.get(ConstantsClient.endpoints().api.session) as Observable<SessionInterface>;
  }

  fetchRefreshToken() {
    return this.httpClient.get<JwtTokensInterface>(
      ConstantsClient.endpoints().api.refreshTokenUrl,
      {
        headers: {
          'refresh-token': this.localStorageService.refreshToken.get() as string
        }
      })
      .pipe(
        catchError((error) => {
          this.logOut()
          return throwError(() => error)
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
    const payload = this.parseJwt(tokens.accessToken);
    if (!payload || !payload.user) return;
    this.localStorageService.accessToken.set(tokens.accessToken)
    this.localStorageService.refreshToken.set(tokens.refreshToken)
    this.store.dispatch(saveUser({user: payload.user}));
  }
}
