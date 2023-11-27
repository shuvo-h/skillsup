import { env } from "../../config/config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password:string,studentData: TStudent) => {
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
    const user:NewUser = {};
    
    // if password not given, use default password
    user.password = password || env.default_password as string;
    

    // set user role as student 
    user.role = 'student';

    // manually generate id
    user.id = '2030100001';

    // create a user 
    const result = await UserModel.create(user);

    // create a student 
    const result1 = await UserModel.create(user);
    if (Object.keys(result).length) {
      // set id, _id as user
      studentData.id = result.id;
      studentData.user = result._id;

    }

  
    return result;
};

export const UserService  = {
    createStudentIntoDB,
}
