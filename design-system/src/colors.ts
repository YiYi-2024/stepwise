/**
 * 北极星设计规范 — Color Tokens (TypeScript)
 * Source: Figma ❖ Token · Color Primitives + Semantic Colors
 */

export const colorPrimitives = {
  base: {
    white: '#FFFFFF',
    black: '#000000',
  },
  neutral: {
    100: '#F7F7F7',
    200: '#F3F3F3',
    300: '#F2F2F2',
    400: '#E7E7E7',
    500: '#C5C5C5',
    600: '#ADADAD',
    700: '#8A8A8A',
    800: '#383838',
    900: '#1D1D1D',
  },
  error: {
    50: '#FFEFEF',
    100: '#FDDBDB',
    500: '#F64D4D',
  },
  brand: {
    100: '#FFE0CF',
    500: '#F36B24',
  },
  success: {
    100: '#DDFCDD',
    500: '#39AD37',
  },
  alpha: {
    /** Neutral/800 @ 20% — masks & overlays */
    500: 'rgba(56, 56, 56, 0.2)',
    500Hex: '#38383833',
  },
} as const;

export const colorSemantic = {
  text: {
    primary: colorPrimitives.neutral[800],
    secondary: colorPrimitives.neutral[700],
    tertiary: colorPrimitives.neutral[600],
    subtle: colorPrimitives.neutral[500],
    brand: colorPrimitives.brand[500],
    accent: colorPrimitives.neutral[900],
  },
  hover: {
    subtle: colorPrimitives.neutral[100],
    default: colorPrimitives.neutral[300],
    strongOnBg: colorPrimitives.neutral[400],
  },
  background: {
    main: colorPrimitives.neutral[100],
    white: colorPrimitives.base.white,
  },
  border: {
    primary: colorPrimitives.neutral[400],
    secondary: colorPrimitives.neutral[200],
    brand: colorPrimitives.brand[100],
  },
  error: {
    primary: colorPrimitives.error[500],
    secondary: colorPrimitives.error[100],
    tertiary: colorPrimitives.error[50],
  },
  mask: {
    primary: colorPrimitives.alpha[500],
  },
  success: {
    primary: colorPrimitives.success[500],
    secondary: colorPrimitives.success[100],
  },
} as const;

/** CSS custom property names aligned with `css/colors.css` */
export const colorCssVars = {
  primitives: {
    baseWhite: '--color-base-white',
    baseBlack: '--color-base-black',
    neutral100: '--color-neutral-100',
    neutral200: '--color-neutral-200',
    neutral300: '--color-neutral-300',
    neutral400: '--color-neutral-400',
    neutral500: '--color-neutral-500',
    neutral600: '--color-neutral-600',
    neutral700: '--color-neutral-700',
    neutral800: '--color-neutral-800',
    neutral900: '--color-neutral-900',
    error50: '--color-error-50',
    error100: '--color-error-100',
    error500: '--color-error-500',
    brand100: '--color-brand-100',
    brand500: '--color-brand-500',
    success100: '--color-success-100',
    success500: '--color-success-500',
    alpha500: '--color-alpha-500',
  },
  semantic: {
    textPrimary: '--color-text-primary',
    textSecondary: '--color-text-secondary',
    textTertiary: '--color-text-tertiary',
    textSubtle: '--color-text-subtle',
    textBrand: '--color-text-brand',
    textAccent: '--color-text-accent',
    hoverSubtle: '--color-hover-subtle',
    hoverDefault: '--color-hover-default',
    hoverStrongOnBg: '--color-hover-strong-on-bg',
    bgMain: '--color-bg-main',
    bgWhite: '--color-bg-white',
    borderPrimary: '--color-border-primary',
    borderSecondary: '--color-border-secondary',
    borderBrand: '--color-border-brand',
    errorPrimary: '--color-error-primary',
    errorSecondary: '--color-error-secondary',
    errorTertiary: '--color-error-tertiary',
    maskPrimary: '--color-mask-primary',
    successPrimary: '--color-success-primary',
    successSecondary: '--color-success-secondary',
  },
} as const;

export type ColorPrimitives = typeof colorPrimitives;
export type ColorSemantic = typeof colorSemantic;
