import { TContext } from "../..";

export const Profile = {
    user: async(parent:any,args:any,context:TContext)=>{
        const user = await context.prisma.user.findUnique({
            where:{
                id: parent.userId
            }
        })
        return user;
    }
}