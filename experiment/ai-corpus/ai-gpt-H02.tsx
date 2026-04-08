import React from "react";

export type Severity = "info" | "warning" | "error" | "success";

interface StatusBadgeProps {
  severity: Severity;
  children: React.ReactNode;
}

interface SeverityStyle {
  backgroundColor: string;
  color: string;
  icon: string;
}

const severityStyles: Record<Severity, SeverityStyle> = {
  info: { backgroundColor: "#e0f0ff", color: "#0056b3", icon: "ℹ️" },
  warning: { backgroundColor: "#fff8e1", color: "#8a6d00", icon: "⚠️" },
  error: { backgroundColor: "#fdecea", color: "#b71c1c", icon: "❌" },
  success: { backgroundColor: "#e8f5e9", color: "#1b5e20", icon: "✅" },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ severity, children }) => {
  const style = severityStyles[severity];

  return (
    <span
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.875rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span role="img" aria-label={severity}>{style.icon}</span>
      {children}
    </span>
  );
};
