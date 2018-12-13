export class Vec2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 0;
    this.setParams();
  }

  setParams() {
    this.length = Math.sqrt(this.x * this.x + this.y * this.y);
  };

  setLength(len) {
    this.x = len / this.length * this.x;
    this.y = len / this.length * this.y;
    this.setParams();

    return this;
  };

  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.setParams();

    return this;
  };
}

export function Vec2Substract(vec1, vec2) {
  return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
}
