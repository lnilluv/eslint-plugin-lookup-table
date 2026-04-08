export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
export type ConsoleMethod = "log" | "debug" | "info" | "warn" | "error";

export interface LogLevelConfig {
  severity: number;
  consoleMethod: ConsoleMethod;
  ansiColor: string;
  captureStackTrace: boolean;
}

const LOG_LEVEL_CONFIG: Record<LogLevel, LogLevelConfig> = {
  trace: {
    severity: 10,
    consoleMethod: "debug",
    ansiColor: "\u001b[90m",
    captureStackTrace: false,
  },
  debug: {
    severity: 20,
    consoleMethod: "debug",
    ansiColor: "\u001b[36m",
    captureStackTrace: false,
  },
  info: {
    severity: 30,
    consoleMethod: "info",
    ansiColor: "\u001b[32m",
    captureStackTrace: false,
  },
  warn: {
    severity: 40,
    consoleMethod: "warn",
    ansiColor: "\u001b[33m",
    captureStackTrace: false,
  },
  error: {
    severity: 50,
    consoleMethod: "error",
    ansiColor: "\u001b[31m",
    captureStackTrace: true,
  },
  fatal: {
    severity: 60,
    consoleMethod: "error",
    ansiColor: "\u001b[35m",
    captureStackTrace: true,
  },
};

export function getLogLevelConfig(level: LogLevel): LogLevelConfig {
  return LOG_LEVEL_CONFIG[level];
}
