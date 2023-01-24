import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService, LocalStorageService} from "../services";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const isApiUrl = request.url.startsWith(this.env.apiBaseUrl);
    const token = this.localStorageService.accessToken.get()
    if (token) {
      request = this.authService.cloneRequestWithBearToken(request)
    }
    return next.handle(request);
  }
}
