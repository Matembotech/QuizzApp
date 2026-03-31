/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

interface ContactFormValues {
  fullname: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  // Parse backend Mongoose validation errors
  const parseBackendErrors = (errorString: string) => {
    const fieldErrors: Record<string, string> = {};
    // Strip the "Contact validation failed: " prefix if present
    const cleanError = errorString.replace(
      /^Contact validation failed:\s*/,
      "",
    );
    const parts = cleanError.split(",");
    parts.forEach((part) => {
      const match = part.match(/(\w+):\s(.+)/);
      if (match) fieldErrors[match[1].trim()] = match[2].trim();
    });
    return fieldErrors;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        data,
      );

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          message:
            response.data.message ||
            "Thank you! Your message has been sent successfully.",
        });
        reset(); // Clear form on success
      }
    } catch (error: any) {
      console.error("Submission error:", error);

      if (error.response?.data?.error) {
        const backendErrors = parseBackendErrors(error.response.data.error);

        // Map errors to react-hook-form
        Object.keys(backendErrors).forEach((field) => {
          setError(field as keyof ContactFormValues, {
            type: "manual",
            message: backendErrors[field],
          });
        });

        setSubmitStatus({
          type: "error",
          message: "Please correct the errors in the form.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            error.response?.data?.message ||
            "Unable to send message. Please check your network connection and try again.",
        });
      }
    }
  };

  // Auto-hide success message
  useEffect(() => {
    if (submitStatus.type === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Contact Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight">
                  Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Have a question, feedback, or just want to say hello? Whether
                  you’re exploring quizzes or aspiring to become a quiz master,
                  our team is here to guide you on your educational journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <FaEnvelope />,
                    label: "Email",
                    value: "ibrahimmaulid551@gmail.com",
                  },
                  {
                    icon: <FaPhone />,
                    label: "Phone",
                    value: "+255 694 228 418",
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    label: "Location",
                    value: "Temeke, Dar es Salaam, Tanzania",
                  },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 p-4 bg-surface-container-low rounded-xl border border-outline-variant/5 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                        {info.label}
                      </div>
                      <div className="text-on-surface font-medium">
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                {[FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form with Snowfall Effect */}
            <div className="relative group">
              {/* Animated Inner Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              {/* Main Container */}
              <div className="relative bg-[#0D0B2E] p-10 rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden min-h-[550px] flex flex-col justify-center">
                {/* Snowfall Container */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                  <style>
                    {`
                      @keyframes snowfall {
                        0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
                        20% { opacity: 1; }
                        100% { transform: translateY(600px) translateX(20px) rotate(360deg); opacity: 0; }
                      }
                      .snow-flake {
                        position: absolute;
                        background: white;
                        border-radius: 50%;
                        filter: blur(1px);
                        animation: snowfall linear infinite;
                      }
                    `}
                  </style>
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="snow-flake"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: "-20px",
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDuration: `${Math.random() * 3 + 4}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: Math.random() * 0.5 + 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Form Content */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-8 relative z-10"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Send us a Message
                    </h3>
                    <p className="text-white/60 text-sm mb-6 font-body">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 relative">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        {...register("fullname")}
                        type="text"
                        placeholder="Matembo Tech"
                        className={`w-full px-5 py-4 bg-white/5 backdrop-blur-md rounded-2xl border ${
                          errors.fullname ? "border-red-400" : "border-white/10"
                        } text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all duration-300`}
                      />
                      {errors.fullname && (
                        <span className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-1 font-bold tracking-tight">
                          {errors.fullname.message}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3 relative">
                      <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="hello@matembotech.com"
                        className={`w-full px-5 py-4 bg-white/5 backdrop-blur-md rounded-2xl border ${
                          errors.email ? "border-red-400" : "border-white/10"
                        } text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all duration-300`}
                      />
                      {errors.email && (
                        <span className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-1 font-bold tracking-tight">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 relative">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
                      Subject
                    </label>
                    <input
                      {...register("subject")}
                      type="text"
                      placeholder="How can we help?"
                      className={`w-full px-5 py-4 bg-white/5 backdrop-blur-md rounded-2xl border ${
                        errors.subject ? "border-red-400" : "border-white/10"
                      } text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all duration-300`}
                    />
                    {errors.subject && (
                      <span className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-1 font-bold tracking-tight">
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 relative">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest ml-1">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Your message here..."
                      className={`w-full px-5 py-4 bg-white/5 backdrop-blur-md rounded-2xl border ${
                        errors.message ? "border-red-400" : "border-white/10"
                      } text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all duration-300 resize-none`}
                    />
                    {errors.message && (
                      <span className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-1 font-bold tracking-tight">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <div className="h-4">
                    {submitStatus.type === "success" && (
                      <div className="flex items-center gap-2 text-primary font-bold text-sm animate-pulse">
                        <FaCheckCircle />
                        <span>{submitStatus.message}</span>
                      </div>
                    )}
                    {submitStatus.type === "error" && (
                      <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                        <FaExclamationCircle />
                        <span>{submitStatus.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 gradient-primary text-on-primary rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
