import express from "express";
import { app } from "./app";
import { Server } from "http";

const port = 5000;

async function main() {
    const server: Server = app.listen(port,()=>{
        console.log("ph-healthcare server listening at port ",port);  
    })
}

main();