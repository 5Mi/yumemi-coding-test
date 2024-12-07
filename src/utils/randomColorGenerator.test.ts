// color-generator.test.ts
import { describe, it, expect } from 'vitest';
import randomColorGenerator, { hslToHex, hexToHSL } from './randomColorGenerator';

describe('Color Utility Functions', () => {
  describe('hslToHex', () => {
    it('converts basic HSL colors to HEX correctly', () => {
      // Test some standard colors
      expect(hslToHex('hsl(0, 100%, 50%)')).toBe('#ff0000'); // Red
      expect(hslToHex('hsl(120, 100%, 50%)')).toBe('#00ff00'); // Green
      expect(hslToHex('hsl(240, 100%, 50%)')).toBe('#0000ff'); // Blue
    });

    it('handles edge cases and boundary values', () => {
      expect(hslToHex('hsl(0, 0%, 0%)')).toBe('#000000'); // Black
      expect(hslToHex('hsl(0, 0%, 100%)')).toBe('#ffffff'); // White
      expect(hslToHex('hsl(360, 100%, 50%)')).toBe('#ff0000'); // Red (360 degrees)
    });

    it('rounds color values correctly', () => {
      // Test rounding and small variations
      expect(hslToHex('hsl(60, 50%, 50%)')).toBe('#bfbf40');
    });
  });

  describe('hexToHSL', () => {
    it('converts basic HEX colors to HSL correctly', () => {
      // Red
      const red = hexToHSL('#ff0000');
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);

      // Green
      const green = hexToHSL('#00ff00');
      expect(green.h).toBe(120);
      expect(green.s).toBe(100);
      expect(green.l).toBe(50);

      // Blue
      const blue = hexToHSL('#0000ff');
      expect(blue.h).toBe(240);
      expect(blue.s).toBe(100);
      expect(blue.l).toBe(50);
    });

    it('handles different hex formats', () => {
      // With and without #
      expect(hexToHSL('#fff')).toEqual(hexToHSL('fff'));
      expect(hexToHSL('#000')).toEqual(hexToHSL('000'));
    });

    it('converts grayscale colors correctly', () => {
      // Black
      const black = hexToHSL('#000000');
      expect(black.h).toBe(0);
      expect(black.s).toBe(0);
      expect(black.l).toBe(0);

      // White
      const white = hexToHSL('#ffffff');
      expect(white.h).toBe(0);
      expect(white.s).toBe(0);
      expect(white.l).toBe(100);
    });
  });

  describe('randomColorGenerator', () => {
    it('generates correct number of colors', () => {
      const colors1 = randomColorGenerator(5);
      const colors2 = randomColorGenerator(10);

      expect(colors1).toHaveLength(5);
      expect(colors2).toHaveLength(10);
    });

    it('generates unique colors', () => {
      const colors = randomColorGenerator(10);
      const uniqueColors = new Set(colors);

      expect(uniqueColors.size).toBe(colors.length);
    });

    it('generates valid hex colors', () => {
      const colors = randomColorGenerator(10);

      colors.forEach((color) => {
        // Check hex color format
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('avoids very light or very dark colors', () => {
      const colors = randomColorGenerator(50);

      colors.forEach((color) => {
        // Convert hex to HSL to check lightness
        const hsl = hexToHSL(color);

        // Ensure colors are not too light (>70%) or too dark (<30%)
        expect(hsl.l).toBeGreaterThan(30);
        expect(hsl.l).toBeLessThan(65);
      });
    });
  });
});
