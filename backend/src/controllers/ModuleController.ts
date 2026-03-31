// Module Controller
// Handles CRUD operations for academic modules/courses
import { Request, Response } from "express";
import { Module } from "../models";

/**
 * GET /api/modules
 * Get all modules (for user selection)
 */
export const getAllModules = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const modules = await Module.find().sort({ yearOfStudy: 1, semester: 1 });

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules,
    });
  } catch (error: any) {
    console.error("Get modules error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch modules",
      error: error.message,
    });
  }
};

/**
 * GET /api/modules/:id
 * Get a module by ID (Public - no auth required)
 */
export const getModuleById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const module = await Module.findById(id);

    if (!module) {
      res.status(404).json({
        success: false,
        message: "Module not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Module fetched successfully",
      data: module,
    });
  } catch (error: any) {
    console.error("Get module error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch module",
      error: error.message,
    });
  }
};

/**
 * POST /api/modules/add
 * Create a new module (Admin only)
 */
export const createModule = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { yearOfStudy, semester, moduleName } = req.body;

    // Validation
    if (!yearOfStudy || !semester || !moduleName) {
      res.status(400).json({
        success: false,
        message: "Please provide yearOfStudy, semester, and moduleName",
      });
      return;
    }

    // Check if module with same name already exists
    const existingModule = await Module.findOne({ moduleName });
    if (existingModule) {
      res.status(409).json({
        success: false,
        message: "Module with this name already exists",
      });
      return;
    }

    const module = new Module({
      yearOfStudy,
      semester,
      moduleName,
    });

    await module.save();

    res.status(201).json({
      success: true,
      message: "Module created successfully",
      data: module,
    });
  } catch (error: any) {
    console.error("Create module error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create module",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/modules/:id
 * Delete a module (Admin only)
 */
export const deleteModule = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const module = await Module.findByIdAndDelete(id);

    if (!module) {
      res.status(404).json({
        success: false,
        message: "Module not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Module deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete module error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete module",
      error: error.message,
    });
  }
};
