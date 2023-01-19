import {RolesEnum} from "@mymonorepo/shared/interfaces";

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string
  profileId?: string
  roles?: RolesEnum[];
  lastConnectedTime?: string;
}
