import { FastColor } from '@ant-design/fast-color';

function isStableColor(color: number): boolean {
  return color >= 0 && color <= 255;
}

function getAlphaColor(frontColor: string, backgroundColor: string): string {
  const { r: fR, g: fG, b: fB, a: originAlpha } = new FastColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }

  const { r: bR, g: bG, b: bB } = new FastColor(backgroundColor).toRgb();

  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new FastColor({ r, g, b, a: Math.round(fA * 100) / 100 }).toRgbString();
    }
  }

  // fallback
  /* istanbul ignore next */
  return new FastColor({ r: fR, g: fG, b: fB, a: 1 }).toRgbString();
}

export default getAlphaColor;
