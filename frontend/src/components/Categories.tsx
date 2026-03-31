/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

/**
 * MAPPING FOR ICONS AND COLORS
 * Since the backend modules might not have these visual properties,
 * we map them based on module names or indices.
 */
const visualMapping: any = {
  "Data Science": {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
        />
      </svg>
    ),
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  English: {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  Finance: {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  Development: {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  // Add more module types as needed
};

// Default styling for unknown modules
const defaultVisual = {
  icon: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  bgColor: "bg-emerald-50",
  iconColor: "text-emerald-500",
};

const Categories = () => {
  const { modules, fetchModules, selectModule } = useApp(); // Added selectModule

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <section className="py-20 px-6 lg:px-12 bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Left Column */}
        <div className="lg:w-[30%] flex-shrink-0">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface leading-tight mb-4">
            View
            <br />
            Semester Modules
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
            Select a module to start your quiz. Test your knowledge and track
            your progress in real-time.
          </p>
          
          <Link to="/modules" className="hover:text-primary transition-colors">
          <button className="px-7 py-3 rounded-full font-semibold text-sm text-white bg-on-surface hover:bg-hero-dark transition-colors cursor-pointer">
            View All Modules
          </button>
          </Link>
        </div>

        {/* Right Column - Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {modules.length > 0
            ? modules.map((module: any, index: number) => {
                const visual = visualMapping[module.moduleName] || defaultVisual;
                return (
                  <div
                    key={module._id || module.id || index}
                    onClick={() => selectModule(module)}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-outline-variant/15 hover:shadow-ambient hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${visual.bgColor} flex items-center justify-center ${visual.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      {visual.icon}
                    </div>
                    <span className="text-sm font-medium text-on-surface text-center capitalize">
                      {module.moduleName}
                    </span>
                  </div>
                );
              })
            : // Skeleton / Loading state
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/50 border border-outline-variant/10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high" />
                  <div className="h-4 w-20 bg-surface-container-high rounded" />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
