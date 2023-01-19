import { RolesEnum } from './roles.enum';

export interface UserInterface {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  profileId?: string;
  provider?: string;
  roles?: RolesEnum[];
  lastConnectedTime?: string;
}