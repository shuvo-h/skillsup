import { Request } from "express";
import { fileUploader } from "../../../helpers/uploader";
import { prisma } from "../../../shared/prisma";

const insertIntoDb = async(req:Request) =>{
    
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.icon  = uploadToCloudinary?.secure_url;
    }else{
      req.body.icon = "N/A"
    }
    console.log(req.body);
    
    const result = await prisma.specialties.create({
        data: req.body
    })

    return result;
  }
  
  export const specialitiesService = {
    insertIntoDb,
  }