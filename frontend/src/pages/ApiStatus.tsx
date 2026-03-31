import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheckCircle, FaServer } from "react-icons/fa";

const ApiStatus = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        {/* Status Hero */}
        <section className="relative pt-24 pb-20 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-on-surface mb-6 tracking-tight">
              System <span className="text-primary">Status</span>
            </h1>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 text-green-600 rounded-full font-bold border border-green-500/20">
              <FaCheckCircle />
              All Systems Operational
            </div>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Real-time monitoring and updates for all QuizzApp services. We strive for 99.9% uptime.
            </p>
          </div>
        </section>

        {/* Status Dashboard */}
        <section className="py-20 px-6 lg:px-20 bg-surface-container-low">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Public API", status: "Operational", uptime: "99.98%", icon: <FaServer /> },
                { name: "User Authentication", status: "Operational", uptime: "100%", icon: <FaCheckCircle /> },
                { name: "Quiz Engine", status: "Operational", uptime: "99.95%", icon: <FaServer /> },
                { name: "Database Cluster", status: "Operational", uptime: "99.99%", icon: <FaServer /> }
              ].map((service, i) => (
                <div key={i} className="p-6 bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex justify-between items-center group hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{service.name}</h4>
                      <p className="text-xs text-on-surface-variant">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-lg border border-green-500/20">
                    {service.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Incident History placeholder */}
            <div className="pt-12 space-y-6">
              <h2 className="text-2xl font-display font-bold text-on-surface">Incident History</h2>
              <div className="space-y-4">
                {[
                  { date: "March 24, 2026", title: "Minor API Latency", status: "Resolved", desc: "A brief period of increased latency was observed. Our engineering team resolved the issue within 15 minutes." },
                  { date: "March 15, 2026", title: "Scheduled Database Maintenance", status: "Completed", desc: "Routine maintenance was completed successfully with minimal downtime." }
                ].map((incident, i) => (
                  <div key={i} className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{incident.date}</div>
                        <h4 className="font-bold text-on-surface">{incident.title}</h4>
                      </div>
                      <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                        {incident.status}
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{incident.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ApiStatus;
