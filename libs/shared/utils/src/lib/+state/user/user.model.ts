export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string
  profileId?: string
  roles?: Roles[];
  loggedIn: boolean;
  lastConnectedTime?:string;
  provider?: string;
}

export enum Roles {
  ADMIN,
  USER
}
