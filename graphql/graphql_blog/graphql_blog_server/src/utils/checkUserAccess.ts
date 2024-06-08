export const checkUserAccess = async(prisma:any,userId:number,postId:number) =>{
    const user = await prisma.user.findFirst({where:{id:userId}})
        if (!user) {
          return {
            userError: "Unaauthorized user",
            post: null,
          };
        }

        const existPost = await prisma.post.findFirst({where:{id:Number(postId)}})
        // console.log(existPost);

        if (!existPost) {
          return {
            userError: "Post did not found",
            post: null,
          };
        }
        // console.log({user,existPost});

        if (existPost.authorId !== user.id) {
          return {
            userError: "Post does not belongs to you",
            post: null,
          };
        }
}