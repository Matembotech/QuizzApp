import { Users, Construction } from "lucide-react";

export default function UsersManager() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Users</h2>
          <p className="section-sub">Manage registered users</p>
        </div>
      </div>

      {/* Placeholder Card */}
      <div style={{
        background: "var(--surface-container-lowest)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
      }}>
        {/* Banner */}
        <div style={{
          background: "var(--gradient-primary)",
          padding: "var(--space-8) var(--space-6)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{
            width: 72, height: 72,
            borderRadius: "var(--radius-xl)",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto var(--space-5)",
          }}>
            <Users size={34} color="white" />
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}>
            Users Management
          </h3>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.75)",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            This module is currently unavailable while the backend user endpoints are being developed.
          </p>
        </div>

        {/* Status body */}
        <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "#f39c12",
              boxShadow: "0 0 6px rgba(243,156,18,0.5)",
            }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#f39c12",
            }}>
              Backend endpoints pending
            </span>
          </div>

          {/* Pending endpoints */}
          <div style={{
            width: "100%",
            maxWidth: 480,
            background: "var(--surface-container-low)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-5)",
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--on-surface-variant)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "var(--space-4)",
            }}>
              Required Endpoints
            </p>
            {[
              { method: "GET",    path: "/users",            note: "List all users"  },
              { method: "PUT",    path: "/users/update/:id", note: "Edit user role"  },
              { method: "DELETE", path: "/users/delete/:id", note: "Delete user"     },
            ].map(({ method, path, note }) => (
              <div key={path} style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3) 0",
                borderBottom: "1px solid rgba(178,166,213,0.12)",
              }}>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  background: method === "GET"
                    ? "rgba(74,64,224,0.1)"
                    : method === "PUT"
                    ? "rgba(112,42,225,0.1)"
                    : "rgba(192,57,43,0.1)",
                  color: method === "GET"
                    ? "var(--primary)"
                    : method === "PUT"
                    ? "var(--secondary)"
                    : "#c0392b",
                  minWidth: 52,
                  textAlign: "center",
                }}>
                  {method}
                </span>
                <code style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "var(--on-surface)", flex: 1 }}>
                  {path}
                </code>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--on-surface-variant)" }}>
                  {note}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-lg)",
            background: "rgba(74,64,224,0.05)",
            border: "1px solid rgba(74,64,224,0.12)",
            maxWidth: 480,
            width: "100%",
          }}>
            <Construction size={17} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--on-surface-variant)", lineHeight: 1.5 }}>
              Once these endpoints are available on the backend, this page will automatically activate with full CRUD capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
