import React from "react";

export type StatusSeverity = "info" | "warning" | "error" | "success";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  severity: StatusSeverity;
  children?: React.ReactNode;
}

interface BadgeStyleConfig {
  icon: string;
  backgroundColor: string;
  textColor: string;
  fallbackLabel: string;
}

const SEVERITY_STYLES: Record<StatusSeverity, BadgeStyleConfig> = {
  info: {
    icon: "ℹ️",
    backgroundColor: "#e0f2fe",
    textColor: "#075985",
    fallbackLabel: "Info",
  },
  warning: {
    icon: "⚠️",
    backgroundColor: "#fef3c7",
    textColor: "#92400e",
    fallbackLabel: "Warning",
  },
  error: {
    icon: "❌",
    backgroundColor: "#fee2e2",
    textColor: "#991b1b",
    fallbackLabel: "Error",
  },
  success: {
    icon: "✅",
    backgroundColor: "#dcfce7",
    textColor: "#166534",
    fallbackLabel: "Success",
  },
};

export function StatusBadge({ severity, children, style, ...rest }: StatusBadgeProps): JSX.Element {
  const config = SEVERITY_STYLES[severity];
  const label = children ?? config.fallbackLabel;

  return (
    <span
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        lineHeight: 1,
        borderRadius: 9999,
        padding: "0.3rem 0.55rem",
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        ...style,
      }}
    >
      <span aria-hidden="true">{config.icon}</span>
      <span>{label}</span>
    </span>
  );
}

export default StatusBadge;
