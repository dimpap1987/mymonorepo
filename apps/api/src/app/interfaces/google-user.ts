export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string
  accessToken?: string;
  jwt?: string;
  profileId: string
}
