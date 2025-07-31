import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  toolSlug: { type: String, required: true },
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Prompt = mongoose.model('Prompt', promptSchema);