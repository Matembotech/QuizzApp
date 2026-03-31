/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  authService,
  quizService,
  adminService,
} from "../services/quizService";

/**
 * APP CONTEXT INTERFACES
 * Define the structure of our Global/Auth state for clarity and type-safety.
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AppContextType {
  // Auth State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Auth Actions
  register: (userData: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => void;

  // Auth Guard State
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;

  // Quiz State
  modules: any[];
  currentModule: any | null;
  questions: any[];
  results: any[];
  score: number | null;
  summary: any | null;
  quizTotal: number | null;

  // Quiz Actions
  fetchModules: () => Promise<void>;
  fetchModuleById: (moduleId: string) => Promise<void>;
  fetchQuestions: (moduleId: string) => Promise<void>;
  submitQuiz: (answers: any) => Promise<void>;
  fetchResults: () => Promise<void>;
  selectModule: (module: any) => void;
  addBulkQuestions: (questions: any[]) => Promise<void>;

  // Admin Actions
  addModule: (moduleData: any) => Promise<void>;
  deleteModule: (moduleId: string) => Promise<void>;
  addQuestion: (questionData: any) => Promise<void>;
  updateQuestion: (id: string, questionData: any) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
}

// Create the Context with an empty initial state
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * APP PROVIDER COMPONENT
 * Wraps the entire application to provide global state and actions.
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // --- AUTH STATE ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Auth Guard Modal State
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // --- QUIZ STATE ---
  const [modules, setModules] = useState<any[]>([]);
  const [currentModule, setCurrentModule] = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any | null>(null);
  const [quizTotal, setQuizTotal] = useState<number>(0);
  const [results, setResults] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);

  /**
   * INITIALIZATION
   * Check for an existing session on app load.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    //restore quiz result
    const storedScore = localStorage.getItem("quizScore");
    const storedSummary = localStorage.getItem("quizSummary");
    const storedTotal = localStorage.getItem("quizTotal");
    if (storedScore) setScore(JSON.parse(storedScore));
    if (storedSummary) setSummary(JSON.parse(storedSummary));
    if (storedTotal) setQuizTotal(JSON.parse(storedTotal));

    setLoading(false);
  }, []);

  // --- AUTH ACTIONS ---

  /**
   * REGISTER: Create a new account and log the user in.
   */
  const register = async (userData: any) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);

      const { user, token } = response.data;

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * LOGIN: Authenticate existing user and store session.
   */
  const login = async (credentials: any) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);

      const { user, token } = response.data;

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * LOGOUT: Clear local session and reset state.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // --- QUIZ ACTIONS ---

  /**
   * FETCH MODULES: Retrieve all quiz categories.
   * FIXED: Backend returns { success, count, data: modules }
   * Previously was setting response.data directly (the wrapper object)
   * Now correctly extracts response.data.data to get the modules array
   */
  const fetchModules = async () => {
    try {
      const response = await quizService.getModules();
      // Ensure we always set an array, even if response structure is unexpected
      const modulesArray = response.data || [];
      setModules(modulesArray);
    } catch (err: any) {
      setError("Could not fetch modules");
      setModules([]); // Set empty array on error
    }
  };

  /**
   * Fetch a single module by ID
   * CORRECT: Backend returns { success, message, data: module }
   * Properly extracts data.data (was already correct)
   */
  const fetchModuleById = async (moduleId: string) => {
    try {
      const response = await quizService.getModuleById(moduleId);
      setCurrentModule(response.data); // Extract the module object from response wrapper
    } catch (err: any) {
      setError("Could not fetch module");
    }
  };

  /**
   * FETCH QUESTIONS: Load questions for the active module.
   * FIXED: Backend returns { success, count, data: questions }
   * Previously was setting response.data directly (the wrapper object)
   * Now correctly extracts response.data.data to get the questions array
   */
  const fetchQuestions = async (moduleId: string) => {
    try {
      // ✅ clear previous result
      localStorage.removeItem("quizScore");
      localStorage.removeItem("quizSummary");
      setScore(null);
      setSummary(null);

      const response = await quizService.getQuestions(moduleId);
      const questionsArray = response.data || [];
      setQuestions(questionsArray);
    } catch (err: any) {
      setError("Could not fetch questions");
      setQuestions([]); // Set empty array on error
    }
  };

  /**
   * SUBMIT QUIZ: Process answers and store result.
   * FIXED: Backend returns { success, message, data: { result, summary, details } }
   * Previously was accessing response.data.score (incorrect)
   * Now correctly navigates to response.data.data.summary.score
   */
  const submitQuiz = async (answers: any) => {
    try {
      const response = await quizService.submitQuiz({
        userId: user?.id,
        answers: answers.map((a: any) => ({
          questionId: a.questionId,
          selected: [a.selectedOption],
        })),
      });
      // // Safely extract score with fallback
      // const score = response.data?.summary?.score ?? 0;
      const score = response.data.result.score;
      const summary = response.data.summary;

      setScore(score);
      setSummary(summary);

      //quiztotal already saved in quiz.tsx
      const storedTotal = localStorage.getItem("quizTotal");
      if (storedTotal) setQuizTotal(JSON.parse(storedTotal));

      //store in localstorage
      localStorage.setItem("quizScore", JSON.stringify(score));
      localStorage.setItem("quizSummary", JSON.stringify(summary));
    } catch (err: any) {
      setError("Quiz submission failed");
    }
  };

  /**
   * FETCH RESULTS: Get user performance history.
   * FIXED: Backend returns { success, count, data: results }
   * Previously was setting response.data directly (the wrapper object)
   * Now correctly extracts response.data.data to get the results array
   */
  const fetchResults = async () => {
    try {
      const response = await quizService.getResults();
      const resultsArray = response.data || [];
      setResults(resultsArray);
    } catch (err: any) {
      setError("Could not fetch results");
      setResults([]); // Set empty array on error
    }
  };

  // --- ADMIN ACTIONS ---

  const addBulkQuestions = async (questions: any[]) => {
    await adminService.addBulkQuestions(questions);
  };

  const addModule = async (data: any) => {
    await adminService.addModule(data);
    fetchModules();
  };
  const deleteModule = async (id: string) => {
    await adminService.deleteModule(id);
    fetchModules();
  };
  const addQuestion = async (data: any) => {
    await adminService.addQuestion(data);
  };
  const updateQuestion = async (id: string, data: any) => {
    await adminService.updateQuestion(id, data);
  };
  const deleteQuestion = async (id: string) => {
    await adminService.deleteQuestion(id);
  };

  /**
   * THE CONTEXT VALUE
   * Expose all necessary state and methods to the rest of the application.
   */
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    showAuthModal,
    setShowAuthModal,
    modules,
    addBulkQuestions,
    currentModule,
    questions,
    results,
    summary,
    quizTotal,
    score,
    fetchModules,
    fetchModuleById,
    fetchQuestions,
    submitQuiz,
    fetchResults,
    selectModule: setCurrentModule,
    addModule,
    deleteModule,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * CUSTOM HOOK: useApp
 * Access global state elegantly from any functional component.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
