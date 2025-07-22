import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import { PORT } from './config/keys.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Root
app.get('/', (req, res) => res.send('API is running...'));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port http:localhost:${PORT}`));
