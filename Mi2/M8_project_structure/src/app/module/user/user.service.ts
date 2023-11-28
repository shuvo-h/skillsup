import { StudentModel } from './../student/student.model';
import { env } from '../../config/config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  // if password not given, use default password
  userData.password = password || (env.default_password as string);

  // set user role as student
  userData.role = 'student';

  // auto generate id
  const generateStudentId = async(payload:TAcademicSemester) =>{}
  userData.id = generateStudentId();

  // create a user
  const newUser = await UserModel.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; // embeding id for query
    studentData.user = newUser._id; // reference ID for populate

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};

