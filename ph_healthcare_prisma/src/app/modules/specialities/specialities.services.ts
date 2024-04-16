import { Request } from "express";
import { fileUploader } from "../../../helpers/uploader";
import { prisma } from "../../../shared/prisma";
import { Specialties } from "@prisma/client";

const getAllFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
}

const insertIntoDb = async(req:Request) =>{
    
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.icon  = uploadToCloudinary?.secure_url;
    }else{
      req.body.icon = "N/A"
    }
    
    const result = await prisma.specialties.create({
        data: req.body
    })

    return result;
  }


  const deleteFromDB = async (id: string): Promise<Specialties> => {
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    return result;
};
  
  export const specialitiesService = {
    insertIntoDb,
    getAllFromDB,
    deleteFromDB,
  }