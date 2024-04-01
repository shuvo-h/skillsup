import { AnyZodObject, z } from "zod";


const create = z.object({
    title: z.string({required_error:"Title is required"}),
})
export const specialitiesValidator = {
    create,
}