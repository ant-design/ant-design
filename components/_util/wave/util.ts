import { isString } from '../is';

export const isValidWaveColor = (
  color: CSSStyleDeclaration[keyof CSSStyleDeclaration],
): color is string => {
  return (
    isString(color) &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0(?:\.0+)?\s*\)$/i.test(color) &&
    color !== 'transparent' &&
    color !== 'canvastext'
  );
};

export function getTargetWaveColor(
  node: HTMLElement,
  colorSource: keyof CSSStyleDeclaration | null = null,
): string | null {
  const style = getComputedStyle(node);
  const { borderTopColor, borderColor, backgroundColor } = style;

  if (colorSource && isValidWaveColor(style[colorSource])) {
    return style[colorSource];
  }

  return [borderTopColor, borderColor, backgroundColor].find(isValidWaveColor) ?? null;
}
