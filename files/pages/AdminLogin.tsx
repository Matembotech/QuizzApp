import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ShieldCheck, AlertCircle } from "lucide-react";
import { authService } from "../../services/services";
import "../styles/admin.css";

interface FieldErrors { email?: string; password?: string }

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading]   = useState(false);

  function validate(): boolean {
    const e: FieldErrors = {};
    if (!email.trim())    e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password.trim()) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setApiError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const { user, token } = res.data ?? res;          // handle both shapes

      if (!user?.isAdmin) {
        setApiError("You are not authorized to access the admin dashboard.");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser",  JSON.stringify(user));
      navigate("/admin/dashboard");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setApiError(msg ?? "Login failed. Check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-bg">
      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>

        {/* ── Login Card ── */}
        <div className="admin-login-card">

          {/* ── Gradient Top ── */}
          <div className="admin-login-top">
            {/* Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-4)" }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={28} color="white" fill="white" />
              </div>
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "white",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}>
              QuizzApp Admin
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.75)",
            }}>
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* ── Form Body ── */}
          <form className="admin-login-body" onSubmit={handleSubmit} noValidate>

            {/* API Error */}
            {apiError && (
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-3)",
                padding: "var(--space-4)",
                borderRadius: "var(--radius-md)",
                background: "#fde8e8",
                border: "1px solid rgba(192,57,43,0.2)",
              }}>
                <AlertCircle size={18} style={{ color: "#c0392b", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#c0392b", lineHeight: 1.5 }}>
                  {apiError}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="admin@quizzapp.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                autoComplete="email"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                  autoComplete="current-password"
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)" }}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {/* Forgot */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -8 }}>
              <button type="button" style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "0.85rem",
                color: "var(--primary)", fontWeight: 600,
              }}>
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "0.875rem" }}>
              {loading ? (
                <><div className="spinner" /> Signing in…</>
              ) : (
                <><ShieldCheck size={18} /> Login as Admin</>
              )}
            </button>
          </form>
        </div>

        {/* ── Footer ── */}
        <p style={{
          textAlign: "center",
          marginTop: "var(--space-5)",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "var(--on-surface-variant)",
        }}>
          © {new Date().getFullYear()} Matembo Tech · QuizzApp Admin
        </p>
      </div>
    </div>
  );
}
