import { Role } from '../model';

export interface RegisterRequestBody {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  comment?: string;
  adminPassword?: string;
  recoveryPhase: string;
  avatar?: string;
  username: string;
}
