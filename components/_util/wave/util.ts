import { isString } from '../is';

export const isValidWaveColor = (
  color: CSSStyleDeclaration[keyof CSSStyleDeclaration],
): color is string => {
  if (!color) {
    return false;
  }
  return (
    isString(color) &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/rgba\((?:\d*, ){3}0\)/i.test(color) && // any transparent rgba color
    !/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i.test(color) && // any transparent hex color
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
