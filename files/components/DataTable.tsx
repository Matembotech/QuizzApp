import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loading?: boolean;
}

type SortDir = "asc" | "desc" | null;

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 8,
  searchPlaceholder = "Search…",
  emptyMessage = "No records found.",
  loading = false,
}: DataTableProps<T>) {
  const [query, setQuery]     = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage]       = useState(1);

  // ── Filter ──
  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, query]);

  // ── Sort ──
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "").toLowerCase();
      const bv = String(b[sortKey] ?? "").toLowerCase();
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ── Paginate ──
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc")  setSortDir("desc");
    else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
  }

  function handleSearch(val: string) {
    setQuery(val);
    setPage(1);
  }

  function SortIcon({ col }: { col: Column<T> }) {
    if (!col.sortable) return null;
    const k = String(col.key);
    if (sortKey !== k) return <ChevronsUpDown size={13} style={{ opacity: 0.4 }} />;
    return sortDir === "asc"
      ? <ChevronUp size={13} style={{ color: "var(--primary)" }} />
      : <ChevronDown size={13} style={{ color: "var(--primary)" }} />;
  }

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-4)", flexWrap: "wrap", gap: "var(--space-3)" }}>
        <div className="search-wrap">
          <Search size={15} />
          <input
            className="search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrap">
        {loading ? (
          <div style={{ padding: "var(--space-10)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)" }}>
            <div style={{ width: 24, height: 24, border: "3px solid var(--surface-container-high)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            <span style={{ fontFamily: "var(--font-body)", color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>Loading…</span>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                    style={{ cursor: col.sortable ? "pointer" : "default" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {col.label}
                      <SortIcon col={col} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="empty-state" style={{ padding: "var(--space-8)" }}>
                      <div className="empty-state-icon">
                        <Search size={28} />
                      </div>
                      <p className="empty-state-title">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={String(col.key)}>
                        {col.render
                          ? col.render(row)
                          : String(row[col.key as keyof T] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${p === page ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
