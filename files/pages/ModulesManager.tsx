import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, BookOpen, AlertTriangle } from "lucide-react";
import DataTable, { type Column } from "../components/DataTable";
import Modal from "../components/Modal";
import { FormInput, FormTextarea, SelectDropdown } from "../components/FormInput";
import { quizService, adminService } from "../../services/services";

interface Module {
  _id: string;
  name: string;
  year: string | number;
  semester: string;
  description?: string;
  questionCount?: number;
  createdAt?: string;
  [key: string]: unknown;
}

interface ModuleForm { name: string; year: string; semester: string; description: string }
const EMPTY_FORM: ModuleForm = { name: "", year: "", semester: "", description: "" };

const YEARS    = ["1","2","3","4"].map((v) => ({ value: v, label: `Year ${v}` }));
const SEMESTERS = [
  { value: "I",   label: "Semester I"   },
  { value: "II",  label: "Semester II"  },
  { value: "III", label: "Semester III" },
];

export default function ModulesManager() {
  const [modules,   setModules]   = useState<Module[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [addOpen,   setAddOpen]   = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Module | null>(null);
  const [form,      setForm]      = useState<ModuleForm>(EMPTY_FORM);
  const [errors,    setErrors]    = useState<Partial<ModuleForm>>({});
  const [saving,    setSaving]    = useState(false);
  const [deleting,  setDeleting]  = useState(false);
  const [toast,     setToast]     = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await quizService.getModules();
      const data = res?.data ?? res;
      setModules(Array.isArray(data) ? data : []);
    } catch { setModules([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function validate(): boolean {
    const e: Partial<ModuleForm> = {};
    if (!form.name.trim())     e.name     = "Module name is required";
    if (!form.year)            e.year     = "Year is required";
    if (!form.semester)        e.semester = "Semester is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleAdd() {
    if (!validate()) return;
    setSaving(true);
    try {
      await adminService.addModule({
        name:        form.name.trim(),
        year:        form.year,
        semester:    form.semester,
        description: form.description.trim(),
      });
      showToast("Module added successfully!");
      setAddOpen(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(msg ?? "Failed to add module.", "err");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteModule(deleteTarget._id);
      showToast("Module deleted.");
      setDeleteTarget(null);
      load();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(msg ?? "Failed to delete module.", "err");
    } finally { setDeleting(false); }
  }

  const columns: Column<Module>[] = [
    { key: "name",          label: "Module Name", sortable: true },
    { key: "year",          label: "Year",        sortable: true },
    { key: "semester",      label: "Semester",    sortable: true },
    {
      key: "questionCount",
      label: "Questions",
      render: (row) => (
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28,
          borderRadius: "var(--radius-md)",
          background: "rgba(74,64,224,0.08)",
          color: "var(--primary)",
          fontWeight: 700,
          fontSize: "0.85rem",
        }}>
          {(row.questionCount as number | undefined) ?? "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => (
        <span className="muted">
          {row.createdAt ? new Date(row.createdAt as string).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <button className="btn-icon" title="Edit (coming soon)" disabled style={{ opacity: 0.35 }}>
            <Pencil size={15} />
          </button>
          <button
            className="btn-icon"
            title="Delete"
            onClick={() => setDeleteTarget(row)}
            style={{ color: "#c0392b" }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 80, right: "var(--space-6)", zIndex: 200,
          padding: "var(--space-3) var(--space-5)",
          borderRadius: "var(--radius-lg)",
          background: toast.type === "ok" ? "var(--surface-container-lowest)" : "#fde8e8",
          boxShadow: "var(--shadow-modal)",
          border: `1px solid ${toast.type === "ok" ? "rgba(74,64,224,0.2)" : "rgba(192,57,43,0.2)"}`,
          color: toast.type === "ok" ? "var(--primary)" : "#c0392b",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          fontWeight: 600,
          animation: "slideDown var(--transition-base) ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Modules</h2>
          <p className="section-sub">Manage all quiz modules</p>
        </div>
        <button className="btn-primary" onClick={() => { setForm(EMPTY_FORM); setErrors({}); setAddOpen(true); }}>
          <Plus size={17} /> Add Module
        </button>
      </div>

      {/* ── Table ── */}
      <DataTable
        columns={columns}
        data={modules}
        loading={loading}
        searchPlaceholder="Search modules…"
        emptyMessage="No modules found. Add your first module!"
      />

      {/* ── Add Modal ── */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add New Module"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd} disabled={saving}>
              {saving ? <><div className="spinner" /> Saving…</> : "Save Module"}
            </button>
          </>
        }
      >
        <FormInput
          label="Module Name"
          placeholder="e.g. Data Communications"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
        />
        <div className="grid-2" style={{ gap: "var(--space-4)" }}>
          <SelectDropdown
            label="Year of Study"
            options={YEARS}
            placeholder="Select year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            error={errors.year}
          />
          <SelectDropdown
            label="Semester"
            options={SEMESTERS}
            placeholder="Select semester"
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
            error={errors.semester}
          />
        </div>
        <FormTextarea
          label="Description (optional)"
          placeholder="Brief description of the module…"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Module"
        size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button className="btn-danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? <><div className="spinner" style={{ borderTopColor: "#c0392b" }} /> Deleting…</> : <><Trash2 size={15} /> Delete</>}
            </button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)", textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "var(--radius-full)",
            background: "#fde8e8",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <AlertTriangle size={26} color="#c0392b" />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
              Are you sure?
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--on-surface-variant)", lineHeight: 1.6 }}>
              You are about to delete <strong>{deleteTarget?.name}</strong>. This action cannot be undone. All associated questions will also be affected.
            </p>
          </div>
        </div>
      </Modal>

      {/* Edit disabled notice */}
      <div style={{
        display: "flex", alignItems: "center", gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-5)",
        borderRadius: "var(--radius-lg)",
        background: "rgba(74,64,224,0.05)",
        border: "1px solid rgba(74,64,224,0.12)",
      }}>
        <BookOpen size={17} style={{ color: "var(--primary)", flexShrink: 0 }} />
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>
          <strong style={{ color: "var(--primary)" }}>Note:</strong> Module editing is disabled — the <code>/modules/update/:id</code> endpoint is pending on the backend.
        </p>
      </div>
    </div>
  );
}
