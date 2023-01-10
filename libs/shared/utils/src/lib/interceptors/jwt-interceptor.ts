import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APP_ENVIRONMENT, ConstantsClient} from "../contants/constants-client";
import {AuthService} from "../services";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_ENVIRONMENT) private env: any,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const isApiUrl = request.url.startsWith(this.env.apiBaseUrl);
    const token = localStorage.getItem(ConstantsClient.auth().accessToken)
    if (token) {
      request = this.authService.cloneRequest(request, token)
    }
    return next.handle(request);
  }
}
