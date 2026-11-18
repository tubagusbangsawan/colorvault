import {
  isValidHex,
  normalizeHex,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToHex,
  getRelativeLuminance,
  calculateContrast,
  getComplementaryColor,
  generateHarmony,
  generateRandomPalette,
} from '../src/utils/color/index.ts';
import {
  validatePaletteObject,
  importVaultFromJson,
} from '../src/utils/storage/index.ts';
import { formatPaletteAsCss } from '../src/utils/export/index.ts';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

function assertClose(actual: number, expected: number, tolerance: number, testName: string) {
  assert(Math.abs(actual - expected) <= tolerance, `${testName} (actual: ${actual}, expected: ${expected})`);
}

console.log('--- COLORVAULT TEST SUITE ---\n');

// 1. HEX VALIDATION & NORMALIZATION
console.log('Testing HEX validation & normalization:');
assert(isValidHex('#FFFFFF'), 'isValidHex: valid 6-char with #');
assert(isValidHex('FFFFFF'), 'isValidHex: valid 6-char without #');
assert(isValidHex('#abc'), 'isValidHex: valid 3-char with #');
assert(isValidHex('123'), 'isValidHex: valid 3-char without #');
assert(!isValidHex('#GGG'), 'isValidHex: rejects non-hex chars');
assert(!isValidHex('#1234'), 'isValidHex: rejects 4-char hex');
assert(normalizeHex('#abc') === '#AABBCC', 'normalizeHex: expands #abc to #AABBCC');
assert(normalizeHex('8b5cf6') === '#8B5CF6', 'normalizeHex: prepends # and capitalizes');

// 2. RGB CONVERSIONS
console.log('\nTesting RGB Conversions:');
const whiteRgb = hexToRgb('#FFFFFF');
assert(whiteRgb.r === 255 && whiteRgb.g === 255 && whiteRgb.b === 255, 'hexToRgb: #FFFFFF -> 255, 255, 255');
const blackRgb = hexToRgb('#000000');
assert(blackRgb.r === 0 && blackRgb.g === 0 && blackRgb.b === 0, 'hexToRgb: #000000 -> 0, 0, 0');
const customRgb = hexToRgb('#FF5E7E');
assert(customRgb.r === 255 && customRgb.g === 94 && customRgb.b === 126, 'hexToRgb: #FF5E7E -> 255, 94, 126');
assert(rgbToHex(255, 94, 126) === '#FF5E7E', 'rgbToHex: 255, 94, 126 -> #FF5E7E');

// 3. HSL CONVERSIONS
console.log('\nTesting HSL Conversions:');
const pureRedHsl = rgbToHsl(255, 0, 0);
assert(pureRedHsl.h === 0 && pureRedHsl.s === 100 && pureRedHsl.l === 50, 'rgbToHsl: Red -> 0, 100%, 50%');
const pureGreenHsl = rgbToHsl(0, 255, 0);
assert(pureGreenHsl.h === 120 && pureGreenHsl.s === 100 && pureGreenHsl.l === 50, 'rgbToHsl: Green -> 120, 100%, 50%');
const pureBlueHsl = rgbToHsl(0, 0, 255);
assert(pureBlueHsl.h === 240 && pureBlueHsl.s === 100 && pureBlueHsl.l === 50, 'rgbToHsl: Blue -> 240, 100%, 50%');
assert(hslToHex(0, 100, 50) === '#FF0000', 'hslToHex: (0, 100, 50) -> #FF0000');

// 4. WCAG RELATIVE LUMINANCE & CONTRAST
console.log('\nTesting WCAG 2.1 Luminance & Contrast:');
assertClose(getRelativeLuminance('#000000'), 0.0, 0.0001, 'getRelativeLuminance: Black is 0.0');
assertClose(getRelativeLuminance('#FFFFFF'), 1.0, 0.0001, 'getRelativeLuminance: White is 1.0');

// Known test pairs:
// White on Black: 21:1
const c1 = calculateContrast('#FFFFFF', '#000000');
assert(c1.ratio === 21, 'calculateContrast: White on Black is 21:1');
assert(c1.scoreAA && c1.scoreAAA && c1.scoreAALarge && c1.scoreAAALarge, 'White on Black passes all WCAG levels');

