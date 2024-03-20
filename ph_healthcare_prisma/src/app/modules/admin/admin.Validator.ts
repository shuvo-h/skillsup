import { AnyZodObject, z } from "zod";


const updateAdminValidator = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional(),
    })
})
export const adminValidators = {
    updateAdminValidator,
}