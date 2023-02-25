import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, Observable, throwError } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ConstantsClient } from '../contants/constants-client'
import { AuthService } from '../services'

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(request, error, next))
      )
  }

  private handleError(
    request: HttpRequest<unknown>,
    error: HttpErrorResponse,
    next: HttpHandler
  ) {
    if (
      error.status == HttpStatusCode.Unauthorized &&
      !request.url.includes(ConstantsClient.endpoints().api.refreshTokenUrl)
    ) {
      return this.handleUnauthorizedResponse(request, next, error)
    }
    return throwError(() => error)
  }

  private handleUnauthorizedResponse(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    error: HttpErrorResponse
  ): any {
    return this.authService.fetchRefreshToken().pipe(
      mergeMap(() => {
        request = this.authService.cloneRequestWithBearToken(request)
        return next.handle(request)
      }),
      catchError(() => {
        this.authService.logOut()
        this.navigateToLoginPage()
        return throwError(() => error)
      })
    )
  }

  private navigateToLoginPage(): void {
    this.router.navigate([ConstantsClient.endpoints().ui.login])
  }
}
