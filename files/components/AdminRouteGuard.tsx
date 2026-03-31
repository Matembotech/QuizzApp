import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface StoredUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

type GuardState = "loading" | "admin" | "not-admin" | "no-token";

export default function AdminRouteGuard() {
  const [state, setState] = useState<GuardState>("loading");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const raw   = localStorage.getItem("adminUser");

    if (!token || !raw) {
      setState("no-token");
      return;
    }

    try {
      const user: StoredUser = JSON.parse(raw);
      setState(user.isAdmin ? "admin" : "not-admin");
    } catch {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setState("no-token");
    }
  }, []);

  if (state === "loading") {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
      }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: "var(--radius-full)",
            background: "var(--gradient-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div className="spinner" />
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>
            Verifying access…
          </p>
        </div>
      </div>
    );
  }

  if (state === "no-token")  return <Navigate to="/admin/login" replace />;
  if (state === "not-admin") return <Navigate to="/login" replace state={{ message: "Access denied. Admin privileges required." }} />;

  return <Outlet />;
}
