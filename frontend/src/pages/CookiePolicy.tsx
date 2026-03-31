import Header from "../components/Header";
import Footer from "../components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body text-on-surface">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
          Cookie Policy
        </h1>
        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">1. What are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">2. How We Use Cookies</h2>
            <p>
              At QuizzApp, we use cookies for:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Authentication:</strong> To keep you logged in during your session.</li>
              <li><strong>Preferences:</strong> To remember your quiz progress or settings.</li>
              <li><strong>Analytics:</strong> To understand how users interact with our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">3. Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-on-surface mb-4">4. Third-Party Cookies</h2>
            <p>
              Some features, like authentication via Clerk, may set cookies from their respective domains. We do not have control over these third-party cookies.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
