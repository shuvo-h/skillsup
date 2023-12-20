import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { env } from '../../config/config';

const userSchema = new Schema<TUser, TUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, // never return on find method or populate method
    },
    needsPassword: {
      type: Boolean,
      required: true,
      default: true,
    },
    passwordChangedAt: {
      // optional
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // _id: false, // don't create mongoose _id in doc
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// pre-save middleware/hook will work on .save() / .create()
userSchema.pre('save', async function (next) {
  // // 'this' -> refer to the current _doc
  // make password hash before save/create
  this.password = await bcrypt.hash(
    this.password,
    Number(env.BCRYPT_SALT_ROUNDS),
  );
  next();
});
// post-save middleware/hook will work on .save() / .create()
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// staqtic methods
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const user = await UserModel.findOne({ id });
  return user;
};
userSchema.statics.isPasswordMatched = async function (
  plain_password: string,
  hash_password: string,
) {
  const isMatched = await bcrypt.compare(plain_password, hash_password);
  return isMatched;
};
userSchema.statics.isJwtIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
export const UserModel = model<TUser, TUserModel>('User', userSchema);
