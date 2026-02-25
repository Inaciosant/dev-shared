import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from '../types/user';

interface IUserDocument extends Omit<IUser, 'id' | 'favorites'>, Document {
  favorites: Types.ObjectId[];
}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, 
  avatar: { type: String },
  bio: { type: String },
  githubUrl: { type: String },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Setup' }]
}, { timestamps: true });

export const User = model<IUserDocument>('User', userSchema);