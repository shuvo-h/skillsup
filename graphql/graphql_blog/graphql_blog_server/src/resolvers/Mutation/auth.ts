import { TContext } from "../.."
import { jwtHelper } from "../../utils/jwtHelper"
import bcrypt from "bcrypt"

interface TUserPayload {
    name: string,
    email: string,
    password: string,
    bio: string
  }


export const authResolvers = {
    signup:async(parent:any,args:TUserPayload,context:TContext)=>{
        //   console.log(args);
            const {prisma} = context
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
            email: user.email,
            // createdAt: user.createdAt,
          }
          const token = await jwtHelper.generateToken(tokenPayload)
          // console.log(token);

          return {token,user,userError:""}
        },
        signin:async(parent:any,args:{email:string,password:string},context:TContext)=>{
        //   console.log(args);
        const {prisma} = context
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
            email: user.email,
            // createdAt: user.createdAt,
          }
          const token = await jwtHelper.generateToken(tokenPayload)
          // console.log(token);

          return {token,user, userError:""}
        },
}