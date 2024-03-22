import express from "express";
import { app } from "./app";
import { Server } from "http";
import { env } from "./config/config";

async function main() {
    const server: Server = app.listen(env.PORT,()=>{
        console.log("ph-healthcare server listening at port ",Number(env.PORT));  
    })
}

main();