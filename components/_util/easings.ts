// eslint-disable-next-line import/prefer-default-export
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  // biome-ignore lint/style/noParameterAssign: easeInOutCubic is a common function
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  // eslint-disable-next-line no-return-assign
  // biome-ignore lint/style/noParameterAssign: easeInOutCubic is a common function
  // biome-ignore lint/suspicious/noAssignInExpressions: easeInOutCubic is a common function
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}
