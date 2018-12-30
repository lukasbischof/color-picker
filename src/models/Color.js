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

  get cssRGBA() {
    return `rgba(${[this.r, this.g, this.b, this.a].join(',')})`;
  }

  get cssHex() {
    return '#' + [this.r, this.g, this.b].map(n => n.toString(16).padStart(2, '0')).join('');
  }

  toString() {
    return `[Color: ${this.cssRGBA}, (${this.cssHex})]`;
  }
};

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
