// Result Controller
// Handles quiz result submission and retrieval
import { Request, Response } from 'express';
import { Result, Question } from '../models';

/**
 * POST /api/submit-quiz
 * Submit quiz answers - score is calculated automatically by backend
 * Expected body: {
 *   userId: string,
 *   answers: [{ questionId: string, selected: string[] }]
 * }
 *
 * Backend logic:
 * - Fetch each question from database
 * - Compare user's selected answers with correctAnswers
 * - Calculate score (count of correct questions)
 * - Return calculated score immediately
 */
export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, answers } = req.body;

    // Validation
    if (!userId || !answers) {
      res.status(400).json({
        success: false,
        message: 'Please provide userId and answers array',
      });
      return;
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Answers must be a non-empty array',
      });
      return;
    }

    // Validate answers structure and calculate score
    let score = 0;
    const resultsDetail: any[] = []; // Optional: track which answers were correct

    for (const answer of answers) {
      const { questionId, selected } = answer;

      // Validate required fields for each answer
      if (!questionId || !selected) {
        res.status(400).json({
          success: false,
          message: 'Each answer must have questionId and selected array',
          invalidAnswer: answer,
        });
        return;
      }

      if (!Array.isArray(selected)) {
        res.status(400).json({
          success: false,
          message: 'Selected answers must be an array',
          invalidAnswer: answer,
        });
        return;
      }

      // Fetch question from database
      const question = await Question.findById(questionId).select('correctAnswers');

      if (!question) {
        res.status(404).json({
          success: false,
          message: `Question not found: ${questionId}`,
          invalidQuestionId: questionId,
        });
        return;
      }

      // Compare selected answers with correctAnswers
      // Sort both arrays for comparison (handles order-independent matching)
      const sortedSelected = selected.sort();
      const sortedCorrect = question.correctAnswers.sort();

      // Check if arrays match exactly
      const isCorrect =
        sortedSelected.length === sortedCorrect.length &&
        sortedSelected.every((val, index) => val === sortedCorrect[index]);

      if (isCorrect) {
        score += 1;
      }

      // Optional: track details (for debugging or returning breakdown)
      resultsDetail.push({
        questionId,
        selected,
        correct: question.correctAnswers,
        isCorrect,
      });
    }

    // Create new result record with calculated score
    const result = new Result({
      userId,
      score,
      totalQuestions: answers.length, // Store total questions for stats calculation
      date: new Date(),
    });

    await result.save();

    // Return the result with calculated score AND detailed breakdown
    res.status(201).json({
      success: true,
      message: 'Quiz submitted and scored successfully',
      data: {
        result,
        summary: {
          totalQuestions: answers.length,
          correctAnswers: score,
          incorrectAnswers: answers.length - score,
          percentage: ((score / answers.length) * 100).toFixed(0), // 2 decimal places
        },
        details: resultsDetail, // Question-by-question breakdown
      },
    });
  } catch (error: any) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message,
    });
  }
};

/**
 * GET /api/results
 * Get all results for a specific user (or all if admin)
 * Query params: ?userId=xxx (optional - if not provided, returns all results)
 */
export const getResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    const results = await Result.find(query)
      .sort({ date: -1 }) // Most recent first
      .populate('userId', 'name email'); // Get user details

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    console.error('Get results error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch results',
      error: error.message,
    });
  }
};

/**
 * GET /api/results/:userId
 * Get all results for a specific user
 */
export const getUserResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
      return;
    }

    const results = await Result.find({ userId })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    console.error('Get user results error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user results',
      error: error.message,
    });
  }
};

/**
 * GET /api/results/stats/:userId
 * Get cumulative quiz statistics for a user
 * Returns aggregates: total quizzes, total questions, total correct, best/worst score, average
 */
export const getUserStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
      return;
    }

    // Get all results for the user
    const results = await Result.find({ userId });

    if (results.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No quiz attempts found',
        data: {
          totalQuizzes: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          totalIncorrect: 0,
          overallAccuracy: 0,
          averageQuizScore: 0,
          bestScore: null,
          worstScore: null,
        },
      });
      return;
    }

    // Calculate statistics
    const totalQuizzes = results.length;
    const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
    const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);
    const totalIncorrect = totalQuestions - totalCorrect;
    const overallAccuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : '0.00';
    const averageQuizScore = (totalCorrect / totalQuizzes).toFixed(2);
    const scores = results.map(r => r.score);
    const bestScore = Math.max(...scores);
    const worstScore = Math.min(...scores);

    res.status(200).json({
      success: true,
      data: {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        totalIncorrect,
        overallAccuracy: `${overallAccuracy}%`,
        averageQuizScore: parseFloat(averageQuizScore),
        bestScore,
        worstScore,
        recentScores: scores.slice(0, 5), // Last 5 quiz scores
      },
    });
  } catch (error: any) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message,
    });
  }
};
