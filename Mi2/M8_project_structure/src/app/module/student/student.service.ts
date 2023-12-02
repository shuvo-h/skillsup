
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
/*
const createStudentIntoDB = async (student: TStudent) => {
  // [OOP 1]: built-in static method .create()
  const isStudentExist = await StudentModel.isUserExistByStaticMethod(
    student.id,
  );
  if (isStudentExist)
    throw new Error('Id already exist by static custom method');
  const result = await StudentModel.create(student);

  -------------------------------------------
  // instance way
  // [OOP]: biuil-in instance method
  const studentObj = new StudentModel(student);

  // [OOP]: custom instance method in schema model file 
  const isExist = await studentObj.isUserExistByInstanceMethod(student.id); 
  if (isExist)  throw new Error("Id already exist by instance custom method");

  const result = await studentObj.save();
  --------------------------------------------

  return result;
};
*/
const getAllStudentsFromDB = async () => {
  // const result = await StudentModel.find({}).populate('admissionSemester  academicDepartment');
  const result = await StudentModel.find({}).populate([
    {
      path: 'academicDepartment',
      populate: {
        path: "academicFaculty"
      }
    },
    { path: "admissionSemester" },
    { path: "user" },
  ]);
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id }).populate([
    {
      path: 'academicDepartment',
      populate: {
        path: "academicFaculty"
      }
    },
    { path: "admissionSemester" },
    { path: "user" },
  ]);
  /*
  const result = await StudentModel.aggregate([
    {
      $match: { id },
    },
    {
      $lookup:{
        from: "academicdepartments",  // check the name from atlas(not model), all small characters  
        localField:"academicDepartment",
        foreignField:"_id",
        as: "academicDepartment"
      }
    },
    {
      $lookup:{
        from: "academicfaculties",  // check the name from atlas(not model), all small characters 
        localField:"academicDepartment.academicFaculty",
        foreignField:"_id",
        as: "academicDepartment.academicFaculty"
      }
    },
  ]);
  */
  return result;
};
const updateSingleStudentIntoDB = async (id: string,payload:Partial<TStudent>) => {
  const {name, guardian,localGuardian,...remainingStudentData} = payload;
  const modifiedUpdatedData:Record<string,unknown> = {...remainingStudentData};
  if (name && Object.keys(name).length) {
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    {...modifiedUpdatedData},
    {new: true, runValidators:true}
  );
  
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  // never delete doc from DB in real projecr, it can create inconsistency in "ref"
  // [transition_step: 1]: create session 
  const session = await mongoose.startSession();
  
  try {
    // [transition_step: 2]: start transection 
    session.startTransaction();

    // [transition_step: 3.1]: change status a student(transection_1)
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id }, 
      { isDeleted: true },
      {session,new: true, runValidators:true}
      );
      if (!deletedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST,"Student not found");
      }
      // [transition_step: 3.2]: change status a user(transection_2)
    const deletedUser = await UserModel.findOneAndUpdate(
      {id},
      {isDeleted:true},
      {session,new:true,runValidators:true},
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST,"User not found");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error ) {
    // [transition_step: 6]: cancel the transection 
    // [transition_step: 7]: end the session after aborting 
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500,(error as {message:string}).message || "Failed to delete user");
  }
};

export const studentService = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentIntoDB,
};
