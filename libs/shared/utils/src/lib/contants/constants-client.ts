export class ConstantsClient {

  static auth(): Readonly<Authentication> {
    return {
      token: 'token',
      facebookRedirectUrl: '/api/v1/auth/facebook/login',
      googleRedirectUrl: '/api/v1/auth/google/login'
    }
  }

  static endpoints(): Readonly<Endpoints> {
    return {
      api: {
        apiBaseUrl: 'http://localhost:3333',
        me: `/api/v1/users/me`,
      },
      ui: {
        login: 'login'
      }
    }
  }
}


export interface Authentication {
  token: string;
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
}

export interface UiEndpoints {
  login: string;
}
