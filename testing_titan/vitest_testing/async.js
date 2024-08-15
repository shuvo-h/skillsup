import CryptoJS from "crypto-js"
export function encryptMessage(message,key,callback) {
    const encryptMessage = CryptoJS.AES.encrypt(message,key).toString()
    callback(encryptMessage)
}

export function encryptMessagePromise(message,key,) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const encryptMessage = CryptoJS.AES.encrypt(message,key).toString()
            if (encryptMessage) {
                resolve(encryptMessage)
            }else{
                reject(new Error("Failed to encrypt message"))
            }
        },2000)
    })
}