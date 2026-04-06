/* eslint-disable react-hooks/purity */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaClock, FaQuestionCircle } from "react-icons/fa";

const Quiz = () => {
  const { moduleId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    isAuthenticated,
    questions,
    fetchQuestions,
    submitQuiz,
    currentModule,
    setShowAuthModal,
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [quizStartTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // Show auth modal instead of redirect
      setShowAuthModal(true);
      return;
    }
    if (moduleId) {
      const loadQuestions = async () => {
        setLoading(true);
        await fetchQuestions(moduleId);
        setLoading(false);
      };
      loadQuestions();
    }
  }, [moduleId, isAuthenticated, setShowAuthModal, fetchQuestions]);

  const handleAnswerSelect = (option: string) => {
    const questionId = questions[currentQuestionIndex]._id;
    const capturedIndex = currentQuestionIndex;
    const capturedLength = questions.length;

    setSelectedAnswers((prev: any) => {
      const updated = { ...prev, [questionId]: option };
      console.log("updated", updated);

      setTimeout(() => {
        if (capturedIndex < capturedLength - 1) {
          setCurrentQuestionIndex(capturedIndex + 1);
        } else {
          if (submitted) return; // prevent double submission
          setSubmitted(true);
          // ✅ Pass fresh updated answers directly — avoids stale closure
          const formattedAnswers = Object.entries(updated).map(
            ([qId, ans]) => ({
              questionId: qId,
              selectedOption: ans,
            }),
          );

          //Save total questions
          localStorage.setItem("quizTotal", JSON.stringify(questions.length));

          // ✅ Ensure answers
          submitQuiz(formattedAnswers).then(() => navigate("/quiz-result"));
        }
      }, 700);

      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-bold">
          No questions found for this module.
        </h2>
        <button
          onClick={() => navigate("/modules")}
          className="px-6 py-2 bg-primary text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // ✅ Guard against undefined on last question auto-advance
  if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#faf4ff] flex flex-col font-body">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10 hidden lg:block">
          <FaQuestionCircle size={100} className="text-primary rotate-12" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 hidden lg:block">
          <FaClock size={80} className="text-accent-blue -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="flex justify-center mb-12">
            <div className="bg-primary px-10 py-4 rounded-2xl shadow-xl shadow-primary/30 flex flex-col items-center">
              <span className="text-white font-display font-bold text-xl tracking-tighter flex items-center gap-3">
                <span className="text-2xl">?</span> QUIZ TIME
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-primary/5 border border-white relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-surface-container-low overflow-hidden rounded-t-[3rem]">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-10">
              <div className="flex justify-between items-center text-on-surface-variant font-bold text-sm tracking-widest uppercase">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>{currentModule?.moduleName}</span>
              </div>

              <h2 className="text-xl md:text-4xl font-display font-bold text-on-surface leading-tight text-center">
                {currentQuestion.questionText}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {currentQuestion.options.map((option: string, idx: number) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected =
                    selectedAnswers[currentQuestion._id] === option;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option)}
                      className={`group flex items-center gap-6 p-1.5 rounded-full transition-all duration-300 text-left border-2 ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                          : "bg-primary border-primary text-white hover:bg-primary-container hover:border-primary-container"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-2xl transition-colors ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-black text-white group-hover:bg-on-surface group-hover:text-white"
                        }`}
                      >
                        {letter}
                      </div>
                      <span className="flex-grow font-bold text-lg md:text-xl px-2">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center items-center gap-8 text-on-surface-variant font-bold text-sm tracking-widest uppercase opacity-60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Session
            </div>
            <div className="w-px h-4 bg-outline-variant" />
            <div className="flex items-center gap-2">
              <FaClock />
              Time elapsed: {Math.floor((Date.now() - quizStartTime) / 60000)}m
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
