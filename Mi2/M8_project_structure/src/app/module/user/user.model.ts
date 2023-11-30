import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import { env } from '../../config/config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPassword: {
      type: Boolean,
      required: true,
      default: true,
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

export const UserModel = model<TUser>('User', userSchema);
