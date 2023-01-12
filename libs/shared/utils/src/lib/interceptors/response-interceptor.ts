import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
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
      map((event: HttpEvent<unknown>) => event),
      catchError((error: HttpErrorResponse) => this.handleError(request, error, next)
      ));
  }

  private handleError(request: HttpRequest<unknown>, error: HttpErrorResponse, next: HttpHandler) {
    if (error.status == HttpStatusCode.Unauthorized || error.status == HttpStatusCode.Forbidden) {
      if (error.status == HttpStatusCode.Unauthorized) {
        this.authService.removeUser();
      }
      return this.handleUnauthorizedResponse(request, next);
    }
    return throwError(() => error);
  }

  private navigateToLoginPage(): any {
    this.router.navigate([ConstantsClient.endpoints().ui.login])
  }

  private handleUnauthorizedResponse(request: HttpRequest<unknown>, next: HttpHandler): any {
    if (this.localStorageService.refreshToken.get()) {
      return this.authService.fetchRefreshToken()
        .pipe(
          switchMap((tokens: JwtTokensInterface) => {
            request = this.authService.cloneRequestWithBearToken(request, tokens.accessToken)
            return next.handle(request);
          }),
          catchError(() => this.navigateToLoginPage())
        )
    } else {
      this.navigateToLoginPage()
    }
  }
}
