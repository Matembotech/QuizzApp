// import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Newsletter from "./newsletter";
import { Link } from "react-router-dom";
import matemboLogo from "../assets/matembo logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest pt-16 pb-8 px-6 lg:px-20 border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* ... all your existing footer columns unchanged ... */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-full bg-accent-green flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-hero-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <Link to="/" className="hover:text-primary transition-colors">
              <span className="text-xl font-display font-bold text-on-surface">
                QuizzApp
              </span>
            </Link>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Provide the best learning experience through interactive quizzes and
            assessments.
          </p>
          <div className="flex gap-4">
            {[
              {
                Icon: FaFacebookF,
                color: "hover:bg-[#1877F2]",
                href: "https://www.facebook.com/MatemboTech/",
              },
              { Icon: FaTwitter, color: "hover:bg-[#1DA1F2]", href: "#" },
              {
                Icon: FaInstagram,
                color:
                  "hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
                href: "https://www.instagram.com/matembo_dev/?__pwa=1",
              },
              { Icon: FaLinkedinIn, color: "hover:bg-[#0A66C2]", href: "#" },
              {
                Icon: FaGithub,
                color: "hover:bg-[#24292F]",
                href: "https://github.com/Matembotech",
              },
              { Icon: FaYoutube, color: "hover:bg-[#FF0000]", href: "#" },
            ].map(({ Icon, color, href }, index) => (
              <a
                key={index}
                href={href}
                className={`w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md ${color} group`}
              >
                <Icon
                  size={20}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-on-surface mb-6 font-display">
            About Us
          </h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li>
              <Link
                to="/our-story"
                className="hover:text-primary transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                to="/investors"
                className="hover:text-primary transition-colors"
              >
                Investors
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-on-surface mb-6 font-display">Legal</h4>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                to="/security"
                className="hover:text-primary transition-colors"
              >
                Security
              </Link>
            </li>
          </ul>
        </div>

        <Newsletter />
      </div>

      {/* Top copyright row */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/20 text-sm text-on-surface-variant">
        <p>&copy; {new Date().getFullYear()} QuizApp. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link to="/cookies" className="hover:text-primary transition-colors">
            Cookies
          </Link>
        </div>
      </div>

      {/* ✅ Designed by Matembo Tech — bottom of footer */}
      <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-outline-variant/10">
        <img
          src={matemboLogo}
          alt="Matembo Tech"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
        />
        <p className="text-xs text-on-surface-variant">
          Designed & Built by{" "}
          <span className="font-bold text-primary">Matembo Tech</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
