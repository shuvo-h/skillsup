import {  PrismaClient, UserRole } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";


const createAdmin  = async(data:any) =>{
    const saltRound = 12;
    const hashedPassword: string =  await bcrypt.hash(data.password,saltRound)
    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    
    // user transcetion and rollback
    const result = await prisma.$transaction(async(transectionClient)=>{
        const createdUserData = await transectionClient.user.create({
            data: userData,
        })
        const createdAdminData = await transectionClient.admin.create({
            data: data.admin
        })
        return createdAdminData;
    })
    return result;
}

export const userServices = {
    createAdmin,
}