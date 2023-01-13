import {Injectable} from '@angular/core';
import {removeUser, saveUser, User} from "../+state";
import {Store} from "@ngrx/store";
import {ConstantsClient} from "../contants/constants-client";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
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

  me(): Observable<UserJwtInterface> {
    return this.httpClient.get(ConstantsClient.endpoints().api.me) as Observable<UserJwtInterface>;
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
    const user = this.parseJwt(tokens.accessToken);
    if (!user) return;
    this.localStorageService.accessToken.set(tokens.accessToken)
    this.localStorageService.refreshToken.set(tokens.refreshToken)
    this.store.dispatch(saveUser({user: user}));
  }
}
