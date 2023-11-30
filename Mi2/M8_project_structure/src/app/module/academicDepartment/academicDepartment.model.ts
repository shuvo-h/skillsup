
import { model, Schema } from "mongoose";
import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty"
    },
   
  },
  {
    timestamps: true,
    toJSON: {
    //   virtuals: true,
    },
  },
);

academicDepartmentSchema.pre('save',async function(next){
  const isDepartmentExist = await AcademicDepartmentModel.findOne({name: this.name});
    if (isDepartmentExist) {
        throw new AppError(403,'This department already exist.');
    }
    next();
})


academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
  const query = this.getQuery();  // will return the query part of the operation like { _id: '6567696a5a9c871b461f5703' }
  
  const isDepartmentExist = await AcademicDepartmentModel.findOne({_id: query._id});
    if (!isDepartmentExist) {
        throw new AppError(404,"This department doesn't exist.");
    }
    next();
  
})

export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);
