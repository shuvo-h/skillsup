import { CourseModel } from './../courses/course.model';
import { AcademicDepartmentModel } from './../academicDepartment/academicDepartment.model';
import { AcademicFacultyModel } from './../academicFaculty/academicFaculty.model';
import { SemesterRegistrationModel } from './../semesterRegistration/semesterRegistration.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { StudentModel } from '../student/student.model';
import { RegistrationStatus } from '../semesterRegistration/semesterRegistration.constatnt';

const createOfferCourseIntoDB = async (payload: TOfferedCourse) => {
  // check if semester registration id is exist
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  const isSemesterRegistrationExist =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Semester registration not found`);
  }
  const isAcademicFacultyExist =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic faculty  not found`);
  }
  const isAcademicDepartmentExist =
    await AcademicDepartmentModel.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic Department  not found`);
  }
  const isCourseExist = await CourseModel.findById(course);
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Course not found`);
  }
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty not found`);
  }

  // check if the department is belongs to that faculty
  const isDepartmentBelongsToFaculty = await AcademicDepartmentModel.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This academic department doesn't belongs to the faculty`,
    );
  }
  // check: same offered course same section in same registred semester exist
  const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModel.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The offered course with same section with same registered semster already exist`,
    );
  }

  // check: schedule conflit of the faculty
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: [...days] },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  const isTimeConflict = hasTimeConflict(assignedSchedules, newSchedule);
  if (isTimeConflict) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available. Please choose other time or day`,
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester: isSemesterRegistrationExist.academicSemester,
  });
  return result;
};

const getAllOfferCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourseModel.find().populate(
      'semesterRegistration    academicSemester academicFaculty academicDepartment course faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return {meta,data:result};
};

const getMyOfferedCoursesFromDB = async (userId:string,query:Record<string,unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page-1)*limit;
  const student = await StudentModel.findOne({id:userId})
 if (!student) {
  throw new AppError(
    httpStatus.NOT_FOUND,
    `Student not found`,
  );
 }

 // find current ongoing semester
 const currentOngoingRegistrationSemester = await SemesterRegistrationModel.findOne({status: RegistrationStatus.ONGOING})
 if (!currentOngoingRegistrationSemester) {
  throw new AppError(
    httpStatus.NOT_FOUND,
    `There is no ongoing semester registration`,
  );
 }

 const myOfferedCoursePipeline = [
  {
    $match:{
      semesterRegistration: currentOngoingRegistrationSemester?._id,
      academicFaculty: student.academicFaculty,
      academicDepartment: student.academicDepartment,
    }
  },
  {
    $lookup:{
      from: "courses",
      localField :"course",
      foreignField :"_id",
      as:"course"
    }
  },
  {
    $unwind:"$course"
  },
  {
    // take all the enrolled courses
    $lookup:{
      from: "enrolledcourses",
      let:{ // creating a variable name for currentOngoingRegistrationSemester._id sothat next time we can access by only 'currentOngoingRegistrationSemester'
        currentOngoingRegistrationSemester : currentOngoingRegistrationSemester._id,
        currentStudent: student._id,
      },
      pipeline:[
        {
          $match:{
            $expr:{
              $and: [
                {
                  $eq:['$semesterRegistration',"$$currentOngoingRegistrationSemester"],
                },
                {
                  $eq:['$student',"$$currentStudent"],
                },
                {
                  $eq:['$isEnrolled',true],
                },
              ]
            }
          }
        }
      ],
      as: "enrolledCourses"
    },
  },
  {
    // take the enrolled courses which are completed only
    $lookup:{
      from: "enrolledcourses",
      let:{ 
        currentStudent: student._id,
       },
      pipeline:[
        {
          $match:{
            $expr:{
              $and: [
                {
                  $eq: ['$student','$$currentStudent'],
                },
                {
                  $eq: ['$isCompleted',true],
                }
              ]
            }
          }
        }
      ],
      as: "completedCourses"
    },
  },
  {
    // make a list of ids of completed courses
    $addFields:{
      completedCourseIds:{
        $map:{
          input: "$completedCourses",
          as: "completed",
          in: "$$completed.course"
        }
      }
    }
  },
  {
    $addFields:{
      // find if preRequisiteCourses courses completed or not
      isPreRequisitesFulFilled:{
        $or:[
          {
            $eq: ["$course.preRequisiteCourses",[]]
          },
          {
            $setIsSubset: ["$course.preRequisiteCourses.course","$completedCourseIds"]
          },
        ]
      },
      // find if already enrolled in the course or not
      isAlreadyEnrolled:{
        $in: ['$course._id',{
          $map:{
            input: "$enrolledCourses",
            as :"enroll",
            in: "$$enroll.course"
          }
        }]

      },
    }
  },
  {
    // take only fullfilled prequisits or didn't enrolled till now
    $match: {
      isAlreadyEnrolled: false,
      isPreRequisitesFulFilled: true,
    }
  },
 
 ]
 const paginationPipeline = [
  {
    $skip: skip,
  },
  
  {
    $limit: limit,
  },

 ]

 const result = await OfferedCourseModel.aggregate([
  ...myOfferedCoursePipeline,
  ...paginationPipeline,
 ])
 const allDocs = (await OfferedCourseModel.aggregate([...myOfferedCoursePipeline]));
 const total = allDocs.length;
 const totalPage = Math.ceil(total/limit)

 // pagination setup
 

  return {
    meta: {
      page,
      limit,
      total,
      totalPage
    },
    data:result
  };
};


const getSingleOfferCourseFromDB = async (id: string) => {
  const result = await OfferedCourseModel.findById(id).populate(
    'semesterRegistration    academicSemester academicFaculty academicDepartment course faculty',
  );
  return result;
};

const deleteOfferCourseFromDB = async (id: string) => {
  const isOfferedCourseExist = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered course  not found`);
  }

  const semesterREgfistrationStatus = await SemesterRegistrationModel.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('status');
  if (semesterREgfistrationStatus?.status !== 'UPCOMMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course update timeline ended`,
    );
  }
  const result = await OfferedCourseModel.findByIdAndDelete(id);
  return result;
};

const updateOfferCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExist = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered course  not found`);
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty does not found`);
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  // check: schedule conflit of the faculty
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  const isTimeConflict = hasTimeConflict(assignedSchedules, newSchedule);
  if (isTimeConflict) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available. Please choose other time or day`,
    );
  }

  const semesterREgfistrationStatus = await SemesterRegistrationModel.findById(
    isOfferedCourseExist.semesterRegistration,
  ).select('status');
  if (semesterREgfistrationStatus?.status !== 'UPCOMMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered Course is not UPCOMMING`,
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    upsert: false,
  });
  return result;
};

export const OfferCourseService = {
  createOfferCourseIntoDB,
  getAllOfferCoursesFromDB,
  getSingleOfferCourseFromDB,
  updateOfferCourseIntoDB,
  deleteOfferCourseFromDB,
  getMyOfferedCoursesFromDB,
};
