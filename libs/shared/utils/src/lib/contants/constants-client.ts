import { InjectionToken } from '@angular/core'

export const APP_ENVIRONMENT = new InjectionToken('APP_ENVIRONMENT_TOKEN')

export class ConstantsClient {
  constructor() {}

  static auth(): Readonly<Authentication> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      facebookRedirectUrl: '/api/v1/auth/facebook/login',
      googleRedirectUrl: '/api/v1/auth/google/login',
      githubRedirectUrl: '/api/v1/auth/github/login',
    }
  }

  static endpoints(): Readonly<Endpoints> {
    return {
      api: {
        apiBaseUrl: 'http://localhost:3333', //TODO environment variable
        session: '/api/v1/auth/session',
        refreshTokenUrl: '/api/v1/auth/refresh-token',
        logOut: '/api/v1/auth/log-out',
      },
      ui: {
        login: 'login',
        snippets: {
          recent: 'snippets/recent',
          create: 'snippets/create',
        },
        dashboard: 'dashboard',
      },
    }
  }
}

export interface Authentication {
  accessToken: string
  refreshToken: string
  googleRedirectUrl: string
  facebookRedirectUrl: string
  githubRedirectUrl: string
}

export interface Endpoints {
  api: ApiEndpoints
  ui: UiEndpoints
}

export interface ApiEndpoints {
  apiBaseUrl: string
  session: string
  refreshTokenUrl: string
  logOut: string
}

export interface UiEndpoints {
  login: string
  snippets: any
  dashboard: string
}
