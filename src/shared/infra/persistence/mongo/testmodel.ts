import mongoose, { Schema, model } from 'mongoose';

interface ITest {
  name: string;
  email: string;
}

const testSchema = new Schema<ITest>({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

export default testSchema;
