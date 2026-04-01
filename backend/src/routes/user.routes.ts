import { Router } from "express";
import {
  getMyProfile,
  getAllUsers,
  getUserById,
  promoteUser,
  demoteUser,
  deleteUser,
} from "../controllers/UserController.js";
import { authMiddleware, adminMiddleware } from "../middleware/index.js";

const router = Router();

// All user management routes require authentication AND admin privileges
// They are prefixed with /api/users

/**
 * GET /api/users/me
 * Get current authenticated user's profile
 * Requires authentication (no admin needed)
 */
router.get("/me", authMiddleware, getMyProfile);

/**
 * GET /api/users
 * Get all users (Admin only)
 * Returns list of all registered users (without passwords)
 */
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

/**
 * GET /api/users/:id
 * Get a specific user by ID (Admin only)
 */
router.get("/:id", authMiddleware, adminMiddleware, getUserById);

/**
 * PUT /api/users/:id/promote
 * Promote a user to admin (Admin only)
 */
router.put("/:id/promote", authMiddleware, adminMiddleware, promoteUser);

/**
 * PUT /api/users/:id/demote
 * Demote an admin to regular user (Admin only)
 */
router.put("/:id/demote", authMiddleware, adminMiddleware, demoteUser);

/**
 * DELETE /api/users/:id
 * Delete a user (Admin only)
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
