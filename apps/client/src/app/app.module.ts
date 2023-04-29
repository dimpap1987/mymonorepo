import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'
import { LoaderService } from '@mymonorepo/shared/ui/loader'
import { RegisterDialogService } from '@mymonorepo/shared/ui/login'
import { SharedUiNavbarModule } from '@mymonorepo/shared/ui/navbar'
import { SharedUiOnlineUsersModule } from '@mymonorepo/shared/ui/online-users'
import {
  AppLoader,
  APP_ENVIRONMENT,
  DpReuseStrategy,
  RequestInterceptor,
  ResponseInterceptor,
  SharedStateModule,
} from '@mymonorepo/shared/utils'
import { CookieService } from 'ngx-cookie-service'
import { ButtonModule } from 'primeng/button'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

export function load(
  loader: AppLoader,
  cookieService: CookieService,
  registerFormDialog: RegisterDialogService
) {
  return () =>
    loader.init().then(() => {
      if (cookieService.get('UNREGISTERED-USER')) {
        registerFormDialog.open()
      }
    })
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedStateModule,
    // SocketIoModule,
    SharedUiOnlineUsersModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    SharedUiNavbarModule,
    ButtonModule,
  ],
  providers: [
    AppLoader,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [AppLoader, CookieService, RegisterDialogService],
      multi: true,
    },
    {
      provide: APP_ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: RouteReuseStrategy,
      useClass: DpReuseStrategy,
    },
    LoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
