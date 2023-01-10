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
import {AuthService} from "../services";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => this.handleError(request, error, next)
      ));
  }

  private handleError(request: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler) {
    if (error?.status == HttpStatusCode.Unauthorized || error?.status == HttpStatusCode.Forbidden) {
      return this.handleUnauthorizedResponse(request, next);
    }
    return throwError(() => error);
  }

  private navigateToLoginPage(): any {
    this.router.navigate([ConstantsClient.endpoints().ui.login])
  }

  private handleUnauthorizedResponse(request: HttpRequest<any>, next: HttpHandler): any {
    this.authService.removeUser();

    if (localStorage.getItem(ConstantsClient.auth().refreshToken)) {

      return this.authService.refreshToken()
        .pipe(
          switchMap((tokens: any) => {
            request = this.authService.cloneRequest(request, tokens.accessToken)
            return next.handle(request);
          }),
          catchError(() => this.navigateToLoginPage())
        )

    } else {
      this.navigateToLoginPage()
    }
  }
}
