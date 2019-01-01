declare class Color {
  static colorFromHex(hex: number): Color;

  constructor(r: number, g: number, b: number, a?: number);

  public r: number;
  public g: number;
  public b: number;
  public a: number;

  readonly hex: number;
  readonly cssRgba: string;
  readonly cssHex: string;
  readonly cssHsl: string;

  public toString(): string;
  public toHsl(): number[];
}
