import "dotenv/config";

import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import {
  authRoutes,
  moduleRoutes,
  questionRoutes,
  resultRoutes,
  userRoutes,
  subscribeRoutes,
  contactRoutes,
} from "./routes/index.js";
import {
  authMiddleware,
  errorHandler,
  notFoundHandler,
} from "./middleware/index.js";
import { authLimiter, generalLimiter } from "./middleware/rateLimiters.js";

// ============================================
// EXPRESS APPLICATION SETUP
// ============================================

export const app: Application = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware - sets various HTTP headers for security
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// logging middleware - logs HTTP requests to console
app.use(morgan("dev")); // 'dev' format: concise output colored by response status

// ============================================
// API ROUTES
// ============================================

// Health check endpoint (public)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Authentication routes (public - no auth required)
app.use("/api/auth", authLimiter, authRoutes);

// Module routes (GET public, others require auth + admin)
app.use("/api/modules", generalLimiter, moduleRoutes);

// Question routes (GET public, others require auth + admin)
app.use("/api/questions", generalLimiter, questionRoutes);

// Result routes (POST requires auth, GET may be filtered by userId)
app.use("/api/results", generalLimiter, resultRoutes);

// User management routes (Admin only - requires auth + admin)
app.use("/api/users", generalLimiter, userRoutes);

// Contact routes (POST requires auth, GET may be filtered by userId)
app.use("/api/contact", generalLimiter, contactRoutes);

// Subscription routes (GET public, others require auth + admin)
app.use("/api/subscribe", generalLimiter, subscribeRoutes);

// ============================================
// ERROR & 404 HANDLERS
// ============================================

// Handle undefined routes (must be before error handler)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);
