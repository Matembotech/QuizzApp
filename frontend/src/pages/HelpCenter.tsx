import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch, FaQuestionCircle, FaBook, FaLifeRing } from "react-icons/fa";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Help Center Hero */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-primary/5">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface">How can we <span className="text-primary">help?</span></h1>
            <div className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Search for articles, guides, or FAQs..."
                className="w-full pl-12 pr-6 py-4 bg-surface rounded-2xl shadow-xl shadow-primary/5 border border-outline-variant/10 focus:outline-none focus:border-primary/40 transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-20 px-6 lg:px-20 bg-surface">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaQuestionCircle />, title: "Getting Started", desc: "Learn the basics of creating an account and taking your first quiz." },
              { icon: <FaBook />, title: "User Guides", desc: "Detailed tutorials on all the features available for students and admins." },
              { icon: <FaLifeRing />, title: "Troubleshooting", desc: "Common issues and how to resolve them quickly." }
            ].map((cat, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-outline-variant/5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl mb-6">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">{cat.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{cat.desc}</p>
                <button className="text-primary font-bold text-sm hover:underline">View Articles &rarr;</button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-display font-bold text-on-surface text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is QuizzApp free to use?", a: "Yes, QuizzApp is currently free for all students to use and practice their college notes." },
                { q: "How do I create a quiz?", a: "Currently, quizzes are managed by admins. If you're a student, you can select a module and start practicing immediately." },
                { q: "Can I track my progress?", a: "Absolutely! Your scores are saved to your profile so you can see how you're improving over time." },
                { q: "What if I find an error in a question?", a: "Please use the 'Contact' page to report any inaccuracies. We value your feedback!" }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold text-on-surface mb-2">{faq.q}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-normal">{faq.a}</p>
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

export default HelpCenter;
