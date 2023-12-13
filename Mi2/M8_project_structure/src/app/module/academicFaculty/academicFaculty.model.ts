import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";


const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
   
  },
  {
    // _id: false, // don't create mongoose _id in doc
    timestamps: true,
    toJSON: {
    //   virtuals: true,
    },
  },
);


export const AcademicFacultyModel = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);
