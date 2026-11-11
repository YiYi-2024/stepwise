/**
 * 北极星 · Semantic Colors
 * Source: Figma `color` collection (aliases → `_primitives`)
 */

import {
  alpha,
  base,
  brand,
  green,
  neutral,
  red,
} from './primitives.js';

/**
 * @typedef {{
 *   hex: string,
 *   rgba?: string,
 *   alias: string,
 *   description?: string
 * }} SemanticColor
 */

/** @type {Readonly<Record<string, SemanticColor>>} */
export const text = Object.freeze({
  primary: {
    hex: neutral[800].hex,
    alias: 'Neutral/800',
    description: '主要文字',
  },
  secondary: {
    hex: neutral[700].hex,
    alias: 'Neutral/700',
    description: '次要文字',
  },
  tertiary: {
    hex: neutral[600].hex,
    alias: 'Neutral/600',
    description: '三级文字',
  },
  subtle: {
    hex: neutral[500].hex,
    alias: 'Neutral/500',
    description: '弱化文字',
  },
  brand: {
    hex: brand[500].hex,
    alias: 'Brand/500',
    description: '品牌色文字',
  },
  accent: {
    hex: neutral[900].hex,
    alias: 'Neutral/900',
    description: '强调文字',
  },
  white: {
    hex: base.white.hex,
    alias: 'Base/White',
    description: '反白文字',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const hover = Object.freeze({
  subtle: {
    hex: neutral[100].hex,
    alias: 'Neutral/100',
    description: '轻量悬停',
  },
  default: {
    hex: neutral[300].hex,
    alias: 'Neutral/300',
    description: '默认悬停',
  },
  strongOnBg: {
    hex: neutral[400].hex,
    alias: 'Neutral/400',
    description: '背景上的强悬停',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const background = Object.freeze({
  main: {
    hex: neutral[100].hex,
    alias: 'Neutral/100',
    description: '主背景（灰）',
  },
  white: {
    hex: base.white.hex,
    alias: 'Base/White',
    description: '白色表面',
  },
  black: {
    hex: neutral[800].hex,
    alias: 'Neutral/800',
    description: '深色表面',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const border = Object.freeze({
  primary: {
    hex: neutral[400].hex,
    alias: 'Neutral/400',
    description: '主边框',
  },
  secondary: {
    hex: neutral[200].hex,
    alias: 'Neutral/200',
    description: '次边框',
  },
  brand: {
    hex: brand[100].hex,
    alias: 'Brand/100',
    description: '品牌边框',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const error = Object.freeze({
  primary: {
    hex: red[500].hex,
    alias: 'Red/500',
    description: '错误主色',
  },
  secondary: {
    hex: red[100].hex,
    alias: 'Red/100',
    description: '错误次色',
  },
  tertiary: {
    hex: red[50].hex,
    alias: 'Red/50',
    description: '错误浅色',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const mask = Object.freeze({
  primary: {
    hex: alpha[500].hex,
    rgba: alpha[500].rgba,
    alias: 'Alpha/500',
    description: '遮罩蒙层',
  },
});

/** @type {Readonly<Record<string, SemanticColor>>} */
export const success = Object.freeze({
  primary: {
    hex: green[500].hex,
    alias: 'Green/500',
    description: '成功主色',
  },
  secondary: {
    hex: green[100].hex,
    alias: 'Green/100',
    description: '成功浅色',
  },
});

/** Flat map: Figma semantic name → resolved hex */
export const semanticByFigmaName = Object.freeze({
  'Text/Primary': text.primary.hex,
  'Text/Secondary': text.secondary.hex,
  'Text/Tertiary': text.tertiary.hex,
  'Text/Subtle': text.subtle.hex,
  'Text/Brand': text.brand.hex,
  'Text/Accent': text.accent.hex,
  'Text/White': text.white.hex,
  'Hover/Subtle': hover.subtle.hex,
  'Hover/Default': hover.default.hex,
  'Hover/Strong_On-Bg': hover.strongOnBg.hex,
  'Background/Grey': background.main.hex,
  'Background/Main': background.main.hex,
  'Background/White': background.white.hex,
  'Background/Black': background.black.hex,
  'Border/Primary': border.primary.hex,
  'Border/Secondary': border.secondary.hex,
  'Border/Brand': border.brand.hex,
  'Error/Primary': error.primary.hex,
  'Error/Secondary': error.secondary.hex,
  'Error/Tertiary': error.tertiary.hex,
  'Mask/Primary': mask.primary.hex,
  'Success/Primary': success.primary.hex,
  'Success/Secondary': success.secondary.hex,
});

/** Alias map: semantic Figma name → primitive Figma name */
export const semanticAliases = Object.freeze({
  'Text/Primary': 'Neutral/800',
  'Text/Secondary': 'Neutral/700',
  'Text/Tertiary': 'Neutral/600',
  'Text/Subtle': 'Neutral/500',
  'Text/Brand': 'Brand/500',
  'Text/Accent': 'Neutral/900',
  'Text/White': 'Base/White',
  'Hover/Subtle': 'Neutral/100',
  'Hover/Default': 'Neutral/300',
  'Hover/Strong_On-Bg': 'Neutral/400',
  'Background/Grey': 'Neutral/100',
  'Background/Main': 'Neutral/100',
  'Background/White': 'Base/White',
  'Background/Black': 'Neutral/800',
  'Border/Primary': 'Neutral/400',
  'Border/Secondary': 'Neutral/200',
  'Border/Brand': 'Brand/100',
  'Error/Primary': 'Red/500',
  'Error/Secondary': 'Red/100',
  'Error/Tertiary': 'Red/50',
  'Mask/Primary': 'Alpha/500',
  'Success/Primary': 'Green/500',
  'Success/Secondary': 'Green/100',
});

export const semantic = Object.freeze({
  text,
  hover,
  background,
  border,
  error,
  mask,
  success,
});

export default semantic;
