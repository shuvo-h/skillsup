import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
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
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const result = await StudentModel.find({}).populate('admissionSemester  academicDepartment');
  /*
  const queryObj = {...query};
  let searchTerm = '';
  if (query.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  
  const studentSearchableFields = ['email','name.firstName','name.middleName','name.lastName','presentAddress'];
  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map(field=>{
      return {
        [field]: {$regex: searchTerm, $options: 'i'}
      }
    })
  });

  
  // Filtering
  const excludeFields = ['searchTerm','sort','page','limit','fields'];
  excludeFields.forEach(el=> delete queryObj[el]);

  
  const filterQuery =  searchQuery.find(queryObj)
  .populate([
    {
      path: 'academicDepartment',
      populate: {
        path: "academicFaculty"
      }
    },
    { path: "admissionSemester" },
    { path: "user" },
  ]);
  

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery =  filterQuery.sort(sort);

  let page = 1;
  let skip = 0;
  let limit = 10;
  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page) as number;
    skip = (page - 1)*limit;
  }
  const paginateQuery = sortQuery.skip(skip);

  const limitQuery =  paginateQuery.limit(limit);

  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ")
  }
  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
  */

  // using query builder class
  const studentBaseQuery = StudentModel.find().populate([
    {   path: 'academicDepartment',  },
    { path: 'academicFaculty' },
    { path: 'admissionSemester' },
    { path: 'user' },
  ]);
  const studentQuery = new QueryBuilder(studentBaseQuery, query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return {meta,result};
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id).populate([
    {
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    },
    { path: 'admissionSemester' },
    { path: 'user' },
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
const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findByIdAndUpdate(
    id,
    { ...modifiedUpdatedData },
    { new: true, runValidators: true },
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
    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { session, new: true, runValidators: true },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student not found');
    }
    // [transition_step: 3.2]: change status a user(transection_2)
    const userId = deletedStudent.user;
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { session, new: true, runValidators: true },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    // [transition_step: 6]: cancel the transection
    // [transition_step: 7]: end the session after aborting
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      500,
      (error as { message: string }).message || 'Failed to delete user',
    );
  }
};

export const studentService = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentIntoDB,
};
