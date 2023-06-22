import { Role } from '../model';

export type UpdateUserRequestBody = {
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  image: string;
  userId: string;
};
