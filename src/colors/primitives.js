/**
 * 北极星 · Color Primitives
 * Source: Figma `_primitives` collection
 */

/** @typedef {{ hex: string, rgba?: string, description?: string }} ColorPrimitive */

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const base = Object.freeze({
  white: { hex: '#FFFFFF', description: '基础纯白' },
  black: { hex: '#000000', description: '基础纯黑' },
});

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const neutral = Object.freeze({
  100: { hex: '#F7F7F7', description: '中性色阶 100' },
  200: { hex: '#F3F3F3', description: '中性色阶 200' },
  300: { hex: '#F2F2F2', description: '中性色阶 300' },
  400: { hex: '#E7E7E7', description: '中性色阶 400' },
  500: { hex: '#C5C5C5', description: '中性色阶 500' },
  600: { hex: '#ADADAD', description: '中性色阶 600' },
  700: { hex: '#8A8A8A', description: '中性色阶 700' },
  800: { hex: '#383838', description: '中性色阶 800' },
  900: { hex: '#1D1D1D', description: '中性色阶 900' },
});

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const red = Object.freeze({
  50: { hex: '#FFEFEF', description: '错误原始色 50' },
  100: { hex: '#FDDBDB', description: '错误原始色 100' },
  500: { hex: '#F64D4D', description: '错误原始色 500' },
});

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const brand = Object.freeze({
  100: { hex: '#FFE0CF', description: '品牌橙色 100' },
  500: { hex: '#F36B24', description: '品牌橙色 500' },
});

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const green = Object.freeze({
  100: { hex: '#DDFCDD', description: '成功原始色 100' },
  500: { hex: '#39AD37', description: '成功原始色 500' },
});

/** @type {Readonly<Record<string, ColorPrimitive>>} */
export const alpha = Object.freeze({
  500: {
    hex: '#38383833',
    rgba: 'rgba(56, 56, 56, 0.2)',
    description: '深灰 20% 不透明度，用于遮罩与蒙层',
  },
});

/** Flat map: `Base/White` → hex (matches Figma variable names) */
export const primitiveByFigmaName = Object.freeze({
  'Base/White': base.white.hex,
  'Base/Black': base.black.hex,
  'Neutral/100': neutral[100].hex,
  'Neutral/200': neutral[200].hex,
  'Neutral/300': neutral[300].hex,
  'Neutral/400': neutral[400].hex,
  'Neutral/500': neutral[500].hex,
  'Neutral/600': neutral[600].hex,
  'Neutral/700': neutral[700].hex,
  'Neutral/800': neutral[800].hex,
  'Neutral/900': neutral[900].hex,
  'Red/50': red[50].hex,
  'Red/100': red[100].hex,
  'Red/500': red[500].hex,
  'Brand/100': brand[100].hex,
  'Brand/500': brand[500].hex,
  'Green/100': green[100].hex,
  'Green/500': green[500].hex,
  'Alpha/500': alpha[500].hex,
});

export const primitives = Object.freeze({
  base,
  neutral,
  red,
  brand,
  green,
  alpha,
});

export default primitives;
