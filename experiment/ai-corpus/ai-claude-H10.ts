export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface BreakpointConfig {
  minWidthPx: number;
  maxWidthPx: number | null;
  defaultGridColumns: number;
  recommendedGutterPx: number;
}

const BREAKPOINTS: Record<BreakpointName, BreakpointConfig> = {
  xs: {
    minWidthPx: 0,
    maxWidthPx: 575,
    defaultGridColumns: 4,
    recommendedGutterPx: 12,
  },
  sm: {
    minWidthPx: 576,
    maxWidthPx: 767,
    defaultGridColumns: 8,
    recommendedGutterPx: 16,
  },
  md: {
    minWidthPx: 768,
    maxWidthPx: 991,
    defaultGridColumns: 12,
    recommendedGutterPx: 16,
  },
  lg: {
    minWidthPx: 992,
    maxWidthPx: 1199,
    defaultGridColumns: 12,
    recommendedGutterPx: 20,
  },
  xl: {
    minWidthPx: 1200,
    maxWidthPx: 1535,
    defaultGridColumns: 12,
    recommendedGutterPx: 24,
  },
  "2xl": {
    minWidthPx: 1536,
    maxWidthPx: null,
    defaultGridColumns: 12,
    recommendedGutterPx: 24,
  },
};

export function getBreakpointConfig(name: BreakpointName): BreakpointConfig {
  return BREAKPOINTS[name];
}
