import dotenv from 'dotenv';
import path from 'path';

// initialize dotenv
const currentWorkingDir = process.cwd();
const envFilePath = path.join(currentWorkingDir, '.env');
dotenv.config({
  path: envFilePath,
});

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// env list
export const env = {
  isProduction,
  node_env: process.env.NODE_ENV,
  frontend_base_url: process.env.FRONTEND_BASE_URL,
  port: process.env.PORT || 5001,
  DB_URL: process.env.MONGO_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET, // console.log(require("crypto").randomBytes(32).toString('hex'));
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET, // console.log(require("crypto").randomBytes(64).toString('hex'));
  jwt_access_token_expire_in: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
  jwt_refresh_token_expire_in: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,

  // smtp info
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_user_email: process.env.SMTP_USER_EMAIL,
  smtp_pass: process.env.SMTP_USER_PASS,

  // cloudinary info
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
};
