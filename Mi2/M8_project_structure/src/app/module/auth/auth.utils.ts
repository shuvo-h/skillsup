import jwt from 'jsonwebtoken';

export const createJwtToken = (tokenPayload:Record<string,unknown>,token_secret:string,expiresIn:string) =>{
    const token = jwt.sign(tokenPayload, token_secret, {
        expiresIn: expiresIn,
      });
      return token;
}