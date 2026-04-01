import type { Request, Response, NextFunction } from "express";
import { User } from "../models/index.js";

// Extend Express Request type to include user info (already in auth.ts)
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
 * Admin Authorization Middleware
 * Checks if the authenticated user has admin privileges
 * Queries the database to verify the user's isAdmin flag
 *
 * Usage: Protect admin-only routes
 * Example: router.post('/modules/add', authMiddleware, adminMiddleware, createModule);
 */
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Ensure user is authenticated (authMiddleware should have run first)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Fetch the user from database to check isAdmin status
    const user = await User.findById(req.user.userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Check if user has admin privileges
    if (!user.isAdmin) {
      res.status(403).json({
        success: false,
        message: "Admin access required",
      });
      return;
    }

    // User is admin, proceed to next middleware/route handler
    next();
  } catch (error: any) {
    console.error("Admin middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Authorization error",
      error: error.message,
    });
  }
};
