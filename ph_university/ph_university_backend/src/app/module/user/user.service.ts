import { AcademicSemesterModel } from './../academicSemester/academicSemester.model';
import { StudentModel } from './../student/student.model';
import { env } from '../../config/config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';
import { USER_ROLE } from './user.constant';
import { uploadImgToCloudinary } from '../../utils/uploadImgToCloudinary';
import { QRCodeUtils } from '../../utils/QRcode';
import { JwtPayload } from 'jsonwebtoken';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  multerProfileImg: any,
) => {
  /*
    // [OOP 1]: built-in static method .create()
    const isStudentExist = await StudentModel.isUserExistByStaticMethod(
      student.id,
    );
    if (isStudentExist)
      throw new Error('Id already exist by static custom method');
    const result = await StudentModel.create(student);
    */

  /*
    // instance way
    // [OOP]: biuil-in instance method
    const studentObj = new StudentModel(student);
  
    // [OOP]: custom instance method in schema model file 
    const isExist = await studentObj.isUserExistByInstanceMethod(student.id); 
    if (isExist)  throw new Error("Id already exist by instance custom method");
  
    const result = await studentObj.save();
    */

  // create a user object
  const userData: Partial<TUser> = {}; // Partial = take some of the properties, rest are optional
console.log("ok");

  // if password not given, use default password
  userData.password = password || (env.default_password as string);

  // set user role as student
  userData.role = 'student';
  userData.email = studentData.email;

  // auto generate id

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admission semester didn't found");
  }

  // check department
  const academicDepartment = await AcademicDepartmentModel.findById(studentData.academicDepartment);
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic department didn't found");
  }
  studentData.academicFaculty = academicDepartment.academicFaculty;
  
  // use transecction when operation in two database to keep data consistency when get any error
  // [transition_step: 1]: create session
  const session = await mongoose.startSession();

  try {
    // [transition_step: 2]: start transection
    session.startTransaction();
    if (admissionSemester) {
      userData.id = await generateStudentId(admissionSemester);
    }
    
    console.log(userData);
    
    // upload profile image to cloudinary
    if (multerProfileImg?.path) {
      const imgName = `${userData.id}-${studentData.name.firstName}`;
      const imgMulterFilePath = multerProfileImg.path;
      const { secure_url } = await uploadImgToCloudinary(
        imgName,
        imgMulterFilePath,
      );
      studentData.profileImg = secure_url; // profile image from cloudinary
      if (!secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upload image');
      }
      
    }

    // [transition_step: 3.1]: create a user(transection_1)
    const newUser = await UserModel.create([userData], { session }); // session receive data as array, and also return data in array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set id, _id as user
    studentData.id = newUser[0].id; // embeding id for query
    studentData.user = newUser[0]._id; // reference ID for populate
    

    // [transition_step: 3.2]: create a student(transection_2)
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // [transition_step: 4]: commit the transection to save modified data to database
    await session.commitTransaction();
    // [transition_step: 5]: end the session after commiting to DB
    await session.endSession();

    return newStudent;
  } catch (error) {
    console.log(error);

    // [transition_step: 6]: cancel the transection
    await session.abortTransaction();
    // [transition_step: 7]: end the session after aborting
    await session.endSession();
    throw new AppError(
      500,
      (error as { message: string }).message || 'Failed to create student',
    );
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty,multerProfileImg: any,) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (env.default_password as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    if (multerProfileImg) {
      const imgName = `${userData.id}-${payload?.name?.firstName}`;
      const imgMulterFilePath = multerProfileImg?.path;
      const { secure_url } = await uploadImgToCloudinary(
        imgName,
        imgMulterFilePath,
      );
      payload.profileImg = secure_url; // profile image from cloudinary
      if (!secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upload image');
      }
      
    }

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty,multerProfileImg:any) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (env.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    if (multerProfileImg) {
      const imgName = `${userData.id}-${payload?.name?.firstName}`;
      const imgMulterFilePath = multerProfileImg?.path;
      const { secure_url } = await uploadImgToCloudinary(
        imgName,
        imgMulterFilePath,
      );
      payload.profileImg = secure_url; // profile image from cloudinary
      if (!secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upload image');
      }
      
    }


    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === USER_ROLE.student) {
    result = await StudentModel.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }else if (role === USER_ROLE['super-admin']) {
    result = await UserModel.findOne({ id: userId });
  }

  // const result = await
  return result;
};
const changeStatusIntoDb = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    {
      status: payload.status,
    },
    { new: true, runValidators: true, upsert: false },
  );

  // const result = await
  return result;
};
const createUserQrCode = async (payload: JwtPayload) => {
  const stringifiedUser = JSON.stringify(payload);
  const result = await QRCodeUtils.createQRcode(stringifiedUser);

  // const result = await
  return result;
};
const decodeUserQrCode = async (payload: string) => {
  console.log(payload);
  
  const result = await QRCodeUtils.decodeQRcode(payload);

  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatusIntoDb,
  createUserQrCode,
  decodeUserQrCode,
};
