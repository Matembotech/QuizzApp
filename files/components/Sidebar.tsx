import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, HelpCircle, Users, LogOut, Zap,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
}

const NAV = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard"  },
  { to: "/admin/modules",   icon: BookOpen,         label: "Modules"    },
  { to: "/admin/questions", icon: HelpCircle,       label: "Questions"  },
  { to: "/admin/users",     icon: Users,            label: "Users"      },
];

export default function Sidebar({ collapsed, mobileOpen }: SidebarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  }

  return (
    <aside
      className={`admin-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}
    >
      {/* ── Logo ── */}
      <div style={{
        padding: "var(--space-5) var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        borderBottom: "1px solid rgba(178,166,213,0.12)",
        minHeight: "var(--header-height)",
        overflow: "hidden",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "var(--radius-md)",
          background: "var(--gradient-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Zap size={18} color="white" fill="white" />
        </div>
        <div className="sidebar-label" style={{ overflow: "hidden" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1rem",
            color: "var(--on-surface)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}>
            QuizzApp
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "var(--on-surface-variant)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}>
            Admin Panel
          </div>
        </div>
      </div>

      {/* ── Nav Links ── */}
      <nav style={{
        flex: 1,
        padding: "var(--space-4) var(--space-3)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        overflow: "hidden",
      }}>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} className="sidebar-icon" style={{ flexShrink: 0 }} />
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Logout ── */}
      <div style={{
        padding: "var(--space-3) var(--space-3) var(--space-5)",
        borderTop: "1px solid rgba(178,166,213,0.12)",
        overflow: "hidden",
      }}>
        <button
          className="sidebar-item"
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          style={{ color: "#c0392b" }}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
