import { checkUserAccess } from './../../utils/checkUserAccess';
import { TContext } from "../..";

export const postResolvers = {
  addPost: async (
    parent: any,
    args: { post: { title: string; content: string } },
    context: TContext
  ) => {
    //   console.log(args);
    const { title, content } = args?.post;
    const { prisma, userInfo } = context;
    // console.log({userInfo});
    if (!userInfo) {
      return {
        userError: "Unaauthorized token",
        post: null,
      };
    }
    if (!title || !content) {
      return {
        userError: "Title and content are required",
        post: null,
      };
    }

    const result = await prisma.post.create({
      data: {
        authorId: userInfo.userId,
        title,
        content,
      },
    });
    // console.log({ result });

    return { post: result, userError: "" };
  },
  updatePost: async (
    parent: any,
    args: { postId:number,post: { title: string; content: string } },
    context: TContext
  ) => {
    //   console.log(args,444);
    const { title, content } = args?.post;
    const { prisma, userInfo } = context;

    if (!userInfo) {
      return {
        userError: "Unaauthorized token",
        post: null,
      };
    }
    try {

        const errorInfo = await checkUserAccess(prisma,userInfo.userId,args.postId)
        if (errorInfo) {
          return errorInfo;
        }


        const updateResult = await prisma.post.update({
          where:{
            id: Number(args.postId),

          },
          data: args.post
        })
        return { post:updateResult, userError: "" };
    } catch (error:any) {
        console.log(error);

        return { post:null, userError: error.message };
    }


  },
  deletePost: async (
    parent: any,
    args: { postId:number,},
    context: TContext
  ) => {
    const { prisma, userInfo } = context;

    if (!userInfo) {
      return {
        userError: "Unaauthorized token",
        post: null,
      };
    }
    try {

        const errorInfo = await checkUserAccess(prisma,userInfo.userId,args.postId)
        if (errorInfo) {
          return errorInfo;
        }


        const deleteResult = await prisma.post.delete({
          where:{
            id: Number(args.postId),

          },
        })
        return { post:deleteResult, userError: "" };
    } catch (error:any) {
        console.log(error);

        return { post:null, userError: error.message };
    }


  },
  publishPost: async (
    parent: any,
    args: { postId:number,},
    context: TContext
  ) => {
    const { prisma, userInfo } = context;

    if (!userInfo) {
      return {
        userError: "Unaauthorized token",
        post: null,
      };
    }
    try {

        const errorInfo = await checkUserAccess(prisma,userInfo.userId,args.postId)
        if (errorInfo) {
          return errorInfo;
        }


        const updateResult = await prisma.post.update({
          where:{
            id: Number(args.postId),
          },
          data:{
            published: true
          }
        })
        return { post:updateResult, userError: "" };
    } catch (error:any) {
        console.log(error);

        return { post:null, userError: error.message };
    }


  },
};
