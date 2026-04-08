export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface BreakpointConfig {
  minWidthPx: number;
  maxWidthPx: number;
  defaultGridColumns: number;
  recommendedGutterPx: number;
}

export function getBreakpointConfig(name: BreakpointName): BreakpointConfig {
  switch (name) {
    case "xs":
      return {
        minWidthPx: 0,
        maxWidthPx: 479,
        defaultGridColumns: 4,
        recommendedGutterPx: 8,
      };
    case "sm":
      return {
        minWidthPx: 480,
        maxWidthPx: 639,
        defaultGridColumns: 4,
        recommendedGutterPx: 12,
      };
    case "md":
      return {
        minWidthPx: 640,
        maxWidthPx: 767,
        defaultGridColumns: 8,
        recommendedGutterPx: 16,
      };
    case "lg":
      return {
        minWidthPx: 768,
        maxWidthPx: 1023,
        defaultGridColumns: 12,
        recommendedGutterPx: 24,
      };
    case "xl":
      return {
        minWidthPx: 1024,
        maxWidthPx: 1279,
        defaultGridColumns: 12,
        recommendedGutterPx: 24,
      };
    case "2xl":
      return {
        minWidthPx: 1280,
        maxWidthPx: Infinity,
        defaultGridColumns: 12,
        recommendedGutterPx: 32,
      };
  }
}
