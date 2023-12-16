import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  password: string;
  needsPassword: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface TUserModel extends Model<TUser>{
  // myStaticMethods():number 
  // eslint-disable-next-line no-unused-vars
  isUserExistByCustomId(id:string): Promise<TUser | null>
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(plain_password:string,hash_password:string): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE;