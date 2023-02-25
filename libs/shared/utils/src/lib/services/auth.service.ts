import { HttpClient, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  JwtPayloadInterface,
  JwtTokensInterface,
  SessionInterface,
} from '@mymonorepo/shared/interfaces'
import { Store } from '@ngrx/store'
import { Observable, tap } from 'rxjs'
import { removeUser, saveUser, User } from '../+state'
import { ConstantsClient } from '../contants/constants-client'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<{ user: User }>, private httpClient: HttpClient) {}

  public parseJwt(token: string): JwtPayloadInterface | undefined {
    if (!token) return
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  logOut() {
    this.store.dispatch(removeUser())
    this.httpClient.get(ConstantsClient.endpoints().api.logOut).subscribe()
  }

  session(): Observable<SessionInterface> {
    return this.httpClient.get(
      ConstantsClient.endpoints().api.session
    ) as Observable<SessionInterface>
  }

  fetchRefreshToken() {
    return this.httpClient
      .get<JwtTokensInterface>(ConstantsClient.endpoints().api.refreshTokenUrl)
      .pipe(
        tap((tokens: JwtTokensInterface) => {
          this.handleTokensResponse(tokens)
        })
      )
  }

  cloneRequestWithBearToken(request: HttpRequest<unknown>) {
    return request.clone({
      withCredentials: true,
    })
  }

  handleTokensResponse(tokens: JwtTokensInterface) {
    const payload = this.parseJwt(tokens.accessToken)
    if (!payload || !payload.user) return
    this.store.dispatch(saveUser({ user: payload.user }))
  }
}
