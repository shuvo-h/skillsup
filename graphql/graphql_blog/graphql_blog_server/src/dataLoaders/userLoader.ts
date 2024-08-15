import { User } from "@prisma/client";
import { prisma } from "../index";
import DataLoader from "dataloader";

const batchUsers = async(userIds:number[]):Promise<User[]> =>{
    // id: [10,9]

    const users = await prisma.user.findMany({
        where:{
            id:{in:userIds}
        }
    })
    /*
        1: {id: 1, name:"daniel"}
        2: {id: 2, name:"armal"}
        1: {id: 3, name:"willium"}
        4: {id: 4, name:"velko"}
    */
   const usersIbj:{[key: string]: User} = {}
    users.forEach(user=>{
        usersIbj[user.id] = user
    })

    // const loaderUsers = users.reduce((acc:{[key:string]: User},curr)=>{
    //     acc[curr.id] = curr;
    //     return acc
    // },{})

    return userIds.map(id=>usersIbj[id]);
}

// @ts-ignore
export const userLoader = new DataLoader<number,User>(batchUsers)