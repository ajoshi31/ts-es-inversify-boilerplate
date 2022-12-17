import { Schema } from 'mongoose';

export interface IModelUser {
  name: string;
  email: string;
}

const userSchema = new Schema<IModelUser>({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

export default userSchema;
