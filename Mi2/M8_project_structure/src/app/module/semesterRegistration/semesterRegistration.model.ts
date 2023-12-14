import { model, Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constatnt';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semsterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'Academic Id is required'],
      unique: true,
    },
    status: {
      type: String,
      required: [true, 'Academic Id is required'],
      enum: {
        values: SemesterRegistrationStatus,
        message:
          "{VALUE} is not a valid status. Only 'UPCOMMING', 'ONGOING' and 'ENDED' are allowed",
      },
      default: 'UPCOMMING',
    },
    startDate: {
      type: Date,
      required: [true, 'StartDate  is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'EndDate  is required'],
    },
    minCredit: {
      type: Number,
      required: [true, 'MinCredit  is required'],
      min: [0, "Credit can't be negative"],
      default: 0,
    },
    maxCredit: {
      type: Number,
      required: [true, 'MaxCredit  is required'],
      min: [0, "Credit can't be negative"],
      default: 15,
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

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistration',
  semsterRegistrationSchema,
);
