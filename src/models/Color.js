export default class Color {
  static colorFromHex(hex) {
    const mask = 0xff;
    const r = (mask << 16) & hex;
    const g = (mask << 8) & hex;
    const b = mask & hex;

    return new Color(r >> 16, g >> 8, b);
  }

  constructor(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.hex = (r << 16) | (g << 8) | b;
    this.cssRGBA = `rgba(${[r, g, b, a].join(',')})`;
    this.cssHex = '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('');
  }

  toString() {
    return `[Color: ${this.cssRGBA}, (${this.cssHex})]`;
  }
};
