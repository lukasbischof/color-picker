import Color from "@/models/Color";

export function getColorAtPoint(ctx, x, y, scale = 1) {
  const data = ctx.getImageData(x * scale, y * scale, 1, 1).data;
  if (!data)
    return undefined;

  return new Color(...data);
}

export function deviceScale() {
  return window.devicePixelRatio || 1;
}

export function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

export function positionInCanvas(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const position = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
  return {
    ...position,
    get array() {
      return [position.x, position.y];
    }
  };
}
