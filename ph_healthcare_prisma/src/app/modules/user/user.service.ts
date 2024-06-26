import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import { fileUploader } from "../../../helpers/uploader";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constant";
import { IFile } from "../../interfaces/file";
import { IAuthUser } from "../../interfaces/common";


const createAdmin  = async(req:Request) =>{
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
    }

    const saltRound = 12;
    const hashedPassword: string =  await bcrypt.hash(req.body.password,saltRound)
    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    
    // user transcetion and rollback
    const result = await prisma.$transaction(async(transectionClient)=>{
        const createdUserData = await transectionClient.user.create({
            data: userData,
        })
        const createdAdminData = await transectionClient.admin.create({
            data: req.body.admin
        })
        return createdAdminData;
    })
    return result;
}

const createDoctor  = async(req:Request) =>{
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
    }

    const saltRound = 12;
    const hashedPassword: string =  await bcrypt.hash(req.body.password,saltRound)
    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }
    
    // user transcetion and rollback
    const result = await prisma.$transaction(async(transectionClient)=>{
        const createdUserData = await transectionClient.user.create({
            data: userData,
        })
        const createdDoctorData = await transectionClient.doctor.create({
            data: req.body.doctor
        })
        return createdDoctorData;
    })
    return result;
}
const createPatient  = async(req:Request) =>{
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
    }

    const saltRound = 12;
    const hashedPassword: string =  await bcrypt.hash(req.body.password,saltRound)
    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT
    }
    
    // user transcetion and rollback
    const result = await prisma.$transaction(async(transectionClient)=>{
        const createdUserData = await transectionClient.user.create({
            data: userData,
        })
        const createdPatientData = await transectionClient.patient.create({
            data: req.body.patient
        })
        return createdPatientData;
    })
    return result;
}


const getAllFromDb = async (
    params: any,
    options: IPaginationOptions
  ) => {
    const { searchTerm, ...filterData } = params;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper.calculatePagination(options);
    const andCondition: Prisma.UserWhereInput[] = [];
    /*
      if (params.searchTerm) {
          andCondition.push({
              OR: [
                  {
                      name: {
                       contains: params.searchTerm,
                       mode:"insensitive"
                      } 
                  },
                  {
                      email: {
                       contains: params.searchTerm,
                       mode:"insensitive"
                      } 
                  },
              ]
          })
      }
      */
  
    if (searchTerm) {
      andCondition.push({
        OR: userSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      });
    }
    if (Object.keys(filterData).length) {
      andCondition.push({
        AND: Object.keys(filterData).map((key) => ({
          [key]: {
            equals: (filterData as any)[key],
          },
        })),
      });
    }
  
    
    const whereCondition: Prisma.UserWhereInput = andCondition.length? { AND: andCondition }:{};
    const result = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      
      select:{
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        admin: true,
        doctor: true,
        patient: true
      }
      
      // include:{
      //   admin: true,
      //   doctor: true,
      //   patient: true
      // }

    });
    const total = await prisma.user.count({
      where: whereCondition,
    });
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  
const changeProfileStatus = async(id:string,data:{status:UserStatus}) =>{
 
  const userData = await prisma.user.update({
    where: {
      id,
    },
    data:{
      status: data.status
    }
  })
  return userData;
}
const getMyProfile = async(user:IAuthUser) =>{
  const userInfo = await prisma.user.findUniqueOrThrow({
    where:{
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      needPasswordChange: true,
      role: true,
      status: true,

    }
  })
  let profileInfo;
  if (userInfo?.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      }
    })
  }else if (userInfo?.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      }
    })
  }else if (userInfo?.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      }
    })
  }else if (userInfo?.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      }
    })
  }
  
  return {...userInfo,...profileInfo};
}

const updateMyProfile = async(user:IAuthUser,req:Request) =>{
  const userInfo = await prisma.user.findUniqueOrThrow({
    where:{
      email: user?.email,
      status: UserStatus.ACTIVE,
    }
  })
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }


  let profileInfo;
  if (userInfo?.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body
    })
  }else if (userInfo?.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body
    })
  }else if (userInfo?.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body
    })
  }else if (userInfo?.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: req.body
    })
  }

  return {
    userInfo,
    profileInfo
  };
}

export const userServices = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllFromDb,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile,
}