import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body text-on-surface">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
          Terms of Service
        </h1>
        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuizzApp, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">2. Use of the Platform</h2>
            <p>
              QuizzApp provides educational content and assessments. You agree to use the platform for lawful purposes only and in a manner that does not infringe the rights of others.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>You must provide accurate information when registering.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>You may not attempt to reverse engineer or scrape data from the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">3. Intellectual Property</h2>
            <p>
              All content on QuizzApp, including but not limited to quiz questions, graphics, and design, is the property of QuizzApp or its content providers and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">4. Limitation of Liability</h2>
            <p>
              QuizzApp is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the platform after such changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
