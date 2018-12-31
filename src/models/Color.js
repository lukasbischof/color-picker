export default class Color {
  static colorFromHex(hex) {
    const mask = 0xff;
    const r = (mask << 16) & hex;
    const g = (mask << 8) & hex;
    const b = mask & hex;

    return new Color(r >> 16, g >> 8, b);
  }

  constructor(r, g, b, a = 1) {
    this.r = clamp(r, 0, 255);
    this.g = clamp(g, 0, 255);
    this.b = clamp(b, 0, 255);
    this.a = clamp(a, 0, 1);
  }

  get hex() {
    return (this.r << 16) | (this.g << 8) | this.b;
  }

  get cssRgba() {
    return `rgba(${[this.r, this.g, this.b, this.a].join(',')})`;
  }

  get cssHex() {
    return '#' + [this.r, this.g, this.b].map(n => n.toString(16).padStart(2, '0')).join('');
  }

  get cssHsl() {
    const { h, s, l } = this.toHsl();
    const hslString = h * 360 + ',' + [s, l].map(v => `${Math.floor(v * 100)}%`).join(',');
    return `hsl(${hslString})`;
  }

  toString() {
    return `[Color: ${this.cssRgba}, (${this.cssHex})]`;
  }

  toHsl() {
    let { r, g, b } = this;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let l = (max + min) / 2;

    if (max === min) {
      return { h: 0, s: 0, l };
    }

    const d = max - min;
    let h = 0;

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    return {
      h: h / 6,
      s: l > 0.5 ? d / (2 - max - min) : d / (max + min),
      l
    };
  }
};

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
