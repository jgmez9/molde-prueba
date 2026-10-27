import { Role } from '../enum/role.enum.js';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: Role;
}