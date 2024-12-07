// Utility function to convert HSL to HEX
export function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number);

  const c = ((1 - Math.abs((2 * l) / 100 - 1)) * s) / 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Utility function to convert HEX to HSL
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const hexStr = hex.startsWith('#') ? hex.slice(1) : hex;

  const r = parseInt(hexStr.slice(0, 2), 16) / 255;
  const g = parseInt(hexStr.slice(2, 4), 16) / 255;
  const b = parseInt(hexStr.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h *= 60;
    h = h < 0 ? h + 360 : h;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// color-generator.ts
export default function randomColorGenerator(count: number): string[] {
  const colors: string[] = [];

  while (colors.length < count) {
    // More strict control over color generation
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 70; // 70-90%
    const lightness = Math.floor(Math.random() * 30) + 35; // 35-65%

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const hexColor = hslToHex(color);

    // Avoid duplicates
    if (!colors.includes(hexColor)) {
      colors.push(hexColor);
    }
  }

  return colors;
}
