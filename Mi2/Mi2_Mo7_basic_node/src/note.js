/**
    // fs module
    Blocking: synchronous
    fs.readFileSync("../fileName.txt",(err,data){})

    non-Blocking: asynchronous
    fs.readFile("../fileName.txt","utf-8",(err,data){})
    fs.writeFile("../fileName.txt","text data","utf8",(err,data){})

    fs.createReadStream()
    fs.createWriteStream()

    ********Event Driven Architecture
    const EventEmitter = require('events');

    const myEmitter = new EventEmitter();

    // event listener
    myEmitter.on('birthdayEvent',function(data){
        console.log("1st data from birthdayEvent Listener",data);
    })
    myEmitter.on('birthdayEvent',function(data){
        console.log("2nd birthdayEvent Listener",data);
    })
    
    // event emitter
    myEmitter.emit("birthdayEvent",{ab:"Text ab"})


    ********** Stream and Buffer
    4 types of stream => 
    Readable Stream:    a stream where we can read data(ex. http req, fs.readStream)
    Writable Stream:    a stream where we can write data(ex. http res, fs.writeStream)
    Duplex Stream:      a stream for both read and write
    Transform Stream:   a stream where we can reshape data

*/