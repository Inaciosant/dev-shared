import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  setup: { type: Schema.Types.ObjectId, ref: 'Setup', required: true },
  parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  content: { type: String, required: true },
}, { timestamps: true });

export const Comment = model('Comment', commentSchema);