/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemesterNameCodeMapper, AcademicSemesterSearchableFields } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid semester code!');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async (query:Record<string,unknown>={}) => {
  // const result = await AcademicSemesterModel.find();
  const courserQuery = new QueryBuilder(AcademicSemesterModel.find(),query).search(AcademicSemesterSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();;
  const result = await courserQuery.modelQuery;
  
  const meta = await courserQuery.countTotal();
  return {data:result,meta };
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
