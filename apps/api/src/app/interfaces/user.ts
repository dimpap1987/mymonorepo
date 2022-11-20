import {Roles} from "@mymonorepo/shared/utils";

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string
  accessToken?: string;
  profileId?: string
  roles?: Roles[];
  lastConnectedTime?: string;
}
