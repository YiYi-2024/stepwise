export {
  alpha,
  base,
  brand,
  green,
  neutral,
  primitiveByFigmaName,
  primitives,
  red,
} from './primitives.js';

export {
  background,
  border,
  error,
  hover,
  mask,
  semantic,
  semanticAliases,
  semanticByFigmaName,
  success,
  text,
} from './semantic.js';

import { primitiveByFigmaName, primitives } from './primitives.js';
import {
  semantic,
  semanticAliases,
  semanticByFigmaName,
} from './semantic.js';

/** Combined color token surface for the Polar Star design system */
export const colors = Object.freeze({
  primitives,
  semantic,
  byFigmaName: Object.freeze({
    ...primitiveByFigmaName,
    ...semanticByFigmaName,
  }),
  aliases: semanticAliases,
});

export default colors;
