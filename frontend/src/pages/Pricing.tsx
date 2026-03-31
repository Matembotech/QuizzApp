import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLock } from "react-icons/fa";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl mx-auto mb-6">
              <FaLock />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-on-surface mb-6 tracking-tight">
              Pricing <span className="text-primary">Coming Soon</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-10">
              We are preparing flexible pricing plans built around your learning needs. More updates will come soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
