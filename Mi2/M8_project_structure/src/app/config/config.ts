import dotenv from 'dotenv';
import path from 'path';

// initialize dotenv
const currentWorkingDir = process.cwd();
const envFilePath = path.join(currentWorkingDir, '.env');
dotenv.config({
  path: envFilePath,
});

// env list
export const env = {
  port: process.env.PORT || 5001,
  DB_URL: process.env.MONGO_URL,
};
