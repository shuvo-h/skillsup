import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

import { jwtHelper } from "../utils/jwtHelper";


// for each  property/column, which value will be returned
const prisma = new PrismaClient()

interface TUserPayload {
  name: string,
  email: string,
  password: string,
  bio: string
}
export const resolvers = {
    // get API
    Query: {
      users: async(parent,args,context)=>{
        const users = await prisma.user.findMany()
        return users
      },
    },
    // post or update API
    Mutation: {
      signup:async(parent,args:TUserPayload,context)=>{
        console.log(args);
        const isExist = await prisma.user.findFirst({where:{email: args.email}})
        if (isExist) {
          return {
            token: null,
            user:null,
            userError: "Email already exist"
          }
        }


        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(args.password,salt)

        const user = await prisma.user.create({data:{name:args.name,email:args.email,password: hashedPassword}})

        if (args.bio) {
          await prisma.profile.create({data:{
            bio: args.bio,
            userId: user.id
          }})
        }

        const tokenPayload = {
          userId: user.id,
          // email: user.email,
          // createdAt: user.createdAt,
        }
        const token = await jwtHelper(tokenPayload)
        console.log(token);

        return {token,user,userError:""}
      },
      signin:async(parent,args:{email:string,password:string},context)=>{
        console.log(args);
        const user = await prisma.user.findFirst({where:{email:args.email}})
        if (!user) {
          return {
            token: null,
            user:null,
            userError: "User not found"
          }
        }

        const isMatched = await bcrypt.compare(args.password,user?.password)

        if (!isMatched) {
          return {
            token: null,
            user:null,
            userError: "Password not matched"
          }
        }

        const tokenPayload = {
          userId: user.id,
          // email: user.email,
          // createdAt: user.createdAt,
        }
        const token = await jwtHelper(tokenPayload)
        console.log(token);

        return {token,user, userError:""}
      },
    },
  };
