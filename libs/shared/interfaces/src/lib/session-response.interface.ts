import { UserJwtInterface } from "./user-jwt.interface";

export interface SessionResponseInterface {
    expires: string;
    user: UserJwtInterface;
  }