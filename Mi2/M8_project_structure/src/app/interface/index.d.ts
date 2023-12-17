import { JwtPayload } from 'jsonwebtoken';

// It is required to add the user object with the req in auth middleware
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
