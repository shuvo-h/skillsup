import dotenv from 'dotenv';
import path from 'path';
console.log(path.join(process.cwd(),'.env'));

dotenv.config({path: path.join(process.cwd(),'.env')})
export const env = {
    isProduction: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    RESET_PASSWORD_TOKEN_SECRET: process.env.RESET_PASSWORD_TOKEN_SECRET,
    RESET_PASSWORD_TOKEN_EXPIRES_IN: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
    RESEAT_PASSWORD_BASE_URL: process.env.RESEAT_PASSWORD_BASE_URL,
    emailSender:{
        EMAIL_SENDER_MAIL: process.env.EMAIL_SENDER_MAIL,
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    },
    cloudinary:{
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    },
}