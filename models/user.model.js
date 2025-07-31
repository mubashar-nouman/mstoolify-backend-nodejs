import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // will be empty for Google OAuth
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  tokensUsed: { type: Number, default: 0 },
  tokensLimit: { type: Number, default: 30000 },
  tokensResetAt: { type: Date },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free',
  },
});

export const User = mongoose.model('User', userSchema);
