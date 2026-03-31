import { Router } from "express";
import {
  getAllModules,
  getModuleById,
  createModule,
  deleteModule,
} from "../controllers/ModuleController";
import { authMiddleware, adminMiddleware } from "../middleware";

const router = Router();

/**
 * GET /api/modules
 * Get all modules (Public - no auth required)
 */
router.get("/", getAllModules);

/**
 * GET /api/modules/:id
 * Get a module by ID (Public - no auth required)
 */
router.get("/:id", getModuleById);

/**
 * POST /api/modules/add
 * Create a new module (Admin only)
 * Requires authentication + admin privileges
 */
router.post("/add", authMiddleware, adminMiddleware, createModule);

/**
 * DELETE /api/modules/delete/:id
 * Delete a module by ID (Admin only)
 * Requires authentication + admin privileges
 */
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteModule);

export default router;
