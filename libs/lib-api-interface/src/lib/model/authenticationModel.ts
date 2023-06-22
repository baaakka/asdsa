import { Role } from '.';

export interface AuthenticationModel {
  id: string;
  authToken: string;
  authTokenType: string;
  refreshToken: string;
  role: Role;
}
