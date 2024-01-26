import { Role } from '../../common/enums';

export interface ActiveUserData {
  sub: number;

  email: string;

  role: Role;

  iat: number;
  exp: number;

  jti: string;
}
