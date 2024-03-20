import { AnyZodObject, z } from "zod";


const authLoginValidator = z.object({
    body: z.object({
        email: z.string(),
        password: z.string(),
    })
})
export const authValidators = {
    authLoginValidator,
}