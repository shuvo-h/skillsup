import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  // StudentInstanceMethods,
  StudentStaticModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentInstanceModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'Atleast 2 characters required'],
    maxlength: [20, 'Maximum 20 characters allowed'],
    validate: {
      validator: function (value: string) {
        const formattedName =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        if (formattedName !== value) {
          return false;
        }
        return true;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mothers Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
});


// const studentSchema = new Schema<TStudent,TStudentInstanceModel,StudentInstanceMethods>({   // for instance custom methods
const studentSchema = new Schema<TStudent,StudentStaticModel>({                                // for static custom methods
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not valid gender. Acceptable values are  "male", "female" or "other"',
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  contactNo: {
    type: String,
    required: [true, 'contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'emmergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    // required: true
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian  is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian  is required'],
  },
  profileImg: {
    type: String,
    required: [true, 'Profile image is required'],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
    default: 'active',
  },
});

// create custom static methods
studentSchema.statics.isUserExistByStaticMethod = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// create custom instance methods
// define custom schema methods. must write the type interface for this custom method and provide that as generic in Schema
studentSchema.methods.isUserExistByInstanceMethod = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

// create model using instance type for custom methods
// export const StudentModel = model<TStudent, TStudentInstanceModel>('Student',studentSchema,);

// create model using static type for custom methods
export const StudentModel = model<TStudent, StudentStaticModel>('Student',studentSchema,);
