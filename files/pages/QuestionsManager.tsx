import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, AlertTriangle, BookOpen, HelpCircle, X } from "lucide-react";
import DataTable, { type Column } from "../components/DataTable";
import Modal from "../components/Modal";
import { FormInput } from "../components/FormInput";
import { quizService, adminService } from "../../services/services";

interface Module { _id: string; name: string; [key: string]: unknown }
interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswers: string[];
  moduleId?: string;
  createdAt?: string;
  [key: string]: unknown;
}

interface QuestionForm {
  questionText: string;
  options: string[];
  correctAnswer: string;
}
const EMPTY_FORM: QuestionForm = { questionText: "", options: ["", "", "", ""], correctAnswer: "" };

export default function QuestionsManager() {
  const [modules,        setModules]        = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [questions,      setQuestions]      = useState<Question[]>([]);
  const [loadingMods,    setLoadingMods]    = useState(true);
  const [loadingQs,      setLoadingQs]      = useState(false);

  const [addOpen,        setAddOpen]        = useState(false);
  const [editTarget,     setEditTarget]     = useState<Question | null>(null);
  const [deleteTarget,   setDeleteTarget]   = useState<Question | null>(null);

  const [form,           setForm]           = useState<QuestionForm>(EMPTY_FORM);
  const [errors,         setErrors]         = useState<Partial<Record<keyof QuestionForm, string>>>({});
  const [saving,         setSaving]         = useState(false);
  const [deleting,       setDeleting]       = useState(false);
  const [toast,          setToast]          = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  // ── Load modules ──
  useEffect(() => {
    async function load() {
      try {
        const res = await quizService.getModules();
        const data = res?.data ?? res;
        setModules(Array.isArray(data) ? data : []);
      } finally { setLoadingMods(false); }
    }
    load();
  }, []);

  // ── Load questions when module changes ──
  useEffect(() => {
    if (!selectedModule) { setQuestions([]); return; }
    async function load() {
      setLoadingQs(true);
      try {
        const res = await quizService.getQuestions(selectedModule._id);
        const data = res?.data ?? res;
        setQuestions(Array.isArray(data) ? data : []);
      } finally { setLoadingQs(false); }
    }
    load();
  }, [selectedModule]);

  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function setOption(i: number, val: string) {
    const opts = [...form.options];
    opts[i] = val;
    setForm({ ...form, options: opts });
  }

  function addOption()    { if (form.options.length < 8) setForm({ ...form, options: [...form.options, ""] }); }
  function removeOption(i: number) {
    if (form.options.length <= 2) return;
    const opts = form.options.filter((_, idx) => idx !== i);
    setForm({ ...form, options: opts, correctAnswer: form.correctAnswer === form.options[i] ? "" : form.correctAnswer });
  }

  function validate(): boolean {
    const e: Partial<Record<keyof QuestionForm, string>> = {};
    if (!form.questionText.trim())               e.questionText = "Question text is required";
    const filled = form.options.filter((o) => o.trim());
    if (filled.length < 2)                       e.options      = "At least 2 options are required";
    if (!form.correctAnswer.trim())              e.correctAnswer = "Correct answer is required";
    else if (!form.options.includes(form.correctAnswer)) e.correctAnswer = "Correct answer must match one of the options";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setErrors({});
    setAddOpen(true);
  }

  function openEdit(q: Question) {
    setEditTarget(q);
    setForm({
      questionText: q.questionText,
      options: q.options?.length ? [...q.options] : ["","","",""],
      correctAnswer: q.correctAnswers?.[0] ?? "",
    });
    setErrors({});
  }

  async function handleAdd() {
    if (!validate() || !selectedModule) return;
    setSaving(true);
    try {
      await adminService.addQuestion({
        questionText: form.questionText.trim(),
        options:      form.options.filter((o) => o.trim()),
        correctAnswers: [form.correctAnswer],
        moduleId:     selectedModule._id,
      });
      showToast("Question added!");
      setAddOpen(false);
      // reload
      const res = await quizService.getQuestions(selectedModule._id);
      setQuestions(Array.isArray(res?.data ?? res) ? (res?.data ?? res) : []);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(msg ?? "Failed to add question.", "err");
    } finally { setSaving(false); }
  }

  async function handleEdit() {
    if (!validate() || !editTarget) return;
    setSaving(true);
    try {
      await adminService.updateQuestion(editTarget._id, {
        questionText:  form.questionText.trim(),
        options:       form.options.filter((o) => o.trim()),
        correctAnswers: [form.correctAnswer],
      });
      showToast("Question updated!");
      setEditTarget(null);
      if (selectedModule) {
        const res = await quizService.getQuestions(selectedModule._id);
        setQuestions(Array.isArray(res?.data ?? res) ? (res?.data ?? res) : []);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(msg ?? "Failed to update question.", "err");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteQuestion(deleteTarget._id);
      showToast("Question deleted.");
      setDeleteTarget(null);
      setQuestions((prev) => prev.filter((q) => q._id !== deleteTarget._id));
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      showToast(msg ?? "Failed to delete question.", "err");
    } finally { setDeleting(false); }
  }

  const columns: Column<Question>[] = [
    {
      key: "questionText",
      label: "Question",
      sortable: true,
      render: (row) => (
        <span style={{ maxWidth: 340, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {row.questionText}
        </span>
      ),
    },
    {
      key: "options",
      label: "Options",
      render: (row) => (
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "var(--radius-md)", background: "rgba(74,64,224,0.08)", color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem" }}>
          {(row.options as string[] | undefined)?.length ?? 0}
        </span>
      ),
    },
    {
      key: "correctAnswers",
      label: "Correct Answer",
      render: (row) => (
        <span style={{
          display: "inline-block",
          padding: "2px 10px",
          borderRadius: "var(--radius-full)",
          background: "rgba(39,174,96,0.1)",
          color: "#27ae60",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          fontWeight: 600,
          maxWidth: 180,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {(row.correctAnswers as string[] | undefined)?.[0] ?? "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => <span className="muted">{row.createdAt ? new Date(row.createdAt as string).toLocaleDateString() : "—"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <button className="btn-icon" title="Edit" onClick={() => openEdit(row)}>
            <Pencil size={15} />
          </button>
          <button className="btn-icon" title="Delete" onClick={() => setDeleteTarget(row)} style={{ color: "#c0392b" }}>
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  /* ── Shared Question Form ── */
  function QuestionFormFields() {
    return (
      <>
        <FormInput
          label="Question Text"
          placeholder="e.g. What is the OSI model?"
          value={form.questionText}
          onChange={(e) => setForm({ ...form, questionText: e.target.value })}
          error={errors.questionText}
        />

        {/* Options */}
        <div className="form-group">
          <label className="form-label">Options</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {form.options.map((opt, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                <div style={{
                  width: 24, height: 24,
                  borderRadius: "var(--radius-full)",
                  background: opt === form.correctAnswer ? "var(--gradient-primary)" : "var(--surface-container-high)",
                  color: opt === form.correctAnswer ? "white" : "var(--on-surface-variant)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  value={opt}
                  onChange={(e) => setOption(i, e.target.value)}
                />
                {form.options.length > 2 && (
                  <button className="btn-icon" onClick={() => removeOption(i)} type="button" title="Remove option">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            {errors.options && <span className="form-error">{errors.options}</span>}
            {form.options.length < 8 && (
              <button type="button" className="btn-secondary" style={{ alignSelf: "flex-start", fontSize: "0.8rem", padding: "4px 14px" }} onClick={addOption}>
                + Add Option
              </button>
            )}
          </div>
        </div>

        {/* Correct Answer */}
        <div className="form-group">
          <label className="form-label">Correct Answer</label>
          <select
            className="form-select"
            value={form.correctAnswer}
            onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
          >
            <option value="">Select correct answer</option>
            {form.options.filter((o) => o.trim()).map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.correctAnswer && <span className="form-error">{errors.correctAnswer}</span>}
        </div>
      </>
    );
  }

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
          fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600,
          animation: "slideDown var(--transition-base) ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <h2 className="section-title">Questions</h2>
          <p className="section-sub">Select a module to manage its questions</p>
        </div>
        <button
          className="btn-primary"
          disabled={!selectedModule}
          onClick={openAdd}
        >
          <Plus size={17} /> Add Question
        </button>
      </div>

      {/* ── Module Selector ── */}
      <div style={{
        background: "var(--surface-container-lowest)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", color: "var(--primary)" }}>
          <BookOpen size={20} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>Module</span>
        </div>
        <select
          className="form-select"
          style={{ maxWidth: 320, flex: 1 }}
          value={selectedModule?._id ?? ""}
          onChange={(e) => {
            const m = modules.find((mod) => mod._id === e.target.value) ?? null;
            setSelectedModule(m);
          }}
          disabled={loadingMods}
        >
          <option value="">{loadingMods ? "Loading modules…" : "— Select a module —"}</option>
          {modules.map((m) => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>

        {selectedModule && (
          <span style={{
            padding: "4px 14px",
            borderRadius: "var(--radius-full)",
            background: "rgba(74,64,224,0.1)",
            color: "var(--primary)",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}>
            {questions.length} question{questions.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Module Context Label ── */}
      {selectedModule && (
        <div style={{
          display: "flex", alignItems: "center", gap: "var(--space-2)",
          padding: "var(--space-3) var(--space-4)",
          borderRadius: "var(--radius-md)",
          background: "rgba(74,64,224,0.05)",
          border: "1px solid rgba(74,64,224,0.1)",
        }}>
          <HelpCircle size={15} style={{ color: "var(--primary)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--on-surface-variant)" }}>
            Showing questions for module: <strong style={{ color: "var(--on-surface)" }}>{selectedModule.name}</strong>
          </span>
        </div>
      )}

      {/* ── Questions Table or Empty State ── */}
      {!selectedModule ? (
        <div className="surface-card">
          <div className="empty-state">
            <div className="empty-state-icon" style={{ width: 80, height: 80 }}>
              <HelpCircle size={36} />
            </div>
            <p className="empty-state-title">No module selected</p>
            <p className="empty-state-sub">Select a module from the dropdown above to view and manage its questions.</p>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={questions}
          loading={loadingQs}
          searchPlaceholder="Search questions…"
          emptyMessage="No questions found for this module. Add your first question!"
        />
      )}

      {/* ── Add Question Modal ── */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title={`Add Question${selectedModule ? ` — ${selectedModule.name}` : ""}`}
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd} disabled={saving}>
              {saving ? <><div className="spinner" /> Saving…</> : "Save Question"}
            </button>
          </>
        }
      >
        <QuestionFormFields />
      </Modal>

      {/* ── Edit Question Modal ── */}
      <Modal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Edit Question"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setEditTarget(null)}>Cancel</button>
            <button className="btn-primary" onClick={handleEdit} disabled={saving}>
              {saving ? <><div className="spinner" /> Saving…</> : "Update Question"}
            </button>
          </>
        }
      >
        <QuestionFormFields />
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Question"
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
          <div style={{ width: 56, height: 56, borderRadius: "var(--radius-full)", background: "#fde8e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle size={26} color="#c0392b" />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>Delete Question?</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--on-surface-variant)", lineHeight: 1.6 }}>
              This question will be permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