// Black on Black: 1:1
const c2 = calculateContrast('#000000', '#000000');
assert(c2.ratio === 1, 'calculateContrast: Black on Black is 1:1');
assert(!c2.scoreAA && !c2.scoreAAA, 'Black on Black fails WCAG');

// Blue #0000FF on White #FFFFFF:
// Lum(Blue) = 0.0722, Lum(White) = 1.0
// Ratio = 1.05 / (0.0722 + 0.05) = 8.59
const c3 = calculateContrast('#0000FF', '#FFFFFF');
assert(c3.ratio === 8.59, 'calculateContrast: #0000FF on #FFFFFF is 8.59:1');
assert(c3.scoreAA && c3.scoreAAA, 'Blue on White passes AAA');

// 5. COLOR HARMONY
console.log('\nTesting Color Harmony:');
const comp = getComplementaryColor('#FF0000'); // Red -> Cyan
assert(comp === '#00FFFF', 'getComplementaryColor: Red (0 deg) complement is Cyan (180 deg)');

const compHarmony = generateHarmony('#8B5CF6', 'complementary');
assert(compHarmony.length === 5, 'generateHarmony complementary produces 5 colors');
assert(compHarmony.every(c => isValidHex(c)), 'All complementary harmony colors are valid hex');

const triadicHarmony = generateHarmony('#8B5CF6', 'triadic');
assert(triadicHarmony.length === 5, 'generateHarmony triadic produces 5 colors');
assert(triadicHarmony.every(c => isValidHex(c)), 'All triadic harmony colors are valid hex');

const monoHarmony = generateHarmony('#8B5CF6', 'monochromatic');
assert(monoHarmony.length === 5, 'generateHarmony monochromatic produces 5 colors');
assert(monoHarmony.every(c => isValidHex(c)), 'All monochromatic harmony colors are valid hex');

// 6. RANDOM PALETTE GENERATION
console.log('\nTesting Random Palette Generation:');
const randPal = generateRandomPalette();
assert(randPal.length === 5, 'generateRandomPalette produces 5 colors');
assert(randPal.every(c => isValidHex(c)), 'All random palette colors are valid hex');

// 7. STORAGE SCHEMA & IMPORT VALIDATION
console.log('\nTesting Storage Schema Validation:');
assert(
  validatePaletteObject({
    id: 'test-1',
    name: 'Test Palette',
    colors: ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF'],
  }),
  'validatePaletteObject: valid 5-color palette'
);
assert(
  !validatePaletteObject({
    id: 'test-2',
    name: 'Invalid',
    colors: ['#FFF', '#000'], // only 2 colors
  }),
  'validatePaletteObject: rejects palettes without 5 colors'
);
assert(
  !validatePaletteObject({
    id: 'test-3',
    name: 'Invalid',
    colors: ['#ZZZZZZ', '#000000', '#111111', '#222222', '#333333'],
  }),
  'validatePaletteObject: rejects palettes with invalid hex colors'
);

// 8. IMPORT JSON VALIDATION
console.log('\nTesting Import JSON Validation:');
const validJson = JSON.stringify({
  app: 'COLORVAULT',
  palettes: [
    {
      id: 'import-1',
      name: 'Imported Neon',
      colors: ['#FF007F', '#7928CA', '#00DFD8', '#0070F3', '#FF4D4D'],
    },
  ],
});
const importRes = importVaultFromJson(validJson);
assert(importRes.success && importRes.importedCount === 1, 'importVaultFromJson: accepts valid structure');

const malformedJson = '{ bad json';
const badImport = importVaultFromJson(malformedJson);
assert(!badImport.success, 'importVaultFromJson: safely handles malformed JSON');

// 9. CSS EXPORT
console.log('\nTesting CSS Export:');
const cssOutput = formatPaletteAsCss({
  id: 'export-test',
  name: 'Ocean Dusk',
  colors: ['#0A2540', '#20639B', '#3CAEA3', '#F6D55C', '#ED553B'],
});
assert(cssOutput.includes('--color-ocean-dusk-1: #0A2540;'), 'formatPaletteAsCss: exports valid CSS variable 1');
assert(cssOutput.includes('--color-ocean-dusk-5: #ED553B;'), 'formatPaletteAsCss: exports valid CSS variable 5');

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passedTests}/${totalTests} tests passed successfully.`);
console.log(`========================================\n`);
