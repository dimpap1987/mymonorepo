import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {ConstantsClient} from "../contants/constants-client";
import {AuthService, LocalStorageService} from "../services";
import {JwtTokensInterface} from "@mymonorepo/shared/interfaces";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(request, error, next)
      ));
  }

  private handleError(request: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler) {
    if (error.status == HttpStatusCode.Unauthorized && !request.url.includes(ConstantsClient.endpoints().api.refreshTokenUrl)) {
      return this.handleUnauthorizedResponse(request, next, error);
    }
    return throwError(() => error);
  }

  private handleUnauthorizedResponse(request: HttpRequest<unknown>, next: HttpHandler, error: HttpErrorResponse): any {
    this.authService.removeUser();
    if (this.localStorageService.refreshToken.get()) {
      return this.authService.fetchRefreshToken()
        .pipe(
          switchMap((tokens: JwtTokensInterface) => {
            request = this.authService.cloneRequestWithBearToken(request, tokens.accessToken)
            return next.handle(request);
          }),
          catchError(() => {
            this.navigateToLoginPage();
            return throwError(() => error);
          })
        )
    } else {
      this.navigateToLoginPage()
      return throwError(() => error);
    }
  }

  private navigateToLoginPage(): void {
    this.router.navigate([ConstantsClient.endpoints().ui.login])
  }
}
