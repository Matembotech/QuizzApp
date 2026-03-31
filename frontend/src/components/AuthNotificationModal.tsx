import React from "react";
import { Link } from "react-router-dom";

/**
 * AUTHENTICATION NOTIFICATION MODAL
 * Shows when unauthenticated users try to access features that require login.
 */
interface AuthNotificationModalProps {
  onClose: () => void;
}

const AuthNotificationModal: React.FC<AuthNotificationModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      {/* Backdrop with frosted glass effect */}
      <div
        className="absolute inset-0 bg-hero-dark/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[95vw] sm:max-w-2xl bg-[#1A1842] border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-2xl shadow-primary/20 overflow-hidden flex flex-col animate-scale-up max-h-[90vh] overflow-y-auto">
        {/* Close button - top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-12 text-center space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Title and Message */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Authentication Required
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-md mx-auto px-2">
              You need to create an account to track your quiz results and monitor your progress over time.
            </p>
          </div>

          {/* Features List - More compact on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-2">
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📊</div>
              <p className="text-xs sm:text-sm text-white/80 font-medium">Track Progress</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📈</div>
              <p className="text-xs sm:text-sm text-white/80 font-medium">View History</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏆</div>
              <p className="text-xs sm:text-sm text-white/80 font-medium">Save Scores</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center justify-center pt-2 sm:pt-4 px-4">
            <Link
              to="/register"
              onClick={onClose}
              className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-accent-green text-hero-dark rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-center text-sm sm:text-base"
            >
              Create Account
            </Link>
            <p className="text-xs sm:text-sm text-white/50 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                onClick={onClose}
                className="text-accent-green hover:underline font-medium"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNotificationModal;
