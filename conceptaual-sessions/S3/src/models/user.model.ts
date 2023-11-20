import { Document, model, Query, Schema, } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";

const userSchema = new Schema<IUser>(
    {
        name:{
            type: String,
            required: [true, 'Please tell us your name']
        },
        age:{
            type: Number,
            required: [true, 'Please tell us your age']
        },
        email:{
            type: String,
            unique: true,
            required: [true, 'Please tell us your email'],
            lowercase: true
        },
        photo:{
            type: String,
            required: [true, 'Please tell us your photo']
        },
        role:{
            type: String,
            required: [true, 'Please tell us your role'],
            enum: ['user', 'admin'],
            validate:{
                validator: (value:string)=>['user','admin'].includes(value),
                message: 'Role must be provided'
            },
            default: 'user'
        },
        userStatus:{
            type: String,
            required: [true, 'Please tell us your role'],
            enum: ['active', 'inactive'],
            validate:{
                validator: (value:string)=>['active','inactive'].includes(value),
                message: 'Role must be provided'
            },
            default: 'active'
        },
    },
    // {}
)

// pre-hook for query middleware (static method)
// eslint-disable-next-line no-unused-vars
userSchema.pre(/^find/, function (this: Query<IUser, Document>, next: (err?: Error | null, docs?: IUser[]) => void) {
    // 'this' -> refer to the methods/query
    this.find({ userStatus: { $ne: "active" } });
    next();
});

// pre-hook for query middleware (instance method)
// eslint-disable-next-line no-unused-vars
userSchema.pre("save",function(next:(err?: Error | null, docs?: IUser[]) => void){
    // 'this' -> refer to the current _doc
    this.userStatus = 'inactive'; // Set userStatus to 'inactive' before saving
    next();
})

export const UserModel = model<IUser>('User',userSchema);