import { model, Schema, } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
    {
        course:{
            type: Schema.Types.ObjectId,
            ref:"Course"
        },
        
        isDeleted:{
            type: Boolean,
            default: false,
        },
        
    },
    {}
)

const courseSchema = new Schema<TCourse>(
    {
        title:{
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        prefix:{
            type: String,
            trim: true,
            required: true
        },
        code:{
            type: Number,
            trim: true,
            required: true
        },
        credits:{
            type: Number,
            trim: true,
            required: true
        },
        preRequisiteCourses:{
            type: [preRequisiteCoursesSchema],
        },
        isDeleted:{
            type: Boolean,
            default: false,
        },
    },
    {}
)


export const CourseModel = model<TCourse>('Course', courseSchema);




// faculty schema

const courseFacultySchema = new Schema<TCourseFaculty>(
    {
        course:{
            type: Schema.Types.ObjectId,
            required: true,
            unique:true,
            ref: "Course"
        },
        faculties:[{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Faculty"
        }],
    },
    {}
)


export const CourseFacultyModel = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);

