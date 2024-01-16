import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { CourseModel } from '../courses/course.model';
import { Faculty } from '../faculty/faculty.model';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { StudentModel } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { EnrolledCourseModel } from './enrolledCourse.model';
import { enrollCourseUtils } from './enrolledCourse.utils';

const createEnrolledCourseIntoDb = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  // step 1: is offered course exist
  const isOfferedCourseExist = await OfferedCourseModel.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered course is not found`);
  }

  const course = await CourseModel.findById(isOfferedCourseExist.course);

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, `Room is full.`);
  }

  const student = await StudentModel.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, `Student  is not found`);
  }

  // step 2: is student already enrolled to this course
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, `Student already enrolled!`);
  }
  // step 3: check total credit exceed maxCredit
  const semesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('maxCredit');

  if (!semesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Semester regisrtration not found!`,
    );
  }
  // step 4: check if max credit is not exced for the semester
  // (total enrolled credits + new enrolled coirse credit) > maxCredit
  const enrolledCourses = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  if (totalCredits + course?.credits > semesterRegistration.maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You have exceeded maximum credits!`,
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newEnrollData = {
      semesterRegistration: isOfferedCourseExist.semesterRegistration,
      academicSemester: isOfferedCourseExist.academicSemester,
      academicFaculty: isOfferedCourseExist.academicFaculty,
      academicDepartment: isOfferedCourseExist.academicDepartment,
      offeredCourse,
      course: isOfferedCourseExist.course,
      student: student._id,
      faculty: isOfferedCourseExist.faculty,
      isEnrolled: true,
    };

    const result = await EnrolledCourseModel.create([newEnrollData], {
      session,
    });

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to enroll in this course!`,
      );
    }

    const maxCapacityUpdateResult = await OfferedCourseModel.findByIdAndUpdate(
      offeredCourse,
      {
        $inc: {
          maxCapacity: -1,
        },
      },
      { new: true, upsert: false, runValidators: true, session },
    );

    if (!maxCapacityUpdateResult) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to enroll in this course!`,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateEnrolledCourseIntoDb = async(facultyId:string,payload:Partial<TEnrolledCourse>) =>{
    const {semesterRegistration,offeredCourse,student,courseMarks} = payload;

    // step 1: is offered course exist
  const isSemesterRegistrationExist = await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Semester registration is not found`);
  }
  const isOfferedCourseExist = await OfferedCourseModel.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Offer Course is not found`);
  }
  const isStudentExist = await StudentModel.findById(student);
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Student is not found`);
  }
  
  const faculty = await Faculty.findOne({id:facultyId},{_id:1});
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty is not found`);
  }
  

  const isCourseBelongToFaculty = await EnrolledCourseModel.findOne({semesterRegistration,offeredCourse,student,faculty:faculty._id});
  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, `You are forbidden`);
  }

  const modifiedData: Record<string,unknown> = {
    ...courseMarks,
  }
  // chekc if all exam are done, update grande & grade point
  if(courseMarks?.finalTerm){
    const {classTest1,classTest2,midTerm,finalTerm} = isCourseBelongToFaculty.courseMarks;
    const totalMarks = Math.ceil(classTest1*0.10) + Math.ceil(classTest2*0.10) + Math.ceil(midTerm*0.30) + Math.ceil(finalTerm*0.50);
    
    const gradeResult = enrollCourseUtils.calculateGrageAndPoints(totalMarks);
    
    modifiedData.grade = gradeResult.grade;
    modifiedData.gradePoints = gradeResult.gradePoints;
    modifiedData.isCompleted = true;
    
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for(const [key,value] of  Object.entries(courseMarks)){
        modifiedData[`courseMarks.${key}`] = value;
    }
  }
  const result = await EnrolledCourseModel.findByIdAndUpdate(isCourseBelongToFaculty._id,{
    ...modifiedData
  },{new:true,upsert:false,runValidators:true})

  
    return result;

}
export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  updateEnrolledCourseIntoDb,
};
