export function isValidWaveColor(
  color: CSSStyleDeclaration[keyof CSSStyleDeclaration],
): color is string {
  return (color &&
    typeof color === 'string' &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
    color !== 'transparent' &&
    color !== 'canvastext') as boolean;
}

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
