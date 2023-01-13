import {RolesEnum} from "./roles.enum";

export interface UserJwtInterface {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  profileId?: string;
  provider?: string;
  roles?: RolesEnum[];
}
