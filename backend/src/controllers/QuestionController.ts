// Question Controller
// Handles CRUD operations for quiz questions
// Includes validation to ensure correct answers exist in options
import { Request, Response } from "express";
import { Question } from "../models";
import mongoose from "mongoose";

/**
 * GET /api/questions
 * Get all questions or filter by moduleId (optional query param)
 */
export const getAllQuestions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { moduleId } = req.query;

    let query: any = {};
    if (moduleId) {
      query.moduleId = moduleId;
    }

    const questions = await Question.find(query).populate(
      "moduleId",
      "moduleName yearOfStudy semester",
    );

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    console.error("Get questions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

/**
 * GET /api/questions/:moduleId
 * Get all questions for a specific module
 */
export const getQuestionByModuleId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { moduleId } = req.params;

    const questions = await Question.find({ moduleId }).populate(
      "moduleId",
      "moduleName yearOfStudy semester",
    );

    res.status(200).json({
      success: true,
      count: questions.length,
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error: any) {
    console.error("Get questions by module ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

/**
 * POST /api/questions/add
 * Create a new question (Admin only)
 */
export const createQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { questionText, options, correctAnswers, moduleId } = req.body;

    // Detailed validation - check each field individually
    const missingFields: string[] = [];

    if (
      !questionText ||
      typeof questionText !== "string" ||
      questionText.trim() === ""
    ) {
      missingFields.push("questionText");
    }
    if (!options || !Array.isArray(options)) {
      missingFields.push("options (must be an array)");
    }
    if (!correctAnswers || !Array.isArray(correctAnswers)) {
      missingFields.push("correctAnswers (must be an array)");
    }
    if (!moduleId) {
      missingFields.push("moduleId");
    }

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: "Missing or invalid required fields",
        missingFields,
        received: { questionText, options, correctAnswers, moduleId },
      });
      return;
    }

    // Validate moduleId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(moduleId)) {
      res.status(400).json({
        success: false,
        message: "Invalid moduleId format - must be a valid MongoDB ObjectId",
        received: { moduleId },
      });
      return;
    }

    // Validate options array content
    if (options.length < 2) {
      res.status(400).json({
        success: false,
        message: "Options must have at least 2 items",
        received: { optionsCount: options.length },
      });
      return;
    }

    // Validate correctAnswers array content
    if (correctAnswers.length < 1) {
      res.status(400).json({
        success: false,
        message: "correctAnswers must have at least 1 item",
        received: { correctAnswersCount: correctAnswers.length },
      });
      return;
    }

    // Ensure all correct answers exist in options
    const invalidAnswers = correctAnswers.filter(
      (answer: string) => !options.includes(answer),
    );
    if (invalidAnswers.length > 0) {
      res.status(400).json({
        success: false,
        message: "All correct answers must be present in options array",
        invalidAnswers,
      });
      return;
    }

    const question = new Question({
      questionText,
      options,
      correctAnswers,
      moduleId,
    });

    await question.save();

    // Populate module info in response
    await question.populate("moduleId", "moduleName yearOfStudy semester");

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error: any) {
    console.error("Create question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create question",
      error: error.message,
    });
  }
};

/**
 * POST /api/questions/update/:id
 * Update an existing question (Admin only)
 */
export const updateQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { questionText, options, correctAnswers, moduleId } = req.body;

    // Find existing question
    const question = await Question.findById(id);
    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    // Update fields (only if provided)
    if (questionText !== undefined) question.questionText = questionText;
    if (options !== undefined) question.options = options;
    if (correctAnswers !== undefined) question.correctAnswers = correctAnswers;
    if (moduleId !== undefined) {
      // Validate moduleId is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(moduleId)) {
        res.status(400).json({
          success: false,
          message: "Invalid moduleId format - must be a valid MongoDB ObjectId",
          received: { moduleId },
        });
        return;
      }
      question.moduleId = moduleId;
    }

    // Validation: ensure correctAnswers are subset of options if both are provided
    if (options !== undefined || correctAnswers !== undefined) {
      const opts = options || question.options;
      const correct = correctAnswers || question.correctAnswers;

      const invalidAnswers = correct.filter(
        (answer: string) => !opts.includes(answer),
      );
      if (invalidAnswers.length > 0) {
        res.status(400).json({
          success: false,
          message: "All correct answers must be present in options array",
          invalidAnswers,
        });
        return;
      }
    }

    await question.save();

    // Populate module info in response
    await question.populate("moduleId", "moduleName yearOfStudy semester");

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error: any) {
    console.error("Update question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/questions/delete/:id
 * Delete a question (Admin only)
 */
export const deleteQuestion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete question error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};
