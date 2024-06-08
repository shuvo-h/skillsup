import { TContext } from "../..";

export const User = {
    posts: async(parent:any,args:any,context:TContext)=>{
        const isMyProfile = parent.id === context.userInfo?.userId;
        if (isMyProfile) {
            const postList = await context.prisma.post.findMany({
                where:{
                    authorId: parent.id
                }
            })
            return postList
        }else{
            const postList = await context.prisma.post.findMany({
                where:{
                    authorId: parent.id,
                    published: true
                }
            })
            return postList
        }

    }
}