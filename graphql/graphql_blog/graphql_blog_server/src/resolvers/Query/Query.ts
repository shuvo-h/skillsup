import { TContext } from "../.."


export const Query = {
    me: async(parent:any,args:any,context:TContext)=>{
      const user = await context.prisma.user.findUnique({
        where:{
          id: context.userInfo?.userId
        },
      })
      return user
    },
    profile: async(parent:any,args:any,context:TContext)=>{
      const profile = await context.prisma.profile.findUnique({
        where:{
          userId: Number( args.userId)
        },
      })
      // console.log(profile);

      return profile
    },
    users: async(parent:any,args:any,context:TContext)=>{
      const users = await context.prisma.user.findMany()
      return users
    },
    posts: async(parent:any,args:any,context:TContext)=>{
      console.log("posts Q");
      
      const posts = await context.prisma.post.findMany({
        where:{
          published: true
        },
        orderBy:[
          {
            createdAt: 'desc'
          }
        ]
      })
      return posts
    },
  }