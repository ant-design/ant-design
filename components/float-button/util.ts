export function getOffset(size: number, iconSize: number, padding: number): number {
  return (size - (iconSize + padding * 2)) / 2;
}

export function getAlignOffset(radius: number): number {
  if (radius === 0) {
    return 0;
  }
  return radius - Math.sqrt(radius ** 2 / 2);
}
