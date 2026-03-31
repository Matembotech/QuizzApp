import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLock, FaShieldAlt, FaUserSecret, FaBug, FaCheckCircle } from "react-icons/fa";

const Security = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Security Hero */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden bg-primary/5">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface tracking-tight">
              Security <span className="text-primary">First</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Protecting your data is our highest priority. We use world-class security measures to ensure your information remains safe and private.
            </p>
          </div>
        </section>

        {/* Security Pillars */}
        <section className="py-20 px-6 lg:px-20 bg-surface">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaLock />, title: "Data Encryption", desc: "All data is encrypted in transit and at rest using industry-standard protocols." },
              { icon: <FaShieldAlt />, title: "Secure Infrastructure", desc: "Our platform is built on highly secure, compliant cloud architecture." },
              { icon: <FaUserSecret />, title: "Access Control", desc: "Strict internal access patterns and multi-factor authentication for employees." },
              { icon: <FaBug />, title: "Bug Bounty", desc: "We work with security researchers to identify and fix potential vulnerabilities." }
            ].map((pillar, i) => (
              <div key={i} className="p-8 bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/5 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl mx-auto">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-on-surface">{pillar.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Commitment */}
        <section className="py-24 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-on-surface">Compliance & Standards</h2>
              <p className="text-on-surface-variant leading-relaxed">
                QuizzApp is committed to meeting international security standards. We undergo regular internal audits to ensure our processes remain robust against evolving threats.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "GDPR & Data Privacy Compliance",
                  "SSL/TLS 1.2+ Encryption",
                  "Automated Vulnerability Scanning",
                  "24/7 Security Monitoring"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm text-on-surface font-medium">
                    <div className="w-5 h-5 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center text-[10px]">
                      <FaCheckCircle />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-surface rounded-3xl shadow-xl border border-outline-variant/10 space-y-6">
              <h3 className="text-xl font-bold text-on-surface">Report a Vulnerability</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                If you believe you've found a security vulnerability in QuizzApp, please get in touch with our security team immediately.
              </p>
              <a 
                href="mailto:security@quizzapp.com"
                className="block text-center py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform duration-300"
              >
                Email Security Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Security;
