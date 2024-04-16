import express from "express";
import { app } from "./app";
import { Server } from "http";
import { env } from "./config/config";


async function main() {
    const server: Server = app.listen(env.PORT,()=>{
        console.log("ph-healthcare server listening at port ",Number(env.PORT));  
    })

    const existHandler = (err:any)=>{
        console.log(err);
        if (server) {
            server.close(()=>{
                console.info("Server closed")
            })
        }
        process.exit(1);
    }

    
    // handle errors and stop server
    process.on('uncaughtException',existHandler)
    process.on('unhandledRejection',existHandler)
}

main();