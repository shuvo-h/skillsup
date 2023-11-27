import { model, Schema } from 'mongoose';
import {
  academicSemesterCodes,
  academicSemesterNames,
  MonthList,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterNames,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
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
    throw new Error('Semester is already exist!');
  }
  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
