import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mainFind = async() =>{
    // find all 
    const getAllData = await prisma.post.findMany()
    console.log({getAllData});
    
    // find first based on conditon
    const oneItem = await prisma.post.findFirst({
        where:{published: false}
    })
    const oneItemThrow = await prisma.post.findFirstOrThrow({
        where:{published: false}
    })
    const findunique = await prisma.post.findUniqueOrThrow({
        where:{id: 12}
    })
    console.log({oneItem,oneItemThrow, findunique});
    
    
}
module.exports = {
    mainFind,
}