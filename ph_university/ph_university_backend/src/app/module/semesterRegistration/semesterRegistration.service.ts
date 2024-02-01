import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constatnt';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import mongoose from 'mongoose';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester;

  // check any registered semester that is already "UPCOMMING" | "ONGOING"
  const isAnyUpcommingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isAnyUpcommingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `There is already a ${isAnyUpcommingOrOngoingSemester.status} semester`,
    );
  }

  // check if the semester registrationis exist
  const isSemesterRegisterationExist = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegisterationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic semester doesn't exist.",
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the semester registrationis exist
  const existSemesterRegistration =
    await SemesterRegistrationModel.findById(id);
  if (!existSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester doesn't exist!");
  }

  // if semestrer registration time is ended
  if (existSemesterRegistration?.status === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `Requested semester is alread ${existSemesterRegistration.status}`,
    );
  }

  if (
    existSemesterRegistration.status === RegistrationStatus.UPCOMMING &&
    payload.status === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `You can't directly change from ${existSemesterRegistration.status} to ${payload.status}`,
    );
  }
  if (
    existSemesterRegistration.status === RegistrationStatus.ONGOING &&
    payload.status === RegistrationStatus.UPCOMMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `You can't directly change from ${existSemesterRegistration.status} to ${payload.status}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true, runValidators: true, upsert: false },
  );

  return result;
};
const deleteSemesterRegistrationByIdIntoDB = async (id: string,) => {
  // check if the semester registrationis exist
  const existSemesterRegistration =
    await SemesterRegistrationModel.findById(id);
  if (!existSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester doesn't exist!");
  }

  // if semestrer registration time is ended
  if (existSemesterRegistration?.status === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `Requested semester is alread ${existSemesterRegistration.status}`,
    );
  }

  if (    existSemesterRegistration.status !== RegistrationStatus.UPCOMMING   ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      `You can't delete ${existSemesterRegistration.status} semester`,
    );
  }
  
  //deleting associated offered courses
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedOfferedCourse = await OfferedCourseModel.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );
    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemisterRegistration =
    await SemesterRegistrationModel.findByIdAndDelete(id, {
      session,
      new: true,
    });
    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }



    await session.commitTransaction();
    await session.endSession();

    return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }



};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationByIdIntoDB,
};
