import { model, Schema } from 'mongoose';
import { DAYS } from './offeredCourse.constant';
import { TOfferedCourse } from './offeredCourse.interface';

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: {
          values: [...DAYS],
          message: `days must be withtin ${DAYS.join(', ')}`,
        },
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    // _id: true, // default: create mongoose _id in doc
    timestamps: true, // adds createdAt and updatedAt fields
    // strict: true, // default: allows only storing data defined in the schema
    // validateBeforeSave: true, // default: run validators before saving
    // collection: 'customCollectionName', // explicitly set the name of the collection
    // toJSON: {
    //   virtuals: true, // include virtual properties in JSON representation
    //   transform: function (doc, ret) {
    // Modify the JSON representation as needed
    // delete ret.__v; // Remove the __v field
    //   },
    // },
  },
);

export const OfferedCourseModel = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
