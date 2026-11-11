#!/usr/bin/env node
/**
 * Validate color token consistency across JSON / JS / CSS surfaces.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  colors,
  primitiveByFigmaName,
  semanticAliases,
  semanticByFigmaName,
} from '../src/colors/index.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokenJson = JSON.parse(
  readFileSync(join(root, 'tokens/colors.json'), 'utf8'),
);
const css = readFileSync(join(root, 'src/css/colors.css'), 'utf8');

const errors = [];

function fail(message) {
  errors.push(message);
}

function normalizeHex(value) {
  const raw = String(value).trim();
  if (raw.startsWith('rgba') || raw.startsWith('rgb')) return raw.toLowerCase().replace(/\s+/g, '');
  let hex = raw.toUpperCase();
  if (!hex.startsWith('#')) hex = `#${hex}`;
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return hex;
}

function walkTokens(node, path = []) {
  const out = [];
  if (!node || typeof node !== 'object') return out;
  if (node.$type === 'color' && typeof node.$value === 'string') {
    out.push({ path: path.join('.'), value: node.$value });
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    out.push(...walkTokens(value, [...path, key]));
  }
  return out;
}

const expectedPrimitives = {
  'Base/White': '#FFFFFF',
  'Base/Black': '#000000',
  'Neutral/100': '#F7F7F7',
  'Neutral/200': '#F3F3F3',
  'Neutral/300': '#F2F2F2',
  'Neutral/400': '#E7E7E7',
  'Neutral/500': '#C5C5C5',
  'Neutral/600': '#ADADAD',
  'Neutral/700': '#8A8A8A',
  'Neutral/800': '#383838',
  'Neutral/900': '#1D1D1D',
  'Red/50': '#FFEFEF',
  'Red/100': '#FDDBDB',
  'Red/500': '#F64D4D',
  'Brand/100': '#FFE0CF',
  'Brand/500': '#F36B24',
  'Green/100': '#DDFCDD',
  'Green/500': '#39AD37',
  'Alpha/500': '#38383833',
};

for (const [name, hex] of Object.entries(expectedPrimitives)) {
  const actual = primitiveByFigmaName[name];
  if (!actual) {
    fail(`Missing primitive ${name}`);
    continue;
  }
  if (normalizeHex(actual) !== normalizeHex(hex)) {
    fail(`Primitive ${name}: expected ${hex}, got ${actual}`);
  }
}

for (const [semantic, alias] of Object.entries(semanticAliases)) {
  const resolved = primitiveByFigmaName[alias];
  const published = semanticByFigmaName[semantic];
  if (!resolved) {
    fail(`Alias target missing for ${semantic} → ${alias}`);
    continue;
  }
  if (!published) {
    fail(`Semantic publish missing for ${semantic}`);
    continue;
  }
  if (normalizeHex(resolved) !== normalizeHex(published)) {
    fail(
      `Semantic ${semantic} resolves to ${published}, but alias ${alias} is ${resolved}`,
    );
  }
}

const cssChecks = [
  ['--polar-brand-500', '#f36b24'],
  ['--polar-neutral-800', '#383838'],
  ['--polar-error-primary', 'var(--polar-red-500)'],
  ['--polar-text-brand', 'var(--polar-brand-500)'],
  ['--polar-mask-primary', 'var(--polar-alpha-500)'],
];

for (const [prop, expected] of cssChecks) {
  const re = new RegExp(`${prop}\\s*:\\s*([^;]+);`);
  const match = css.match(re);
  if (!match) {
    fail(`CSS missing ${prop}`);
    continue;
  }
  const value = match[1].trim().toLowerCase();
  if (value !== expected.toLowerCase()) {
    fail(`CSS ${prop}: expected ${expected}, got ${match[1].trim()}`);
  }
}

const jsonLeaves = walkTokens(tokenJson.color);
if (jsonLeaves.length < 30) {
  fail(`Token JSON leaf count too low: ${jsonLeaves.length}`);
}

const brandLeaf = jsonLeaves.find((leaf) => leaf.path.endsWith('primitive.brand.500'));
if (!brandLeaf || normalizeHex(brandLeaf.value) !== '#F36B24') {
  fail('Token JSON missing Brand/500 = #F36B24');
}

const textBrand = jsonLeaves.find((leaf) => leaf.path.endsWith('semantic.text.brand'));
if (!textBrand || textBrand.value !== '{color.primitive.brand.500}') {
  fail('Token JSON Text/Brand must alias {color.primitive.brand.500}');
}

if (!colors.primitives || !colors.semantic) {
  fail('colors export incomplete');
}

if (errors.length) {
  console.error('Color token validation failed:\n');
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log('Color tokens OK');
console.log(`  primitives: ${Object.keys(primitiveByFigmaName).length}`);
console.log(`  semantics:  ${Object.keys(semanticByFigmaName).length}`);
console.log(`  json leaves: ${jsonLeaves.length}`);
