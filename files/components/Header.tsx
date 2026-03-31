import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/modules":   "Modules",
  "/admin/questions": "Questions",
  "/admin/users":     "Users",
};

export default function Header({ onToggleSidebar }: HeaderProps) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const rawUser = localStorage.getItem("adminUser");
  const user = rawUser ? JSON.parse(rawUser) : { email: "admin@quizzapp.com" };
  const initials = user.email?.slice(0, 2).toUpperCase() ?? "AD";
  const title = PAGE_TITLES[location.pathname] ?? "Admin";

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  }

  return (
    <header className="admin-header">
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        <button className="btn-icon" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          fontWeight: 800,
          color: "var(--on-surface)",
          letterSpacing: "-0.01em",
        }}>
          {title}
        </h1>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        {/* Notification Bell */}
        <div style={{ position: "relative" }}>
          <button className="btn-icon" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <span className="notif-badge">3</span>
        </div>

        {/* User Dropdown */}
        <div ref={dropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropOpen(!dropOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "6px 12px 6px 6px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(178,166,213,0.2)",
              background: "var(--surface-container-low)",
              cursor: "pointer",
              transition: "all var(--transition-fast)",
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 32, height: 32,
              borderRadius: "var(--radius-full)",
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--on-primary)",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}>
              {initials}
            </div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--on-surface)",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {user.email}
            </span>
            <ChevronDown
              size={14}
              style={{
                color: "var(--on-surface-variant)",
                transition: "transform var(--transition-fast)",
                transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {dropOpen && (
            <div className="dropdown-menu">
              <div style={{ padding: "var(--space-3) var(--space-4)", borderBottom: "1px solid rgba(178,166,213,0.15)" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "var(--on-surface)" }}>
                  {user.email}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--on-surface-variant)", marginTop: 2 }}>
                  Administrator
                </div>
              </div>
              <button className="dropdown-item">
                <User size={15} /> Profile
              </button>
              <button className="dropdown-item">
                <Settings size={15} /> Settings
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
