export function isValidWaveColor(color: string) {
  return (
    color &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
    color !== 'transparent' &&
    color !== 'canvastext'
  );
}

export function getTargetWaveColor(node: HTMLElement) {
  const { borderTopColor, borderColor, backgroundColor } = getComputedStyle(node);
  return [borderTopColor, borderColor, backgroundColor].find(isValidWaveColor) ?? null;
}
