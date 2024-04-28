"use server"

import { UserData } from "@/app/register/page";

export const registerUser = async(data:UserData) =>{
    const res = await fetch(`${process.env.BACKEND_URL}/register`,{
        cache:"no-store",  // server side
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return result;

}