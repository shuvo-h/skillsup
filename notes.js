/*
    4 types of error handling:
    (i) Operational Error: error that we can predict will happen in future. eg, 
        ✔️ invalid user's input, 
        ✔️ failed to run server, 
        ✔️ failed to database connect, 
        ✔️ invalid auth token, 
    (ii) Programmatical error: Error that developers produce when developing
        ✔️ using undefined variables, 
        ✔️ using properties that do not exist, 
        ✔️ passing number instead of string, 
        ✔️ using req.params instead of req.query or req.body, 

    (iii) Unhandled Rejection error: Error thrown from asynchronous code but didn't catch
        ✔️server.close(()=>process.exit(1))
        
    (iv) Uncaught exception error: Error thrown from synchronous code
        ✔️process.exit(1)
    


*/