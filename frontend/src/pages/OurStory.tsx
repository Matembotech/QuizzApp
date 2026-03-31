import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaLightbulb, FaRocket, FaUserGraduate } from "react-icons/fa";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface mb-6 tracking-tight">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-10">
              From a classroom challenge to a digital solution. Discover the journey behind QuizzApp.
            </p>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-20 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-primary/20" />
              <div className="relative bg-surface p-8 rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <FaUserGraduate size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-on-surface">The NIT Journey</h3>
                  <p className="text-on-surface-variant italic">
                    "I was always a practical learner. Theory felt like a barrier between me and the real world."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold text-on-surface">Where the Idea Began</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  The story of QuizzApp started at the National Institute of Transport. I studied there as a student and worked on code at the same time. I often felt frustrated with the usual study methods. Many classmates spent hours reading long theory notes, while I kept searching for ways to practice coding and work on real tasks.
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                 With time, I saw the real problem. The material was not the main issue. The way we used it slowed learning. Reading many pages of theory felt slow and tiring, while I wanted to spend more time in the terminal, writing code and building things.
                </p>
              </div>

              <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm">
                <p className="text-primary font-medium italic">
                  "I decided to create a tool that would transform my college notes into interactive quizzes. This didn't just help me memorize; it freed up my time to focus on my true passion: building software."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-24 px-6 lg:px-20 bg-surface relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface">Solving a Shared Problem</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                I soon realized that I wasn't alone. Thousands of students pass through the same struggle every day—trying to balance theoretical knowledge with their practical career ambitions. QuizzApp was born from the desire to bridge that gap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { 
                  icon: <FaLightbulb />, 
                  title: "Simple memorization", 
                  desc: "Transforming dense text into quick, engaging quizzes." 
                },
                { 
                  icon: <FaRocket />, 
                  title: "Practical Focus", 
                  desc: "Saving time on theory to invest more in career skills." 
                },
                { 
                  icon: <FaUserGraduate />, 
                  title: "Student Centric", 
                  desc: "Designed by a student, for students, with real needs in mind." 
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-surface-container-low rounded-2xl space-y-4 transition-transform hover:-translate-y-2 duration-300 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-on-surface">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300"
              >
                Join the Journey
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;
