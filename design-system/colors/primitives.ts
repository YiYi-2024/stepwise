/**
 * 北极星设计规范 — Color Primitives
 * Source: Figma ❖ Token / Color Primitives (node 30:906)
 * https://www.figma.com/design/lHZQFXZ9mCxnwUxC50IgxL/?node-id=30-906
 */

export const base = {
  white: "#FFFFFF",
  black: "#000000",
} as const;

/** 中性色阶，用于文字、背景与边框 */
export const neutral = {
  100: "#F7F7F7",
  200: "#F3F3F3",
  300: "#F2F2F2",
  400: "#E7E7E7",
  500: "#C5C5C5",
  600: "#ADADAD",
  700: "#8A8A8A",
  800: "#383838",
  900: "#1D1D1D",
} as const;

/** 错误状态色（Figma: Red） */
export const red = {
  50: "#FFEFEF",
  100: "#FDDBDB",
  500: "#F64D4D",
} as const;

/** 品牌橙色 */
export const brand = {
  100: "#FFE0CF",
  500: "#F36B24",
} as const;

/** 成功状态色（Figma: Green） */
export const green = {
  100: "#DDFCDD",
  500: "#39AD37",
} as const;

/**
 * 深灰色，20% 不透明度，用于遮罩与蒙层
 * Hex with alpha: #38383833
 */
export const alpha = {
  500: "rgba(56, 56, 56, 0.2)",
  500Hex: "#38383833",
} as const;

export const primitives = {
  base,
  neutral,
  red,
  brand,
  green,
  alpha,
} as const;

export type ColorPrimitives = typeof primitives;
