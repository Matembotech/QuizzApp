/* eslint-disable react-hooks/purity */
import { Link } from "react-router-dom";
import heroPerson1 from "../assets/hero_person_1.png";
import heroPerson2 from "../assets/hero_person_2.png";
import heroPerson3 from "../assets/hero_person_3.png";
import { useApp } from "../context/AppContext";

const Hero = () => {
  const { user } = useApp();

  return (
    <section className="relative overflow-hidden bg-hero-dark pt-28 pb-0">
      {/* Decorative SVG Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hot air balloon - top right */}
        <svg
          className="absolute top-16 right-[12%] w-16 h-20 text-accent-green/30 animate-float"
          viewBox="0 0 64 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <ellipse cx="32" cy="28" rx="20" ry="24" />
          <path d="M20 48 L28 60 L36 60 L44 48" />
          <rect x="26" y="60" width="12" height="8" rx="2" />
          <line x1="32" y1="4" x2="32" y2="0" />
        </svg>

        {/* Open book - top left */}
        <svg
          className="absolute top-32 left-[8%] w-14 h-12 text-white/15 animate-float-delayed"
          viewBox="0 0 56 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M28 8 C28 8 18 4 4 8 L4 44 C18 40 28 44 28 44" />
          <path d="M28 8 C28 8 38 4 52 8 L52 44 C38 40 28 44 28 44" />
        </svg>

        {/* Graduation cap - bottom left */}
        <svg
          className="absolute bottom-[40%] left-[5%] w-12 h-12 text-accent-green/20"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="24,8 4,20 24,32 44,20" />
          <path d="M12 24 L12 36 C12 36 18 42 24 42 C30 42 36 36 36 36 L36 24" />
          <line x1="44" y1="20" x2="44" y2="38" />
        </svg>

        {/* Pencil - right side */}
        <svg
          className="absolute top-[45%] right-[6%] w-8 h-16 text-white/10 rotate-45"
          viewBox="0 0 16 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="8" width="12" height="32" rx="1" />
          <polygon points="2,40 8,48 14,40" />
          <line x1="2" y1="12" x2="14" y2="12" />
        </svg>

        {/* Dots grid decoration */}
        <div className="absolute bottom-[30%] right-[15%] grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent-green/15"
            />
          ))}
        </div>

        {/* Snowfall Effect - Many snowflakes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <style>
            {`
              @keyframes snowfall {
                0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translateY(100vh) translateX(20px) rotate(360deg); opacity: 0; }
              }
              .snow-flake-hero {
                position: absolute;
                background: white;
                border-radius: 50%;
                filter: blur(1px);
                animation: snowfall linear infinite;
              }
            `}
          </style>
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="snow-flake-hero"
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
      </div>

      {/* Welcome user message */}
      <div className="text-center text-white/50 text-[20px] mb-10">
        {user ? (
          <span>
            Hi, <strong>{user.name}</strong>! Welcome to Quizz App
          </span>
        ) : (
          <span>Welcome to Quizz App</span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1]">
            Grow Your Skills to Advance Your{" "}
            <span className="text-accent-green">Career path.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-center text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Tired of reading notes??. Take our semester quizzes modules and pass
          your exams with ease.
        </p>

        {/* CTA Row + Enrolled Students */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link to="/modules">
              <button className="px-8 py-3.5 rounded-full font-semibold text-hero-dark bg-accent-green hover:bg-accent-green-hover transition-all text-sm shadow-lg shadow-accent-green/25 cursor-pointer">
                Get Started
              </button>
            </Link>
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium group cursor-pointer">
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent-green group-hover:text-accent-green transition-colors">
                <svg
                  className="w-4 h-4 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </span>
              Watch Video
            </button>
          </div>

          {/* Enrolled Students */}
          <div className="flex items-center gap-3 ml-0 sm:ml-8">
            <span className="text-white/50 text-sm">
              365 k+ enrolled students
            </span>
            <div className="flex -space-x-2">
              {[
                "bg-purple-400",
                "bg-pink-400",
                "bg-amber-400",
                "bg-teal-400",
                "bg-indigo-400",
                "bg-rose-400",
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-hero-dark flex items-center justify-center text-white text-xs font-bold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Three Arch-Shaped Person Images */}
        <div className="flex items-end justify-center gap-4 md:gap-6 lg:gap-8 mt-4">
          {/* Person 1 - Left */}
          <div className="relative w-[28%] max-w-[260px]">
            <div className="relative rounded-t-[120px] overflow-hidden border-4 border-hero-dark-lighter aspect-[3/4] bg-purple-300">
              <img
                src={heroPerson1}
                alt="Student 1"
                className="w-full h-full object-cover object-top hover:scale-115 transition-all duration-1000 cursor-pointer"
              />
            </div>
          </div>

          {/* Person 2 - Center (Taller) */}
          <div className="relative w-[32%] max-w-[300px]">
            <div className="relative rounded-t-[140px] overflow-hidden border-4 border-hero-dark-lighter aspect-[3/4.2] bg-green-200">
              <img
                src={heroPerson3}
                alt="Student 2"
                className="w-full h-full object-cover object-top hover:scale-115 transition-all duration-1000 cursor-pointer"
              />
            </div>
          </div>

          {/* Person 3 - Right (Gradient placeholder) */}
          <div className="relative w-[28%] max-w-[260px]">
            <div className="relative rounded-t-[120px] overflow-hidden border-4 border-hero-dark-lighter aspect-[3/4] bg-purple-300">
              <img
                src={heroPerson2}
                alt="Student 1"
                className="w-full h-full object-cover object-top hover:scale-115 transition-all duration-1000 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wavy bottom divider */}
      <div className="relative -mb-1">
        <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 96L1440 96L1440 0C1440 0 1200 80 720 80C240 80 0 0 0 0L0 96Z"
            fill="#faf4ff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
