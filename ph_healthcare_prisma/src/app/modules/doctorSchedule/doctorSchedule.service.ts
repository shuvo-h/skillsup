import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TDecodeuser } from "../../middleware/auth";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const insertIntoDB = async (user: TDecodeuser,payload:{scheduleIds:string[]} ) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where:{
            email: user?.email
        }
    })
    const doctorScheduleData = payload.scheduleIds.map(scheduleId=>{
        return {
            doctorId: doctorData.id,
            scheduleId,
        }
    })
    const result = await prisma.doctorSchedules.createMany({
        data: doctorScheduleData
    })
    return result;
  };
  




const getMySchedule = async (
    filters: any,
    options: IPaginationOptions,
    user:TDecodeuser
  ) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { startDate,endDate, ...filterData } = filters;

      
    const andConditions = [];
    
    if (startDate && endDate) {
        andConditions.push({
            AND:[
                {
                    schedule: {
                        startDateTime:{
                            gte: startDate
                        }
                    }
                },
                {
                    schedule:{
                        endDateTime:{
                            lte: endDate
                        }
                    }
                },
            ]
        })
    }
    
  
    if (Object.keys(filterData).length > 0) {
        if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'true') {
            filterData.isBooked = true;
        } else if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'false') {
            filterData.isBooked = false;
        } 
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }),
      });
    }
   
    
  
    const whereConditions: Prisma.DoctorSchedulesWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
    
    
    

    const result = await prisma.doctorSchedules.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
            // createdAt: 'desc',
          },
    });
    const total = await prisma.doctorSchedules.count({
      where: whereConditions,
    });
  
    return {
      meta: {
        total,
        page,
        limit,
      },
      data: result,
    };
  };
  

  const deleteFromDb =async(user:TDecodeuser,scheduleId:string) =>{
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where:{
            email: user.email,
        }
    })

    const isBookedSchedule = await prisma.doctorSchedules.findFirst({
        where:{
            doctorId: doctorData.id,
            scheduleId: scheduleId,
            isBooked: true
        }
    })
    if (isBookedSchedule) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Can't delete a booked schedule")
    }

    const result = await prisma.doctorSchedules.delete({
        where:{
            doctorId_scheduleId:{
                doctorId: doctorData.id,
                scheduleId: scheduleId,
            }
        }
    })
    return result;
  }

export const DoctorScheduleService = {
    insertIntoDB,
    getMySchedule,
    deleteFromDb,
};