/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};
const getAllAcademicFacultiesFromDB = async (query:Record<string,unknown>={}) => {
  // const result = await AcademicFacultyModel.find();
  const courserQuery = new QueryBuilder(AcademicFacultyModel.find(),query);
  const result = await courserQuery.modelQuery;
  const meta = await courserQuery.countTotal();
  return {data:result,meta};
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    { ...payload },
    { new: true, runValidators: true },
  );
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
