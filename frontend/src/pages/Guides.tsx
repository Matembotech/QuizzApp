import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaGraduationCap, FaUserTie, FaMobileAlt, FaCloudUploadAlt } from "react-icons/fa";

const Guides = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Guides Hero */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface mb-6 tracking-tight">
              User <span className="text-primary">Guides</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-10">
              Your step-by-step roadmap to mastering QuizzApp. Whether you're a student or an admin, we've got you covered.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {[
                 { 
                   icon: <FaGraduationCap />, 
                   title: "For Students", 
                   points: ["Creating your account", "Finding modules", "Taking quizzes", "Reviewing results"] 
                 },
                 { 
                   icon: <FaUserTie />, 
                   title: "For Admins", 
                   points: ["Managing modules", "Adding questions", "Updating content", "Deleting modules"] 
                 }
               ].map((guide, i) => (
                 <div key={i} className="p-8 bg-surface-container-lowest rounded-2xl shadow-sm space-y-6 border border-outline-variant/5">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">
                     {guide.icon}
                   </div>
                   <h3 className="text-2xl font-display font-bold text-on-surface">{guide.title}</h3>
                   <ul className="space-y-4">
                     {guide.points.map((p, index) => (
                        <li key={index} className="flex gap-3 text-on-surface-variant">
                          <span className="text-primary mt-1">&rarr;</span>
                          <span className="text-sm font-medium">{p}</span>
                        </li>
                     ))}
                   </ul>
                   <button className="w-full py-4 bg-surface-container-high text-primary rounded-xl font-bold hover:bg-surface-container-highest transition-colors">
                     Open {guide.title} Guide
                   </button>
                 </div>
               ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
               {[
                 { 
                   icon: <FaCloudUploadAlt />, 
                   title: "Best Practices", 
                   desc: "Learn how to formulate effective quiz questions and optimize your learning experience." 
                 },
                 { 
                   icon: <FaMobileAlt />, 
                   title: "Mobile Optimization", 
                   desc: "Tips for using QuizzApp efficiently on your mobile devices and tablets." 
                 }
               ].map((misc, i) => (
                 <div key={i} className="p-8 bg-surface rounded-2xl shadow-sm flex items-center gap-6 border border-outline-variant/5">
                   <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-xl shrink-0">
                     {misc.icon}
                   </div>
                   <div className="space-y-1">
                     <h4 className="font-display font-bold text-on-surface">{misc.title}</h4>
                     <p className="text-sm text-on-surface-variant leading-relaxed">{misc.desc}</p>
                   </div>
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

export default Guides;
