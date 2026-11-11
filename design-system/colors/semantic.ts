/**
 * 北极星设计规范 — Semantic Colors
 * Source: Figma ❖ Token / Semantic Colors (node 30:1254)
 * https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/?node-id=30-1254
 *
 * Semantic tokens alias Color Primitives. Prefer semantic tokens in UI code.
 */

import { alpha, base, brand, green, neutral, red } from "./primitives";

/** Text colors for typography and labels */
export const text = {
  primary: neutral[800],
  /** Figma layer typo: Text/Seconday */
  secondary: neutral[700],
  tertiary: neutral[600],
  subtle: neutral[500],
  brand: brand[500],
  accent: neutral[900],
} as const;

/** Hover states for interactive elements */
export const hover = {
  subtle: neutral[100],
  default: neutral[300],
  strongOnBg: neutral[400],
} as const;

/** Background colors for surfaces */
export const background = {
  /** Figma variable: Background/Grey; swatch label: Main */
  main: neutral[100],
  grey: neutral[100],
  white: base.white,
} as const;

/** Border colors for dividers and outlines */
export const border = {
  primary: neutral[400],
  secondary: neutral[200],
  brand: brand[100],
} as const;

/** Error states for validation and alerts */
export const error = {
  primary: red[500],
  secondary: red[100],
  tertiary: red[50],
} as const;

/** Overlay masks for modal backgrounds */
export const mask = {
  primary: alpha[500],
  primaryHex: alpha[500Hex],
} as const;

/** Success states for positive feedback */
export const success = {
  primary: green[500],
  secondary: green[100],
} as const;

export const semantic = {
  text,
  hover,
  background,
  border,
  error,
  mask,
  success,
} as const;

/** Explicit primitive → semantic alias map for docs / tooling */
export const semanticAliases = {
  "text/primary": "neutral/800",
  "text/secondary": "neutral/700",
  "text/tertiary": "neutral/600",
  "text/subtle": "neutral/500",
  "text/brand": "brand/500",
  "text/accent": "neutral/900",
  "hover/subtle": "neutral/100",
  "hover/default": "neutral/300",
  "hover/strong-on-bg": "neutral/400",
  "background/main": "neutral/100",
  "background/grey": "neutral/100",
  "background/white": "base/white",
  "border/primary": "neutral/400",
  "border/secondary": "neutral/200",
  "border/brand": "brand/100",
  "error/primary": "red/500",
  "error/secondary": "red/100",
  "error/tertiary": "red/50",
  "mask/primary": "alpha/500",
  "success/primary": "green/500",
  "success/secondary": "green/100",
} as const;

export type SemanticColors = typeof semantic;
