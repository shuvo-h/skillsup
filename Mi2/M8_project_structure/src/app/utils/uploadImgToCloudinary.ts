import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { env } from '../config/config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: env.cloudinary_cloud_name,
  api_key: env.cloudinary_api_key,
  api_secret: env.cloudinary_api_secret,
});
export const uploadImgToCloudinary = async (
  imgName: string,
  imgFileFullPath: string,
):Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imgFileFullPath,
      { public_id: imgName },
      function (error, result) {
        // delete the temporary file uploaded by multer
        fs.unlink(imgFileFullPath, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Multer uploaded temp file is deleted');
          }
        });
        if (error) {
          reject(error);
        }
        if (result === undefined) {
          // Handle the case where result is undefined (if needed)
          reject(new Error('Cloudinary upload result is undefined'));
        } else {
          resolve(result as UploadApiResponse);
        }
      },
    );
  });
};

const multer_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `${process.cwd()}/uploads`;
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const multer_uploader = multer({ storage: multer_storage });
