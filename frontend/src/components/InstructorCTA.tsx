import { Link } from "react-router-dom";

const InstructorCTA = () => {
  return (
    <section className="py-16 px-6 lg:px-20 bg-surface">
      <div className="bg-surface-container-low rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ghost-border">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container blur-[80px] opacity-30 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-container blur-[60px] opacity-30 rounded-full pointer-events-none"></div>

        <div className="flex-1 z-10 relative">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Become A Quiz Master
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-on-surface max-w-xl leading-tight">
            You can join with QuizzApp as a{" "}
            <span className="text-secondary relative">
              quiz creator?
              <svg
                className="absolute -bottom-2 left-0 w-full text-secondary opacity-60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 10 Q 50 15 100 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
        </div>

        <div className="z-10 relative flex-shrink-0">
          {/* Arrow decor pointing to button */}
          <svg
            className="absolute -left-24 top-1/2 -translate-y-1/2 w-20 h-10 text-primary hidden lg:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>

          <Link to="/contact">
            <button className="px-8 py-4 rounded-2xl font-semibold text-on-primary gradient-primary shadow-ambient hover:scale-105 transition-transform text-lg">
              Drop Information
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstructorCTA;
