import { Model, Types } from 'mongoose';

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
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

// for creating custom instance mongoose OOP model method
export type StudentInstanceMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExistByInstanceMethod(id: string): Promise<TStudent | null>;
};
export type TStudentInstanceModel = Model<
  TStudent,
  Record<string, never>,
  StudentInstanceMethods
>;

// for creating custom static mongoose OOP model method
export interface StudentStaticModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExistByStaticMethod(id: string): Promise<TStudent | null>;
}
