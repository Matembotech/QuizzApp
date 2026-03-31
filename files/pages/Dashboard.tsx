import { useEffect, useState } from "react";
import { BookOpen, HelpCircle, Users, Clock, PlusCircle, RefreshCw, UserPlus } from "lucide-react";
import StatsCard from "../components/StatsCard";
import { quizService } from "../../services/services";

interface ActivityItem {
  icon: React.ReactNode;
  color: string;
  bg: string;
  text: string;
  time: string;
}

export default function Dashboard() {
  const [moduleCount,   setModuleCount]   = useState<number | "—">("—");
  const [questionCount, setQuestionCount] = useState<number | "—">("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [mods, qs] = await Promise.allSettled([
          quizService.getModules(),
          quizService.getQuestions(),
        ]);

        if (mods.status === "fulfilled") {
          const data = mods.value?.data ?? mods.value;
          setModuleCount(Array.isArray(data) ? data.length : 0);
        }
        if (qs.status === "fulfilled") {
          const data = qs.value?.data ?? qs.value;
          setQuestionCount(Array.isArray(data) ? data.length : 0);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const activity: ActivityItem[] = [
    { icon: <PlusCircle size={15} />,   color: "var(--primary)",   bg: "rgba(74,64,224,0.1)",   text: "New module added",           time: "2 min ago"  },
    { icon: <RefreshCw size={15} />,    color: "var(--secondary)", bg: "rgba(112,42,225,0.1)",  text: "Question updated",           time: "18 min ago" },
    { icon: <UserPlus size={15} />,     color: "#27ae60",          bg: "rgba(39,174,96,0.1)",   text: "New user registered",        time: "1 hr ago"   },
    { icon: <PlusCircle size={15} />,   color: "var(--primary)",   bg: "rgba(74,64,224,0.1)",   text: "Module: Data Comms added",   time: "3 hr ago"   },
    { icon: <RefreshCw size={15} />,    color: "var(--secondary)", bg: "rgba(112,42,225,0.1)",  text: "5 questions updated",        time: "Yesterday"  },
  ];

  const messages = [
    { from: "John Mwangi",   preview: "When will the next quiz set be available?",    time: "10 min"  },
    { from: "Aisha Hassan",  preview: "I found a typo in the OS module questions.",   time: "45 min"  },
    { from: "David Kimani",  preview: "Can we get more practice questions for…",      time: "2 hr"    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        borderRadius: "var(--radius-xl)",
        background: "var(--gradient-primary)",
        padding: "var(--space-6) var(--space-8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "var(--space-4)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -20, right: 80, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "white", letterSpacing: "-0.02em", marginBottom: 4 }}>
            Welcome back, Admin 👋
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)" }}>
            Here's what's happening in QuizzApp today.
          </p>
        </div>
        <div style={{
          padding: "8px 18px",
          borderRadius: "var(--radius-full)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <Clock size={15} />
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* ── Stats ── */}
      <section>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)" }}>
          Overview
        </h3>
        <div className="grid-3">
          <StatsCard
            label="Total Modules"
            value={loading ? "…" : moduleCount}
            icon={<BookOpen size={22} />}
            variant="primary"
          />
          <StatsCard
            label="Total Questions"
            value={loading ? "…" : questionCount}
            icon={<HelpCircle size={22} />}
            variant="secondary"
          />
          <StatsCard
            label="Total Users"
            value="—"
            icon={<Users size={22} />}
            variant="tertiary"
          />
        </div>
      </section>

      {/* ── Activity + Messages ── */}
      <div className="grid-2" style={{ alignItems: "start" }}>

        {/* Recent Activity */}
        <section>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)" }}>
            Recent Activity
          </h3>
          <div className="surface-card">
            {activity.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                padding: "var(--space-4) var(--space-5)",
                borderBottom: i < activity.length - 1 ? "1px solid rgba(178,166,213,0.12)" : "none",
              }}>
                <div style={{
                  width: 34, height: 34,
                  borderRadius: "var(--radius-md)",
                  background: item.bg,
                  color: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, color: "var(--on-surface)" }}>
                    {item.text}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--on-surface-variant)", whiteSpace: "nowrap" }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Messages Preview */}
        <section>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)" }}>
            Messages
          </h3>
          <div className="surface-card">
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--space-3)",
                padding: "var(--space-4) var(--space-5)",
                borderBottom: i < messages.length - 1 ? "1px solid rgba(178,166,213,0.12)" : "none",
                cursor: "pointer",
                transition: "background var(--transition-fast)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-container-low)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{
                  width: 36, height: 36,
                  borderRadius: "var(--radius-full)",
                  background: "var(--surface-container-high)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  flexShrink: 0,
                }}>
                  {msg.from.slice(0,2).toUpperCase()}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "var(--on-surface)" }}>
                      {msg.from}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--on-surface-variant)" }}>
                      {msg.time}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--on-surface-variant)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {msg.preview}
                  </p>
                </div>
                {/* Unread dot */}
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--tertiary-container)", flexShrink: 0, marginTop: 6 }} />
              </div>
            ))}

            <div style={{ padding: "var(--space-3) var(--space-5)", borderTop: "1px solid rgba(178,166,213,0.12)" }}>
              <button style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "0.85rem",
                color: "var(--primary)", fontWeight: 600, padding: 0,
              }}>
                View all messages →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
