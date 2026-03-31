/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

/**
 * AUTH SERVICE
 * Handles registration and login operations.
 */
export const authService = {
  /**
   * Register a new user
   * @param userData { name, email, password }
   */
  register: async (userData: any) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  /**
   * Login an existing user
   * @param credentials { email, password }
   */
  login: async (credentials: any) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
};

/**
 * QUIZ SERVICE
 * Handles modules, questions, and quiz submissions.
 */
export const quizService = {
  /**
   * Fetch all available modules
   */
  getModules: async () => {
    const response = await api.get("/modules");
    return response.data;
  },

  /**
   * Fetch a single module by ID
   */
  getModuleById: async (moduleId: string) => {
    const response = await api.get(`/modules/${moduleId}`);
    return response.data;
  },

  /**
   * Fetch questions for a specific module
   */
  getQuestions: async (moduleId?: string) => {
    const response = await api.get("/questions", { params: { moduleId } });
    return response.data;
  },

  /**
   * Submit quiz answers and get the score
   * @param quizData { moduleId, answers }
   */
  submitQuiz: async (quizData: any) => {
    const response = await api.post("/results/submit-quiz", quizData);
    return response.data;
  },

  /**
   * Fetch quiz results for the logged-in user
   */
  getResults: async () => {
    const response = await api.get("/results");
    return response.data;
  },
};

/**
 * ADMIN SERVICE
 * Handles module and question management (Add, Update, Delete).
 */
export const adminService = {
  /**
   * Add a new module
   */
  addModule: async (moduleData: any) => {
    const response = await api.post("/modules/add", moduleData);
    return response.data;
  },

  /**
   * Delete a module
   */
  deleteModule: async (moduleId: string) => {
    const response = await api.delete("/modules/delete", {
      data: { moduleId },
    });
    return response.data;
  },

  /**
   * Add a new question to a module
   */
  addQuestion: async (questionData: any) => {
    const response = await api.post("/questions/add", questionData);
    return response.data;
  },

  // add bulk questions
  addBulkQuestions: async (questions: any[]) => {
    const response = await api.post("/questions/bulk", { questions });
    return response.data;
  },

  /**
   * Update an existing question
   */
  updateQuestion: async (id: string, questionData: any) => {
    const response = await api.post(`/questions/update/${id}`, questionData);
    return response.data;
  },

  /**
   * Delete a question
   */
  deleteQuestion: async (id: string) => {
    const response = await api.delete(`/questions/delete/${id}`);
    return response.data;
  },
};
