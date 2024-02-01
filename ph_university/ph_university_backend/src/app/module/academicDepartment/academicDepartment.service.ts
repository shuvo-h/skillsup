/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  /*
    // moving this part to pre middleware hook to model file
    const isDepartmentExist = await AcademicDepartmentModel.findOne({name: payload.name});
    if (isDepartmentExist) {
        throw new Error('This department already exist');
    }
    */
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return {data:result,meta:{}as any};
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    { ...payload },
    { new: true, runValidators: true },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
