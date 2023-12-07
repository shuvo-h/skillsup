import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model"

const createCourseIntoDB = async(payload:TCourse) =>{
    const result = await CourseModel.create(payload);
    return result;
}
const getAllCoursesFromDB = async(query:Record<string,unknown>) =>{
    const courseQuery = new QueryBuilder(CourseModel.find().populate('preRequisiteCourses.course'),query)
    .search(CourseSearchableFields).filter().sort().paginate().fields();
    const result = await courseQuery.modelQuery;
    return result;
}
const getSingleCourseFromDB = async(id:string) =>{
    const result = await CourseModel.findById(id).populate('preRequisiteCourses.course');
    return result;
}
const updateCourseIntoDB = async(id:string,payload:Partial<TCourse>) =>{
    const {preRequisiteCourses,...courseRemainingData} = payload;
    // use transition for multiple write operations
    // [step 1: transection session declare]
    const session = await mongoose.startSession();
    try {
        
        // [step 2: transection session start]
        session.startTransaction();
        
        // [step 3: transection session insert/use]
        // premititive data update
        const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
            id,
            {...courseRemainingData},
            {session,new:true,runValidators:true}
        );
        if (!updatedBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST,'Failed to update course');
        }
        
        // non-premititive data update
        // check if any prerequisit couse need to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // Delete from Array of object update ['ObjectId','ObjectId']
            const deletedPreRequisits = preRequisiteCourses.filter(el=>el.course && el.isDeleted).map(el=>el.course);
    
            const deletedPreRequisitCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $pull:{
                        preRequisiteCourses:{
                            course: {$in: [...deletedPreRequisits]} // ['ObjectId','ObjectId']
                        }
                    }
                },
                {session, new:true,runValidators:true}
                )

                if (!deletedPreRequisitCourses) {
                    throw new AppError(httpStatus.BAD_REQUEST,'Failed to update courses');
                }
        }
    
        // filter out the new prerequisit courses to be update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // get the list isDeleted = false, [{}]
            const newPreRequisitCourses = preRequisiteCourses.filter(el=>!el.isDeleted && el.course);
            const newUpdatedPreRequisitCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                   $addToSet:{ // $addToSet: never add duplicate value
                        preRequisiteCourses:{$each:[...newPreRequisitCourses]}
                   } 
                },
                {session,new:true,runValidators:true}
            );

            if (!newUpdatedPreRequisitCourses) {
                throw new AppError(httpStatus.BAD_REQUEST,'Failed to update courses');
            }
        }
    
        const result = await CourseModel.findById(id).populate('preRequisiteCourses.course');

        await session.commitTransaction();
        await session.endSession();
        
        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to update courses');
    }
}
const deleteCourseFromDB = async(id:string,) =>{
    const result = await CourseModel.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new:true}
    );
    return result;
}

const assignFacultiesWithCourseIntoDB = async(id:string,payload:Partial<TCourseFaculty>) =>{
    const result = await CourseFacultyModel.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet:{
                faculties: {$each: payload}
            }
        },
        {
            upsert:true,   // if not exist, add new, if exist, update that
            new:true
        }
    );
    return result;
}
const removeFacultiesWithCourseFromDB = async(id:string,payload:Partial<TCourseFaculty>) =>{
    const result = await CourseFacultyModel.findByIdAndUpdate(
        id,
        {
            $pull:{
                faculties: {$in: payload}
            }
        },
        {
            new:true
        }
    );
    return result;
}

export const courseServuces = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesWithCourseFromDB,
}