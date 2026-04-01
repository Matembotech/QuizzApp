import { Router } from "express";
import {
  submitQuiz,
  getResults,
  getUserResults,
  getUserStats,
} from "../controllers/ResultController.js";
import { authMiddleware, isOwner } from "../middleware/index.js";

const router = Router();

/**
 * POST /api/submit-quiz
 * Submit quiz answers and save score
 * Requires authentication
 */
router.post("/submit-quiz", authMiddleware, submitQuiz);

/**
 * GET /api/results
 * Get results - if userId query param provided, filter by that user
 * Requires authentication
 * Note: For now, allows authenticated user to get all results or filter by any userId
 * TODO: Add admin check for getting all results
 */
router.get("/", authMiddleware, getResults);

/**
 * GET /api/results/:userId
 * Get all results for a specific user
 * Requires authentication + ownership check (user can only access their own results)
 */
router.get("/:userId", authMiddleware, isOwner, getUserResults);

/**
 * GET /api/results/stats/:userId
 * Get cumulative statistics for a user
 * Requires authentication + ownership check
 */
router.get("/stats/:userId", authMiddleware, isOwner, getUserStats);

export default router;
