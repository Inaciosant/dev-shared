import { Schema, model, Document,Types } from 'mongoose';
import { ISetup } from '../types/setup';

interface ISetupDocument extends Omit<ISetup, 'user' | 'likes'>, Document {
    user: Types.ObjectId;
    likes: Types.ObjectId[];
}

const setupSchema = new Schema<ISetupDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  workRole: { type: String, required: true },
  workModality: { 
    type: String, 
    enum: ['Remote', 'Hybrid', 'Office'], 
    default: 'Remote' 
  },
  thumbnail: { type: String, required: true },
  
  gears: [{
    category: { 
      type: String, 
      enum: ['Keyboard', 'Mouse', 'Monitor', 'Headset', 'Chair', 'Desk', 'PC/Laptop', 'Other'],
      required: true 
    },
    name: { type: String, required: true },
    brand: { type: String },
    model: { type: String },
    link: { type: String },
    details: { type: String }
  }],

  softwareStack: [{ type: String }],
  tags: [{ type: String }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { 
  timestamps: true 
});

export const Setup = model<ISetupDocument>('Setup', setupSchema);