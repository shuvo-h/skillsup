import jwt from "jsonwebtoken"
import config from "../config"

export type TTokenUser ={
    userId: number,
    email: string,
  }


export const generateToken = async(tokenPayload:TTokenUser) =>{
    const token = jwt.sign(tokenPayload,config.jwt.secret,{expiresIn:"1d"})
    return token
}

export const getUserInfoFromToken = async(token:string) =>{
    if (!token) {
        return null;
    }
    try {
        const user = jwt.verify(token,config.jwt.secret)
        return user
    } catch (error) {
        return null
    }
}

export const jwtHelper ={
    generateToken,
    getUserInfoFromToken,
}