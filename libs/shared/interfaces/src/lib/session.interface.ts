import { UserInterface } from './user.interface';

export interface SessionInterface {
  accessToken: string;
  expires: string;
  user: UserInterface;
}
