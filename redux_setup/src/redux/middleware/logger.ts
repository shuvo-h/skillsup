const LoggerMiddleware = (state) => (next) => (action) =>{
    console.log("Current State =>",state.getState());
    console.log("Current Action =>",action);
    next(action); // call to perform next task by action
    console.log("Next State =>",state.getState());
}

export default LoggerMiddleware;