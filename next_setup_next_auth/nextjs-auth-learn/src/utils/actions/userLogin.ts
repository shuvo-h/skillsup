"use server";



import { FormValues } from "@/app/login/page";
import { UserData } from "@/app/register/page";

export const loginUser = async(data:FormValues) =>{
    const res = await fetch(`${process.env.BACKEND_URL}/login`,{
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