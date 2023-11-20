import mongoose from "mongoose";
import { app } from "./app";
import { env } from "./config/config";




async function server() {
  try {
    await mongoose.connect(env.db_url,{
      dbName:"test"
    }).then(()=>{
      console.log('DB connected!');
      app.listen(env.PORT,()=>{
        console.log('server running at ', env.PORT);
      })
    })
  
  } catch (error) {
    console.log(error);
    
  }
}

server();