import mongoose, { Document, Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
  }
);
const User = mongoose.model('user', UserSchema);
export default User;