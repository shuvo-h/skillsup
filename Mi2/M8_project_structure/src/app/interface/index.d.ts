import { JwtPayload } from 'jsonwebtoken';

// It is required to add the user object with the req in auth middleware
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}



/*
// to add type in process.env
declare namespace NodeJS{
  export type ProcessEnv = {
    PORT: number,
    DATABASE_URL: string,
    NODE_ENV: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRE_IN: string,
  }
}

*/