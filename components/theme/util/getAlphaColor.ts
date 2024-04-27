import { parseToRgba, rgba } from 'color2k';

function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255;
}

function getAlphaColor(frontColor: string, backgroundColor: string): string {
  const [fR, fG, fB, originAlpha] = parseToRgba(frontColor);
  if (originAlpha < 1) {
    return frontColor;
  }

  const [bR, bG, bB] = parseToRgba(backgroundColor);

  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return rgba(r, g, b, Math.round(fA * 100) / 100);
    }
  }

  // fallback
  /* istanbul ignore next */
  return rgba(fR, fG, fB, 1);
}

export default getAlphaColor;
