import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  MonthList,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterNames,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: MonthList,
    },
    endMonth: {
      type: String,
      required: true,
      enum: MonthList,
    },
  },
  {
    // _id: false, // don't create mongoose _id in doc
    timestamps: true,
    toJSON: {
      // virtuals: true
    },
  },
);

// never create duplicate semester for the same time frame
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new AppError(403,'Semester is already exist!');
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
