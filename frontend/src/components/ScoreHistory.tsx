/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { FaCalendarAlt, FaUser, FaTrophy } from "react-icons/fa";

const ScoreHistory = () => {
  const { results, user, isAuthenticated, setShowAuthModal } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, setShowAuthModal]);

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate percentage
  const calculatePercentage = (score: number, total: number) => {
    return total > 0 ? ((score / total) * 100).toFixed(1) : "0.0";
  };

  //filter results by userId
  const userResults = results.filter((result: any) => result.userId?._id === user?.id);

  // If no results, show empty state
  if (!results || results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTrophy className="text-3xl text-on-surface-variant" />
        </div>
        <h3 className="text-xl font-display font-bold text-on-surface mb-2">
          No Quiz History Yet
        </h3>
        <p className="text-on-surface-variant">
          Complete some quizzes to see your score history!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {userResults.map((result: any, index: number) => {
          const percentage = calculatePercentage(result.score, result.totalQuestions);
          const isPassed = result.score / result.totalQuestions >= 0.5;

          return (
            <div
              key={result._id || index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left - User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-primary text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">
                      {user?.name || "Anonymous User"}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      {user?.email || "Anonymous User"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1">
                      <FaCalendarAlt />
                      <span>{formatDate(result.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Right - Score */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-primary">
                      {result.score}/{result.totalQuestions}
                    </div>
                    <div className="text-sm text-on-surface-variant">
                      {percentage}%
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      isPassed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isPassed ? "PASSED" : "FAILED"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreHistory;
