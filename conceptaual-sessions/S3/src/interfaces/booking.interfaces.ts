import { Schema } from "mongoose"

export interface IBooking {
    Date: Date
    createdAt: Date
    tour: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
}