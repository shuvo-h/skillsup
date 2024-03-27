import multer from "multer"
import path from "path";
import fs from "fs";
import {v2 as cloudinary} from 'cloudinary'
import { env } from "../config/config";
import { ICloudinatyResponse, IFile } from "../app/interfaces/file";

cloudinary.config({
    cloud_name: env.cloudinary.CLOUDINARY_CLOUD_NAME,
    api_key: env.cloudinary.CLOUDINARY_API_KEY,
    api_secret: env.cloudinary.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async(file:IFile):Promise<ICloudinatyResponse|undefined>=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(file.path,{public_id: file.originalname},function(error,result){
            // delete the file from upload dir
            fs.unlinkSync(file.path);
            if (error) {
                reject(error)
            }else{
                resolve(result as any)
            }
        })
    })
    
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const uploaderFolderPath = path.join(process.cwd(),"/uploads")
        cb(null, uploaderFolderPath)
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage})

export const fileUploader = {
    upload,
    uploadToCloudinary,
}



