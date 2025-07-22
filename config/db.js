import mongoose from 'mongoose';
import { MONGO_URI } from '../config/keys.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log(MONGO_URI)
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};
