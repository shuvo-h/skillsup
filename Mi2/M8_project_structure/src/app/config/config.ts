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
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 5001,
  DB_URL: process.env.MONGO_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,  // console.log(require("crypto").randomBytes(32).toString('hex'));
};
