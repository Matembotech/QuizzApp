import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Investors from "./pages/Investors";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import HelpCenter from "./pages/HelpCenter";
import Guides from "./pages/Guides";
import ApiStatus from "./pages/ApiStatus";
import Security from "./pages/Security";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import AuthNotificationModal from "./components/AuthNotificationModal";
import { useApp } from "./context/AppContext";
import "./index.css";

function App() {
  const { showAuthModal, setShowAuthModal } = useApp();

  return (
    <Router>
      <ScrollToTop />
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/api-status" element={<ApiStatus />} />
          <Route path="/security" element={<Security />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/quiz/:moduleId" element={<Quiz />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>

        {/* Auth Notification Modal */}
        {showAuthModal && (
          <AuthNotificationModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
