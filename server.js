import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { PORT } from './config/keys.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import promptRoutes from './routes/prompts.routes.js';
import aiToolsRoutes from './routes/aiTools.routes.js';



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
app.use('/api/prompts', promptRoutes);
app.use('/api/writer', aiToolsRoutes);

// Root
app.get('/', (req, res) => res.send('API is running...'));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port http:localhost:${PORT}`));
