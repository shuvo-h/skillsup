export const pick = <T extends Record<string,unknown>,k extends keyof T>(queryObj:T,validKeys:k[]):Partial<T> =>{
    console.log(queryObj,validKeys);
    const finalObj:Partial<T> = {};
    for(const key of validKeys){
        if (queryObj && Object.hasOwnProperty.call(queryObj,key)) {
            console.log(key);
            finalObj[key] = queryObj[key];
        }
    }
    return finalObj;
}