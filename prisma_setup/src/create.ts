import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const createuUser = async() =>{
   
    const createdUser = await prisma.user.create({
        data:{
            username:"user2",
            email:"user2@ph.com",
            role: UserRole.admin
        }
    })
    console.log(createdUser); 
}
const createProfile = async() =>{
    const createdProfile = await prisma.profile.create({
        data:{
            bio:"this is bio 1",
            userId: 1,
        }
    })
    console.log(createdProfile); 
}
const createCategory = async() =>{
    const createdCategory = await prisma.category.create({
        data:{
            name:"docker",
        }
    })
    console.log(createdCategory); 
}
const createPost = async() =>{
    const createdPost = await prisma.post.create({
        data:{
            title:"post title 2 many ctg",
            content:"post content 2 many crgg",
            published: true,
            authorId: 2,
            postCategory: {         // create relationship in another way
                /*
                create:{
                    // categoryId: 4, // or connect like below
                    category: {
                        connect:{
                            id: 4
                        } 
                    }
                }
                */
                create:[
                    {categoryId:1},
                    {categoryId:3},
                    {categoryId:4},
                    {categoryId:6},
                ]
            }
        },
        include:{
            postCategory: true,
        }
    })
    console.log(createdPost); 
}

module.exports = {
    createuUser,
    createProfile,
    createCategory,
    createPost,
}