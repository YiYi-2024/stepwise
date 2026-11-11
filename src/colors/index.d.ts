export interface ColorPrimitive {
  hex: string;
  rgba?: string;
  description?: string;
}

export interface SemanticColor {
  hex: string;
  rgba?: string;
  alias: string;
  description?: string;
}

export declare const base: Readonly<{
  white: ColorPrimitive;
  black: ColorPrimitive;
}>;

export declare const neutral: Readonly<Record<'100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900', ColorPrimitive>>;
export declare const red: Readonly<Record<'50' | '100' | '500', ColorPrimitive>>;
export declare const brand: Readonly<Record<'100' | '500', ColorPrimitive>>;
export declare const green: Readonly<Record<'100' | '500', ColorPrimitive>>;
export declare const alpha: Readonly<Record<'500', ColorPrimitive>>;

export declare const primitives: Readonly<{
  base: typeof base;
  neutral: typeof neutral;
  red: typeof red;
  brand: typeof brand;
  green: typeof green;
  alpha: typeof alpha;
}>;

export declare const primitiveByFigmaName: Readonly<Record<string, string>>;

export declare const text: Readonly<{
  primary: SemanticColor;
  secondary: SemanticColor;
  tertiary: SemanticColor;
  subtle: SemanticColor;
  brand: SemanticColor;
  accent: SemanticColor;
  white: SemanticColor;
}>;

export declare const hover: Readonly<{
  subtle: SemanticColor;
  default: SemanticColor;
  strongOnBg: SemanticColor;
}>;

export declare const background: Readonly<{
  main: SemanticColor;
  white: SemanticColor;
  black: SemanticColor;
}>;

export declare const border: Readonly<{
  primary: SemanticColor;
  secondary: SemanticColor;
  brand: SemanticColor;
}>;

export declare const error: Readonly<{
  primary: SemanticColor;
  secondary: SemanticColor;
  tertiary: SemanticColor;
}>;

export declare const mask: Readonly<{
  primary: SemanticColor;
}>;

export declare const success: Readonly<{
  primary: SemanticColor;
  secondary: SemanticColor;
}>;

export declare const semantic: Readonly<{
  text: typeof text;
  hover: typeof hover;
  background: typeof background;
  border: typeof border;
  error: typeof error;
  mask: typeof mask;
  success: typeof success;
}>;

export declare const semanticByFigmaName: Readonly<Record<string, string>>;
export declare const semanticAliases: Readonly<Record<string, string>>;

export declare const colors: Readonly<{
  primitives: typeof primitives;
  semantic: typeof semantic;
  byFigmaName: Readonly<Record<string, string>>;
  aliases: typeof semanticAliases;
}>;

export default colors;
