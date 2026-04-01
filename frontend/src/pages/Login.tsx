/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";

// Define form field structure for type safety
interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { login, error: authError, loading } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * INITIALIZE REACT HOOK FORM
   * mode: 'onChange' provides immediate feedback as the user types.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: "onChange",
  });

  /**
   * SUCCESS MESSAGE EFFECT
   * Displays a message if the user just registered.
   */
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setSuccessMessage(
        "Your account was created successfully. You can now log in.",
      );
      // Clean up the location state to prevent the message showing again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  /**
   * FORM SUBMISSION HANDLER
   * Called only if the frontend validation passes.
   */
  const onSubmit = async (data: LoginFormValues) => {
    setLocalError(null);
    try {
      await login(data);
      // Navigate to dashboard/home after successful login
      navigate("/");
    } catch (err: any) {
      setLocalError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B2E] flex items-center justify-center p-6 font-body overflow-hidden relative">
      {/* Background decoration consistent with branding */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Welcome Content */}
        <div className="hidden lg:flex flex-col space-y-8 animate-fade-in-up">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-5 h-5 text-hero-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              QuizzApp
            </span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-6xl font-display font-bold text-white leading-tight">
              Welcome Back <br />{" "}
              <span className="text-primary">to QuizzApp!</span>
            </h1>
            <div className="w-20 h-1 bg-primary rounded-full" />
            <p className="text-lg text-white/60 leading-relaxed max-w-md">
              Log in to continue your learning journey and track your progress
              across all quiz modules.
            </p>
          </div>

          <button className="w-fit px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Right Side: Login Form with Real-time Validation */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-blue to-primary animate-gradient-x" />

            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                Sign in
              </h2>
              <p className="text-white/50 text-sm">
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* General Feedback Alerts */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm text-center font-bold">
                {successMessage}
              </div>
            )}

            {(authError || localError) && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center font-bold animate-pulse">
                {authError || localError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* EMAIL FIELD */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    Email Address
                  </label>
                  {errors.email && (
                    <span
                      id="email-error"
                      className="text-red-400 text-[10px] font-bold animate-fade-in"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid format",
                      },
                    })}
                    type="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="name@example.com"
                    className={`w-full bg-white/5 border ${
                      errors.email
                        ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                        : "border-white/10"
                    } rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all`}
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    Password
                  </label>
                  {errors.password && (
                    <span
                      id="password-error"
                      className="text-red-400 text-[10px] font-bold animate-fade-in"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    placeholder="••••••••"
                    className={`w-full bg-white/5 border ${
                      errors.password
                        ? "border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                        : "border-white/10"
                    } rounded-xl py-3.5 pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isValid}
                className="w-full py-4 gradient-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-8 space-y-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 border-t border-white/10" />
                <span className="relative px-4 bg-[#0D0B2E] text-xs text-white/30 uppercase tracking-widest">
                  Or Sign in With
                </span>
              </div>

              <div className="flex justify-center gap-4">
                {[FaFacebookF, FaGoogle, FaTwitter].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-white/50 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline ml-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
