import {  Prisma, PrismaClient, UserRole } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../shared/prisma";




const getAdminFromDb  = async(params:Record<string,string>,options:Record<string,string>) =>{
    console.log(params);
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
                equals: filterData[key]
            }
        }))
    })
   }
    
    const whereCondition:Prisma.AdminWhereInput = {AND: andCondition}
   const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
        [sortBy]: sortOrder
    } 
   });
    return result;
}

export const adminServices = {
    getAdminFromDb,
}