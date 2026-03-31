import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUsers, FaHeart, FaRocket } from "react-icons/fa";

const Careers = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface mb-6 tracking-tight">
              Join the <span className="text-primary">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-10">
              Help us redefine how the world learns. We're looking for passionate individuals who are ready to make an impact.
            </p>
          </div>
        </section>

        {/* Culture & Values */}
        <section className="py-20 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-display font-bold text-on-surface">Our Culture</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                At QuizzApp, we foster an environment of continuous learning, innovation, and mutual respect. We're more than just a company; we're a community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FaRocket />, 
                  title: "Innovation First", 
                  desc: "We encourage curiosity and the courage to experiment with new ideas." 
                },
                { 
                  icon: <FaHeart />, 
                  title: "People Centric", 
                  desc: "We believe in the power of empathy and collaboration in everything we do." 
                },
                { 
                  icon: <FaUsers />, 
                  title: "Collaborative Growth", 
                  desc: "Your growth is our growth. We provide tools and mentorship to help you thrive." 
                }
              ].map((value, i) => (
                <div key={i} className="p-8 bg-surface-container-lowest rounded-2xl shadow-sm space-y-4 border border-outline-variant/5">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-on-surface text-xl">{value.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
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

export default Careers;
