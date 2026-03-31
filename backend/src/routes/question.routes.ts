import { Router } from "express";
import {
  getAllQuestions,
  getQuestionByModuleId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/QuestionController";
import { authMiddleware, adminMiddleware } from "../middleware";
import Question from "../models/Question";

const router = Router();

/**
 * GET /api/questions
 * Get all questions (optionally filter by moduleId)
 * Example: GET /api/questions?moduleId=123
 * Public - no auth required
 */
router.get("/", getAllQuestions);

/**
 * GET /api/questions/:moduleId
 * Get a single question by ID
 * Example: GET /api/questions/123
 * Public - no auth required
 */
router.get("/:moduleId", getQuestionByModuleId);

/**
 * POST /api/questions/add
 * Create a new question (Admin only)
 * Requires authentication + admin privileges
 */
router.post("/add", authMiddleware, adminMiddleware, createQuestion);

//add multiple questions at once
// Add this new route alongside your existing addQuestion route
router.post("/bulk", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "questions must be a non-empty array",
      });
    }

    const inserted = await Question.insertMany(questions);

    return res.status(201).json({
      success: true,
      count: inserted.length,
      message: `${inserted.length} questions added successfully`,
      data: inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to insert questions",
    });
  }
});

/**
 * POST /api/questions/update/:id
 * Update a question by ID (Admin only)
 * Requires authentication + admin privileges
 */
router.post("/update/:id", authMiddleware, adminMiddleware, updateQuestion);

/**
 * DELETE /api/questions/delete/:id
 * Delete a question by ID (Admin only)
 * Requires authentication + admin privileges
 */
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteQuestion);

export default router;
