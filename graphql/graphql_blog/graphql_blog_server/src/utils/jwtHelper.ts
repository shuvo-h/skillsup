import jwt from "jsonwebtoken"
import config from "../config"

export const jwtHelper = async(tokenPayload:{userId:number}) =>{
    const token = jwt.sign(tokenPayload,config.jwt.secret,{expiresIn:"1d"})
    return token
}