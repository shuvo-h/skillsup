import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,  
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        required: true,
    },
});

export const TodoModel = mongoose.model('Todo', todoSchema);


