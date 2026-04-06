import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaTrophy, FaRedo, FaHome, FaCheckCircle } from "react-icons/fa";
// import ScoreHistory from "../components/ScoreHistory";
import { useEffect } from "react";

const QuizResult = () => {
  const { score, user, summary, quizTotal, fetchResults, isAuthenticated, setShowAuthModal } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    fetchResults();
  }, []);

  // const quizTotal = questions?.length || 0;
  const percentage = summary?.percentage || "0";
  const correct = summary?.correctAnswers ?? score ?? 0;
  const incorrect = summary?.incorrectAnswers ?? 0;

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />

      <main className="flex flex-col flex-grow pt-32 pb-20 px-6 lg:px-20 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-primary/10 border border-outline-variant/5 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent-blue" />

          <div className="space-y-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-5xl mx-auto animate-bounce">
              <FaTrophy />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">
              Quiz Completed!
            </h1>
            <p className="text-on-surface-variant text-lg">
              Great job, {user?.name}! Here's how you performed.
            </p>
          </div>

          {/* Score Grid — now 3 cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 bg-surface-container-low rounded-3xl space-y-2 border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Score
              </span>
              <div className="text-4xl font-black text-primary">{correct}</div>
              <span className="text-xs text-on-surface-variant">correct</span>
            </div>
            <div className="p-6 bg-surface-container-low rounded-3xl space-y-2 border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Total
              </span>
              <div className="text-4xl font-black text-on-surface">
                {quizTotal}
              </div>
              <span className="text-xs text-on-surface-variant">questions</span>
            </div>
            <div className="p-6 bg-surface-container-low rounded-3xl space-y-2 border border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                Score
              </span>
              <div className="text-4xl font-black text-accent-blue">
                {percentage}%
              </div>
              <span className="text-xs text-on-surface-variant">
                percentage
              </span>
            </div>
          </div>

          {/* Wrong answers indicator */}
          <div
            className={`p-6 rounded-2xl border flex items-center gap-4 ${incorrect === 0 ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"}`}
          >
            <FaCheckCircle className="text-2xl flex-shrink-0" />
            <p className="text-sm font-medium leading-relaxed text-left">
              {incorrect === 0
                ? "Perfect score! All answers correct."
                : `You got ${incorrect} question${incorrect > 1 ? "s" : ""} wrong. Keep practicing!`}
              <span className="block text-xs mt-1 opacity-60">
                Recorded for: {user?.name} ({user?.email})
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate("/modules")}
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <FaRedo /> Try Another Quiz
            </button>
            <Link
              to="/"
              className="px-8 py-4 bg-surface-container-high text-on-surface rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
            >
              <FaHome /> Back to Home
            </Link>
          </div>
        </div>

        {/* User score history
        <div className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-primary/10 border border-outline-variant/5 text-center space-y-10 mt-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-on-surface text-center mb-8">
            Your Score History
          </h2>
          <ScoreHistory />
        </div> */}
      </main>

      <Footer />
    </div>
  );
};

// const QuizResult = () => {
//   const { score, questions, user, summary } = useApp();
//   const navigate = useNavigate();

//   const totalQuestions = questions?.length || 0;

//   // Requirement: Display only score, total questions, and userId (currentUser)
//   // I'll show this in a clean, rewarding UI.

//   return (
//     <div className="min-h-screen bg-surface flex flex-col font-body">
//       <Header />

//       <main className="flex-grow pt-32 pb-20 px-6 lg:px-20 flex items-center justify-center">
//         <div className="max-w-2xl w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-primary/10 border border-outline-variant/5 text-center space-y-10 relative overflow-hidden">
//           {/* Top accent */}
//           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent-blue" />

//           <div className="space-y-4">
//             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-5xl mx-auto animate-bounce">
//               <FaTrophy />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">Quiz Completed!</h1>
//             <p className="text-on-surface-variant text-lg">Great job, {user?.name}! Here's how you performed.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="p-8 bg-surface-container-low rounded-3xl space-y-2 border border-outline-variant/10">
//               <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Your Score</span>
//               <div className="text-5xl font-black text-primary">{score || 0}</div>
//             </div>
//             <div className="p-8 bg-surface-container-low rounded-3xl space-y-2 border border-outline-variant/10">
//               <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Total Questions</span>
//               <div className="text-5xl font-black text-on-surface">{totalQuestions}</div>
//             </div>
//           </div>

//           <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-4 text-green-700">
//             <FaCheckCircle className="text-2xl flex-shrink-0" />
//             <p className="text-sm font-medium leading-relaxed">
//               Your results have been securely recorded for User ID: <span className="font-bold">{user?.id || user?.email}</span>.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//             <button
//               onClick={() => navigate("/modules")}
//               className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
//             >
//               <FaRedo /> Try Another Quiz
//             </button>
//             <Link
//               to="/"
//               className="px-8 py-4 bg-surface-container-high text-on-surface rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
//             >
//               <FaHome /> Back to Home
//             </Link>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

export default QuizResult;
