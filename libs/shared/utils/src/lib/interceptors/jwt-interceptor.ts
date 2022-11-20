import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConstantsClient} from "../contants/constants-client";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //TODO check the url
    const token = localStorage.getItem(ConstantsClient.auth().token)
    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(request);
  }
}