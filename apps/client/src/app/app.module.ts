import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'
import { LoaderService } from '@mymonorepo/shared/ui/loader'
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
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

export function load(loader: AppLoader) {
  return () => loader.init()
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
  ],
  providers: [
    AppLoader,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [AppLoader],
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
