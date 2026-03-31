import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaChartLine, FaGlobe, FaLightbulb } from "react-icons/fa";

const Investors = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface mb-6 tracking-tight">
              Investor <span className="text-primary">Relations</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-10">
              Investing in the future of education. Join us on our mission to make learning accessible and engaging for everyone.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-display font-bold text-on-surface">Our Vision</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  At QuizzApp, we believe that education should be as dynamic as the world we live in. Our vision is to create a global ecosystem where students can seamlessly transition from theory to practice.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <FaGlobe />, label: "Global Reach", value: "Tanzania & Beyond" },
                  { icon: <FaChartLine />, label: "User Growth", value: "Exponential" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-surface-container-lowest rounded-xl shadow-sm space-y-2">
                    <div className="text-primary text-2xl">{stat.icon}</div>
                    <div className="text-sm text-on-surface-variant">{stat.label}</div>
                    <div className="text-xl font-bold text-on-surface">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-primary/20" />
              <div className="relative bg-surface p-10 rounded-2xl shadow-sm border border-outline-variant/5">
                <div className="space-y-6">
                  <h3 className="text-2xl font-display font-bold text-on-surface text-center">Market Opportunity</h3>
                  <p className="text-on-surface-variant text-center italic">
                    "The EdTech sector is evolving. Students are demanding more practical, bite-sized learning experiences."
                  </p>
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant">Practical Learning Demand</span>
                      <span className="text-primary font-bold">85% increase</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Strategy */}
        <section className="py-24 px-6 lg:px-20 bg-surface">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface">Why Invest in QuizzApp?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { 
                  icon: <FaLightbulb />, 
                  title: "Innovative Platform", 
                  desc: "Built on a student-first philosophy, solving real educational gaps." 
                },
                { 
                  icon: <FaChartLine />, 
                  title: "Scalable Tech", 
                  desc: "Engineered for high performance and rapid global expansion." 
                },
                { 
                  icon: <FaGlobe />, 
                  title: "Impact Driven", 
                  desc: "Creating tangible value for students and educational institutions." 
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-surface-container-low rounded-2xl space-y-4 hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-on-surface">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Investors;
