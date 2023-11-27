import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
    {
        id:{
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        needsPassword: {
            type: Boolean,
            required: true,
            default: true
        },
        role: {
            type: String,
            enum: ['admin', 'student', 'faculty'],
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress'
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON:{
            virtuals: true,
        }
    }
)

export const UserModel = model<TUser>('User',userSchema);
