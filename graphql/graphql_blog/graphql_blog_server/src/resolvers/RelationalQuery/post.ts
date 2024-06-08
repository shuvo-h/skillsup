import { TContext } from "../..";

export const Post = {
    author: async(parent:any,args:any,context:TContext)=>{
        console.log({parent});
        const authorInfo = await context.prisma.user.findUnique({
            where:{
                id: parent.authorId
            }
        })
        return authorInfo
    }
}