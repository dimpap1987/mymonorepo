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
import {map} from "rxjs/operators";
import {ConstantsClient} from "../contants/constants-client";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error?.status == HttpStatusCode.Unauthorized) {
      localStorage.removeItem(ConstantsClient.auth().token);
      this.router.navigate([ConstantsClient.endpoints().ui.login])
    }
    return throwError(() => error);
  }
}
