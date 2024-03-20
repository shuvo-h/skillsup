
import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { prisma } from "../../../shared/prisma"
import bcrypt from 'bcrypt';



const loginUser = async(payload:{email:string,password:string}) =>{
    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    const isCorrectPassword = await bcrypt.compare(payload.password,userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password incorrect')
    }
    const jsPayload = {
        email: userData.email,
        role: userData.role
    }
    const accessToken = jwtHelpers.generateToken(jsPayload,'secret_accesskey_any','10m')
    const refreshToken = jwtHelpers.generateToken(jsPayload,'secret_refreshkey_any','30d')

    
    return {
        accessToken,
        refreshToken,
        data: userData
    }
}

const refreshToken = async(token:string) =>{
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token,'secret_refreshkey_any');
    } catch (error) {
        throw new Error("You are not authorized");
    }

    
    const userData = await prisma.user.findUniqueOrThrow({
        where:{
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    })
    
    
    const jsPayload = {
        email: userData.email,
        role: userData.role
    }
    const accessToken = jwtHelpers.generateToken(jsPayload,'secret_accesskey_any','10m')
    const {password,...rest} = userData;
    return {
        accessToken,
        // refreshToken,
        // data: userData
        ...jsPayload
    }
}

export const authService = {
    loginUser,
    refreshToken
}