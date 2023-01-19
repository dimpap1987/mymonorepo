import { UserJwtInterface } from './user-jwt.interface';

export interface SessionInterface {
  accessToken: string;
  expires: string;
  user: UserJwtInterface;
}
