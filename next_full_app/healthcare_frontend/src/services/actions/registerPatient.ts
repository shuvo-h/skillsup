"use server";

export const registerPatientServerAction = async(payload:FormData)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-patient`,{
        cache:"no-store",  // always clean cache for data insert
        method:"POST",
        // headers:{'Content-Type':"application/json"}, // for formData, we no need application/json. It is multipart Fromdata
        body: payload  // formData type no need JSON.stringify
    })
    
    const result = await response.json();
    console.log(result);
    

    return result;
}