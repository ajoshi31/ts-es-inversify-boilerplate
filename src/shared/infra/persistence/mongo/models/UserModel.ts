import { Schema } from 'mongoose';

export interface IUserModel {
  _id?: string;
  name: string;
  email: string;
}

const userSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

export default userSchema;
