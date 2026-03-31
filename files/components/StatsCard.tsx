import type { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  iconBg?: string;
}

export default function StatsCard({ label, value, icon, variant = "primary", iconBg }: StatsCardProps) {
  const bgMap = {
    primary:   "rgba(74,64,224,0.1)",
    secondary: "rgba(112,42,225,0.1)",
    tertiary:  "rgba(253,139,202,0.15)",
  };
  const colorMap = {
    primary:   "var(--primary)",
    secondary: "var(--secondary)",
    tertiary:  "#c0398a",
  };

  return (
    <div className={`stats-card ${variant}`}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          className="stats-icon"
          style={{ background: iconBg ?? bgMap[variant], color: colorMap[variant] }}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="stats-value">{value}</div>
        <div className="stats-label">{label}</div>
      </div>
    </div>
  );
}
