export const modifyPayload = (values:any) =>{
    const obj = {...values}
    const data = JSON.stringify(obj);
    const formData = new FormData()
    console.log(data);
    
    formData.append("data",data);
    return formData;
}