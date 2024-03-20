import {  Admin, Prisma, PrismaClient, User, UserRole, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";




const getAdminFromDb  = async(params:IAdminFilterRequest,options:IPaginationOptions) =>{
    const {searchTerm,...filterData} = params;
    const {page,limit,skip,sortBy,sortOrder} = paginationHelper.calculatePagination(options);
    const andCondition:Prisma.AdminWhereInput[] = [];
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
           OR: adminSearchAbleFields.map(field=>({
            [field]: {
                contains: searchTerm,
                mode:"insensitive",
            }
           }))
       })
   }
   if (Object.keys(filterData).length) {
    andCondition.push({
        AND: Object.keys(filterData).map(key=>({
            [key]: {
                equals: (filterData as any)[key]
            }
        }))
    })
   }
    
    //    don't return any data which is deleted
   andCondition.push({
    isDeleted: false
   })
    const whereCondition:Prisma.AdminWhereInput = {AND: andCondition}
   const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
        [sortBy]: sortOrder
    } 
   });
   const total = await prisma.admin.count({
    where: whereCondition,
   })
    return {
        meta:{
            page,
            limit,
            total,
        },
        data: result,
    };
}

const getByIdFromDb = async(adminId:string):Promise<Admin|null> =>{
    
    const result = await prisma.admin.findUniqueOrThrow({
        where:{
            id: adminId,
            isDeleted: false
        }
    })
    return result
}
const updateByIdIntoDb = async(adminId:string,data:Partial<Admin>):Promise<Admin> =>{
   
    const isExist = await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId,
            isDeleted: false
        }
    })
    
    const result = await prisma.admin.update({
        where:{
            id: adminId
        },
        data:{
            ...data
        }
    })
    return result
}

// delete permanently using transection rollback
const deleteByIdFromDb = async(adminId:string):Promise<{adminDeletedData:Admin,userDeletedData:User,message:string}|null> =>{
    
    const isExist = await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId
        }
    })
    
    const result = await prisma.$transaction(async(transectionClient)=>{
        // use transection since we a updating/deleting data in two/more tables
        const adminDeletedData = await transectionClient.admin.delete({
            where:{
                id:adminId
            }
        })
        const userDeletedData = await transectionClient.user.delete({
            where:{
                email: adminDeletedData.email,
            }
        })
        return {
            adminDeletedData,
            userDeletedData,
            message:"Delete through transection"
        }
    })
    return result
}
const softDeleteFromDb = async(adminId:string):Promise<{adminDeletedData:Admin,userDeletedData:User,message:string}|null>  =>{
    
    const isExist = await prisma.admin.findUniqueOrThrow({
        where:{
            id:adminId,
            isDeleted: false,
        }
    })
    
    const result = await prisma.$transaction(async(transectionClient)=>{
        // use transection since we a updating/deleting data in two/more tables
        const adminDeletedData = await transectionClient.admin.update({
            where:{
                id:adminId
            },
            data:{
                isDeleted: true,
            }
        })
        const userDeletedData = await transectionClient.user.update({
            where:{
                email: adminDeletedData.email,
            },
            data:{
                status: UserStatus.DELETED
            }
        })
        return {
            adminDeletedData,
            userDeletedData,
            message:"Delete through transection"
        }
    })
    return result
}

export const adminServices = {
    getAdminFromDb,
    getByIdFromDb,
    updateByIdIntoDb,
    deleteByIdFromDb,
    softDeleteFromDb,
}