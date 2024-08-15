import { TContext } from "../..";
import { userLoader } from "../../dataLoaders/userLoader";

export const Post = {
    author: async(parent:any,args:any,context:TContext)=>{
        console.log("authod in post = ", parent.authorId);
        /*
        // use data loader to solve looping N+1 problem
        const authorInfo = await context.prisma.user.findUnique({
            where:{
                id: parent.authorId
            }
        })
        return authorInfo
        */
       const authorInfo = userLoader.load(parent.authorId)
       return authorInfo
    }
}