/** converting camel-cased strings to be lowercase and link it with Separato */
export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getStyleStr(style: React.CSSProperties): string {
  return Object.keys(style)
    .map((key: keyof React.CSSProperties) => `${toLowercaseSeparator(key)}: ${style[key]};`)
    .join(' ');
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

/** Rotate with the watermark as the center point */
export function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: number,
) {
  ctx.translate(rotateX, rotateY);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}
