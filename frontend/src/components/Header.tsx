import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Header = () => {
  const { user, isAuthenticated, logout } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <header className="absolute top-0 left-0 w-full h-20 pt10 z-50 bg-[#0D0B2E] sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-accent-green flex items-center justify-center">
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
              <span className="text-xl font-display font-bold text-white">
                QuizzApp
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className="text-white hover:text-accent-green transition-colors"
            >
              Homes
            </Link>
            <Link
              to="/modules"
              className="text-white/70 hover:text-accent-green transition-colors"
            >
              Modules
            </Link>
            <Link
              to="/pricing"
              className="text-white/70 hover:text-accent-green transition-colors"
            >
              pricing
            </Link>
            <Link
              to="/contact"
              className="text-white/70 hover:text-accent-green transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="hidden sm:block px-7 py-2.5  rounded-full font-semibold text-hero-dark bg-accent-green hover:bg-accent-green-hover transition-all text-sm cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <FaUserCircle className="text-accent-green" size={20} />
                  <span className="text-sm font-semibold hidden lg:block">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-all text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-white cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
