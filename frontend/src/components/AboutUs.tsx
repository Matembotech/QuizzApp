import aboutpic from "../assets/aboutphoto.jpg";
import aiVideo from "../assets/ai-video.mp4";

const AboutUs = () => {
  const features = [
    { icon: "✓", label: "Questions Bank" },
    { icon: "✓", label: "Stunning Answers" },
    { icon: "✓", label: "Explanations" },
    { icon: "✓", label: "Track Progress" },
  ];

  return (
    <section className="py-20 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left - Image Collage */}
        <div className="lg:w-[45%] relative flex-shrink-0">
            {/* Main image container */}
          <div className="relative w-full max-w-md">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-300 to-blue-500 shadow-xl">
              {/* Person silhouette placeholder */}
              <div className="relative w-full h-full flex items-end justify-center">
                <img src={aboutpic} alt="Person" className="w-full h-full object-cover" />
                {/* Text overlay on top left */}
                <div className="absolute top-6 left-6">
                  <h1 className="text-5xl md:text-5xl font-bold text-white/50">Tired <br />of <br />notes?</h1>
                </div>
              </div>
            </div>

            {/* Overlaid smaller image */}
            <div className="absolute -bottom-6 -right-6 w-48 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-indigo-100 to-purple-100">
              <video 
              src={aiVideo} 
              autoPlay 
              loop 
              muted
              playsInline 
              className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right - Text Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-on-surface-variant text-sm font-medium tracking-wider uppercase">
              About Us
            </span>
            <div className="w-12 h-[1px] bg-on-surface-variant/40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-bold text-on-surface leading-tight mb-6">
            We Are Maximize
            <br />
            Your Learning Growth
          </h2>

          <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-lg">
            Tired of reading notes and textbooks? Want to test your knowledge
            and improve your grades? Join the Quiz App and start learning in a
            fun and interactive way!
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-on-surface">
                  {feat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
