
const EventEmitter = require('events');

const myEmitter = new EventEmitter();
myEmitter.on('birthdayEvent',function(data){
    console.log("1st data from birthdayEvent Listener",data);
})
myEmitter.on('birthdayEvent',function(data){
    console.log("2nd birthdayEvent Listener",data);
})
// console.log(myEmitter);

myEmitter.emit("birthdayEvent",{ab:"Text ab"})




// create own server
const http = require('http');
const fs = require('fs');

const server = http.createServer();

// listening server 
server.on('request',(req,res)=>{
    if (req.url = "/read" && req.method === 'GET') {
        // streaming read file
        const filePullPath = __dirname + "/sampleTxt.txt";
        const readStream = fs.createReadStream(filePullPath);
        readStream.on('data',((bufferChunk)=>{
            res.statusCode = 206;
            res.write(bufferChunk);
        }))
        readStream.on('end',()=>{
            res.statusCode = 200;
            res.end("Hello from custom server");
        })
        readStream.on('error',(err)=>{
            console.log(err);
            res.statusCode = 500;
            res.end(err.message);
        })
    }
})
server.listen(5000,()=>{
    console.log("server run at 5000");
})