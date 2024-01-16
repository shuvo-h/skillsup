import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;
// export type TUserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPassword: boolean;
  passwordChangedAt?: Date;
  // role: 'admin' | 'student' | 'faculty';
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  // myStaticMethods():number
  // eslint-disable-next-line no-unused-vars
  isUserExistByCustomId(id: string): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(
    plain_password: string,
    hash_password: string,
  ): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  isJwtIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}


