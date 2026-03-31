/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaGraduationCap,
  FaFlask,
  FaCode,
  FaHistory,
  FaCalculator,
} from "react-icons/fa";

/**
 * MAPPING FOR ICONS AND COLORS
 */
const visualMapping: any = {
  Mathematics: {
    icon: <FaCalculator />,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  Science: {
    icon: <FaFlask />,
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  Programming: {
    icon: <FaCode />,
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  History: {
    icon: <FaHistory />,
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  "Data Science": {
    icon: <FaGraduationCap />,
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
};

const defaultVisual = {
  icon: <FaGraduationCap />,
  bgColor: "bg-primary/10",
  iconColor: "text-primary",
};

const Modules = () => {
  const {
    modules,
    fetchModules,
    isAuthenticated,
    fetchModuleById,
    selectModule,
    setShowAuthModal,
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
  }, []);

  const handleModuleSelect = (module: any) => {
    if (!isAuthenticated) {
      // Show auth modal instead of immediate redirect
      setShowAuthModal(true);
      return;
    }
    selectModule(module);
    fetchModuleById(module._id || module.id);
    navigate(`/quiz/${module._id || module.id}`);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight">
              Select Your <span className="text-primary">Module</span>
            </h1>
            <p className="text-on-surface-variant text-lg">
              Choose a category to start your learning journey. Each module is
              carefully designed to test your knowledge.
            </p>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.length > 0
              ? modules.map((module, index) => {
                  const visual =
                    visualMapping[module.moduleName] || defaultVisual;
                  return (
                    <div
                      key={module._id || module.id || index}
                      onClick={() => handleModuleSelect(module)}
                      className="group bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 hover:bg-surface-container-high hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center space-y-6"
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl ${visual.bgColor} flex items-center justify-center ${visual.iconColor} text-3xl mx-auto group-hover:scale-110 transition-transform duration-300`}
                      >
                        {visual.icon}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-on-surface capitalize">
                          {module.moduleName}
                        </h3>
                        <p className="text-sm text-on-surface-variant line-clamp-2">
                          {module.description ||
                            `Test your skills in ${module.moduleName} with our interactive quiz.`}
                        </p>
                      </div>
                      <div className="pt-4">
                        <span className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-2 transition-all">
                          Start Quiz {">"}
                        </span>
                      </div>
                    </div>
                  );
                })
              : // Loading Skeletons
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10 h-[300px]"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-surface-container-high mx-auto mb-6" />
                    <div className="h-6 bg-surface-container-high rounded w-3/4 mx-auto mb-4" />
                    <div className="h-4 bg-surface-container-high rounded w-1/2 mx-auto" />
                  </div>
                ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Modules;
