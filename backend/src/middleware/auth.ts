import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// JWT secret should match the one in AuthController
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Extend Express Request type to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 * Attaches user info to request object if valid
 *
 * Usage: Protect routes that require authentication
 * Example: router.get('/profile', authMiddleware, getUserProfile);
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Get token from Authorization header
    // Expected format: "Bearer <token>"
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "No token provided. Please authenticate.",
      });
      return;
    }

    // Extract token from header
    const token = authHeader.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Attach user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    // Move to next middleware/route handler
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
      return;
    }

    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
      return;
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};
