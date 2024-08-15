import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { encryptMessage, encryptMessagePromise } from "./async";
import CryptoJS from "crypto-js"

beforeAll(()=>{
    console.log("Before ALL <=>");
})
beforeEach(()=>{
    console.log("beforeEach test <=>");
})
afterAll(()=>{
    console.log("After ALL <=>");
})
afterEach(()=>{
    console.log("afterEach test <=>");
})


describe("encryptMessage()",()=>{
    it("should encrypt a message",async()=>{
        // arrange
        const message = "Hello secrect message"
        const secretKey = "mwdfd54f5f"

        // action
        const encryptedData = await new Promise((resolve,reject)=>{
            encryptMessage(message,secretKey,(messageResult)=>{
                if (messageResult) {
                    resolve(messageResult);
                  } else {
                    reject("Encryption failed");
                  }
            })
        })
        // assert
        expect(encryptedData).toBeDefined();
    })

})
describe("encryptMessagePromise()",()=>{

    it("should also pass promise",async()=>{
        // arrange
        const message = "Hello secrect message"
        const secretKey = "mwdfd54f5f"

        // action
        const encryptedData = await encryptMessagePromise(message,secretKey)
        // assert
        expect(encryptedData).toBeDefined();
    })

    it("should encrypt the message correctly",async()=>{
        // arrange
        const message = "Hello secrect message"
        const secretKey = "mwdfd54f5f"

        // action
        const encryptedData = await encryptMessagePromise(message,secretKey)
        const decryptMessage = CryptoJS.AES.decrypt(encryptedData,secretKey).toString(CryptoJS.enc.Utf8)
        // assert
        expect(encryptedData).toBeDefined();
        expect(decryptMessage).toBe(message);
    })
})