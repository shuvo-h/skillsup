"use Server";

import { TBlog } from "@/types";

// this .ts file will be user as server file
export const createBlogByServerAction = async(payload:TBlog) =>{
    const res = await fetch('http://localhost:5000/blogs',{
        cache:"no-store",
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
    })
    const blogResult = await res.json();
    return blogResult;
}