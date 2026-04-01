import type { Request, Response, NextFunction } from "express";

import { User } from "../models";

// Extend Express Request type
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
 * Ownership Authorization Middleware
 * Checks if the authenticated user is accessing their own resource
 * Used for routes like: GET /api/results/:userId
 *
 * Usage: Protect routes where user can only access their own data
 * Example: router.get('/results/:userId', authMiddleware, isOwner, getUserResults);
 */
export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { user } = req;

    // Ensure user is authenticated
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Check if the requested userId matches the authenticated user's ID
    if (user.userId !== userId) {
      // For now: forbid access
      // TODO: Add admin check: if (req.user && (await User.findById(req.user.userId))?.isAdmin) { next(); }
      res.status(403).json({
        success: false,
        message: "You can only access your own results",
      });
      return;
    }

    next();
  } catch (error: any) {
    console.error("IsOwner middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Authorization error",
      error: error.message,
    });
  }
};
