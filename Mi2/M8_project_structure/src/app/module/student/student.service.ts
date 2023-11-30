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
const deleteSingleStudentFromDB = async (id: string) => {
  // never delete doc from DB in real projecr, it can create inconsistency in "ref"
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentService = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
