import {InjectionToken} from "@angular/core";

export const APP_ENVIRONMENT = new InjectionToken("APP_ENVIRONMENT_TOKEN");

export class ConstantsClient {

  constructor() {
  }

  static auth(): Readonly<Authentication> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      facebookRedirectUrl: '/api/v1/auth/facebook/login',
      googleRedirectUrl: '/api/v1/auth/google/login'
    }
  }

  static endpoints(): Readonly<Endpoints> {
    return {
      api: {
        apiBaseUrl: 'http://localhost:3333', //TODO environment variable
        me: `/api/v1/auth/me`,
        refreshTokenUrl: '/api/v1/auth/refresh-token'
      },
      ui: {
        login: 'login'
      }
    }
  }
}


export interface Authentication {
  accessToken: string;
  refreshToken: string;
  googleRedirectUrl: string;
  facebookRedirectUrl: string;
}

export interface Endpoints {
  api: ApiEndpoints;
  ui: UiEndpoints;
}

export interface ApiEndpoints {
  apiBaseUrl: string;
  me: string;
  refreshTokenUrl: string;
}

export interface UiEndpoints {
  login: string;
}
