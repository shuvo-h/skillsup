import { Model } from 'mongoose';

// import { Schema, model, connect } from 'mongoose';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  email: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};

// for creating custom instance mongoose OOP model method
export type StudentInstanceMethods = {
  isUserExistByInstanceMethod(id: string): Promise<TStudent | null>;
};
export type TStudentInstanceModel = Model<
  TStudent,
  Record<string, never>,
  StudentInstanceMethods
>;

// for creating custom static mongoose OOP model method
export interface StudentStaticModel extends Model<TStudent> {
  isUserExistByStaticMethod(id: string): Promise<TStudent | null>;
}
