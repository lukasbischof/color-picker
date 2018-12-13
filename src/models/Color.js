export default class Color {
  static colorFromHex(hex) {
    const r = 0xFF0000 & hex;
    const g = 0x00FF00 & hex;
    const b = 0x0000FF & hex;

    return new Color(r >> 16, g >> 8, b, 1.0);
  }

  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.hex = 0x000000;
    this.hex |= r << 16;
    this.hex |= g << 8;
    this.hex = this.hex | b;

    this.cssRGBA = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

    const rStr = r.toString(16).length == 1 ? r.toString(16) + '0' : r.toString(16);
    const gStr = g.toString(16).length == 1 ? g.toString(16) + '0' : g.toString(16);
    const bStr = b.toString(16).length == 1 ? b.toString(16) + '0' : b.toString(16);
    this.cssHex = '#' + rStr + gStr + bStr;
  }

  toString() {
    return 'Color: r: ' + this.r + ', g: ' + this.g + ', b: ' + this.b + ', a: ' + this.a + ' (Hex: ' + this.cssHex + ')';
  }
};
