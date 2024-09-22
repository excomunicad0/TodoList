import type { User } from './userType';

export type RegistrationResponse = {
  user: User;
  accessToken: string;
};
