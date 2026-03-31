/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { Home, BookOpen, Tag, Mail, User, LogOut, X } from "lucide-react";
import { useApp } from "../context/AppContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SidebarNavItem: Individual navigation link with icon and label.
 */
const SidebarNavItem: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 mx-2 rounded-xl text-on-surface hover:bg-surface-container-highest transition-all duration-200 group"
  >
    <span className="text-primary group-hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
    <span className="font-body font-medium text-sm">{label}</span>
  </Link>
);

/**
 * UserProfileCard: Displays user avatar and info in a bordered-effect container.
 */
const UserProfileCard: React.FC<{ user: any }> = ({ user }) => (
  <div className="mx-4 my-2 p-4 bg-surface-container-low rounded-2xl flex items-center gap-4 transition-all duration-300">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-lg shrink-0">
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>
    <div className="flex flex-col min-w-0">
      <span className="font-display font-bold text-on-surface text-sm truncate">
        {user?.name}
      </span>
      <span className="font-body text-[11px] text-on-surface-variant truncate">
        {user?.email}
      </span>
    </div>
  </div>
);

/**
 * Sidebar Component: Replicates reference architecture with Luminous Scholar design.
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useApp();

  return (
    <>
      {/* Overlay: Closes sidebar on click */}
      <div
        className={`fixed inset-0 z-[60] bg-on-surface/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-[100] flex flex-col glass shadow-ambient transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6">
          <Link
            to="/"
            className="flex items-center gap-2 outline-none"
            onClick={onClose}
          >
            <div className="w-8 h-8 rounded-full bg-accent-green flex items-center justify-center shadow-sm">
              <svg
                className="w-4 h-4 text-hero-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="font-display font-bold text-on-surface text-lg tracking-tight">
              QuizzApp
            </span>
          </Link>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors group"
            aria-label="Close menu"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* User Profile Section (Auth Dependent) */}
        {isAuthenticated && user && <UserProfileCard user={user} />}

        {/* Navigation Section (Scrollable) */}
        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          <SidebarNavItem
            to="/"
            icon={<Home size={18} />}
            label="Home"
            onClick={onClose}
          />
          <SidebarNavItem
            to="/modules"
            icon={<BookOpen size={18} />}
            label="Modules"
            onClick={onClose}
          />
          <SidebarNavItem
            to="/pricing"
            icon={<Tag size={18} />}
            label="Pricing"
            onClick={onClose}
          />
          <SidebarNavItem
            to="/contact"
            icon={<Mail size={18} />}
            label="Contact"
            onClick={onClose}
          />
          {isAuthenticated && (
            <SidebarNavItem
              to="/profile"
              icon={<User size={18} />}
              label="Profile"
              onClick={onClose}
            />
          )}
        </nav>

        {/* Sidebar Footer: Auth Actions */}
        <div className="p-6 mt-auto border-t border-outline-variant/10 flex flex-col gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={onClose}
                className="w-full py-3 text-center rounded-xl font-body font-semibold text-sm bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className="w-full py-3 text-center rounded-xl font-body font-bold text-sm text-on-primary gradient-primary shadow-sm hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-body font-semibold text-sm bg-surface-container-high text-on-surface hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
            >
              <LogOut
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Sign out
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
