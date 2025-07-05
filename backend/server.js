import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const port = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for parsing url encoded data i.e form data
app.use(cookieParser());

// Enable CORS (IMPORTANT for frontend to connect)
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://kanban-todo-app-sigma.vercel.app', // main Vercel frontend
      'http://localhost:5173', // local dev
    ];
    // Allow all Vercel preview URLs
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      (origin && origin.endsWith('.vercel.app'))
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
