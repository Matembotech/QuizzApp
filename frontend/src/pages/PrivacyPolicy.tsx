import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body text-on-surface">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
          Privacy Policy
        </h1>
        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address, and performance data when you participate in quizzes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">2. How We Use Your Information</h2>
            <p>
              Your data is used to provide your quiz results, track your progress, and improve our educational content. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">3. Data Storage and Security</h2>
            <p>
              We use secure servers and databases (MongoDB) and industry-standard authentication (Clerk) to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">4. Third-Party Services</h2>
            <p>
              We may use third-party services for authentication and analytics. These services have their own privacy policies governing how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
