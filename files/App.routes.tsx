/**
 * ============================================================
 *  App.tsx — Admin Route Additions
 *  QuizzApp (Matembo Tech)
 *
 *  ADD these imports to your existing App.tsx:
 * ============================================================
 */

// --- Imports to add ---
import AdminRouteGuard  from "./admin/components/AdminRouteGuard";
import AdminLayout      from "./admin/components/AdminLayout";
import AdminLogin       from "./admin/pages/AdminLogin";
import Dashboard        from "./admin/pages/Dashboard";
import ModulesManager   from "./admin/pages/ModulesManager";
import QuestionsManager from "./admin/pages/QuestionsManager";
import UsersManager     from "./admin/pages/UsersManager";
import "./admin/styles/admin.css";   // ← Luminous Scholar tokens

/**
 * ============================================================
 *  INSIDE your <Routes> block, add these route definitions.
 *  Place them alongside your existing public routes.
 *  Do NOT replace existing routes — only ADD these.
 * ============================================================
 *
 * <Routes>
 *   ...your existing routes (/, /login, /register, /quiz, etc.)...
 *
 *   ── Admin public route ──
 *   <Route path="/admin/login" element={<AdminLogin />} />
 *
 *   ── Admin protected routes ──
 *   <Route element={<AdminRouteGuard />}>
 *     <Route element={<AdminLayout />}>
 *       <Route path="/admin/dashboard"  element={<Dashboard />}        />
 *       <Route path="/admin/modules"    element={<ModulesManager />}   />
 *       <Route path="/admin/questions"  element={<QuestionsManager />} />
 *       <Route path="/admin/users"      element={<UsersManager />}     />
 *     </Route>
 *   </Route>
 * </Routes>
 *
 * ============================================================
 *  FULL example App.tsx (minimal, merge with your own):
 * ============================================================
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Your existing routes stay here ── */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* etc… */}

        {/* ── Admin: Public ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Admin: Protected (isAdmin: true gate) ── */}
        <Route element={<AdminRouteGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard"  element={<Dashboard />}        />
            <Route path="/admin/modules"    element={<ModulesManager />}   />
            <Route path="/admin/questions"  element={<QuestionsManager />} />
            <Route path="/admin/users"      element={<UsersManager />}     />
          </Route>
        </Route>

        {/* Redirect bare /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
