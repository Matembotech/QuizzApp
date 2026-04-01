// User Controller
// Handles user-related operations (primarily for admin use)
import type { Request, Response } from "express";
import { User } from "../models/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string };
    }
  }
}

/**
 * GET /api/users/me
 * Get current authenticated user's profile
 * Uses the user ID from the JWT token (req.user)
 */
export const getMyProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // req.user is set by authMiddleware
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // Find current user's info (excluding password)
    const user = await User.findById(
      req.user.userId,
      "name email isAdmin createdAt updatedAt",
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Get my profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

/**
 * GET /api/users
 * Get all users (Admin only)
 * Retrieves all registered users with their basic information
 * Does not include passwords for security
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Select only safe fields (exclude password)
    const users = await User.find(
      {},
      "name email isAdmin createdAt updatedAt",
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/**
 * GET /api/users/:id
 * Get a specific user by ID (Admin only or self)
 * Useful for viewing user details or checking existence
 */
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find user by ID, excluding password
    const user = await User.findById(
      id,
      "name email isAdmin createdAt updatedAt",
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Get user by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

/**
 * PUT /api/users/:id/promote
 * Promote a user to admin (Admin only)
 * Sets the user's isAdmin flag to true
 */
export const promoteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin: true },
      { new: true, runValidators: true }, // Return updated doc, validate changes
    ).select("name email isAdmin createdAt updatedAt");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User promoted to admin successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Promote user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to promote user",
      error: error.message,
    });
  }
};

/**
 * PUT /api/users/:id/demote
 * Demote an admin to regular user (Admin only)
 * Sets the user's isAdmin flag to false
 */
export const demoteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin: false },
      { new: true, runValidators: true }, // Return updated doc, validate changes
    ).select("name email isAdmin createdAt updatedAt");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin privileges revoked successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Demote user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to demote user",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/users/:id
 * Delete a user (Admin only)
 * Removes a user from the system
 * WARNING: This will also delete user's quiz results (if cascade is set up)
 */
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
