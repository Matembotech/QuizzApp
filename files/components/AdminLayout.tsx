import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    if (window.innerWidth <= 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(50,41,79,0.35)",
            backdropFilter: "blur(4px)",
            zIndex: 45,
          }}
        />
      )}

      <div className={`admin-shell ${collapsed ? "collapsed" : ""}`}>
        <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} />
        <Header onToggleSidebar={toggleSidebar} />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
