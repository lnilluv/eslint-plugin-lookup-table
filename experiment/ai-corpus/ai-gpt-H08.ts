export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export interface LogLevelConfig {
  severity: number;
  consoleMethod: string;
  ansiColor: string;
  captureStackTrace: boolean;
}

export function getLogLevelConfig(level: LogLevel): LogLevelConfig {
  switch (level) {
    case "trace":
      return {
        severity: 10,
        consoleMethod: "debug",
        ansiColor: "\x1b[90m",
        captureStackTrace: false,
      };
    case "debug":
      return {
        severity: 20,
        consoleMethod: "debug",
        ansiColor: "\x1b[36m",
        captureStackTrace: false,
      };
    case "info":
      return {
        severity: 30,
        consoleMethod: "info",
        ansiColor: "\x1b[32m",
        captureStackTrace: false,
      };
    case "warn":
      return {
        severity: 40,
        consoleMethod: "warn",
        ansiColor: "\x1b[33m",
        captureStackTrace: false,
      };
    case "error":
      return {
        severity: 50,
        consoleMethod: "error",
        ansiColor: "\x1b[31m",
        captureStackTrace: true,
      };
    case "fatal":
      return {
        severity: 60,
        consoleMethod: "error",
        ansiColor: "\x1b[35m",
        captureStackTrace: true,
      };
  }
}
