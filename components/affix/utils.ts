export type BindElement = HTMLElement | Window | null | undefined;

export function getTargetRect(target: BindElement): DOMRect {
  if (target === window) {
    return { top: 0, bottom: window.innerHeight } as DOMRect;
  }
  const targetRect = (target as HTMLElement).getBoundingClientRect();
  const { borderTopWidth, borderBottomWidth } = getComputedStyle(target as HTMLElement);
  return {
    width: targetRect.width,
    height: targetRect.height,
    left: targetRect.left,
    right: targetRect.right,
    x: targetRect.x,
    y: targetRect.y,
    top: targetRect.top + parseInt(borderTopWidth || '0', 10),
    bottom: targetRect.bottom - parseInt(borderBottomWidth || '0', 10),
  } as DOMRect;
}

export function getFixedTop(placeholderRect: DOMRect, targetRect: DOMRect, offsetTop?: number) {
  if (
    offsetTop !== undefined &&
    Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop
  ) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

export function getFixedBottom(
  placeholderRect: DOMRect,
  targetRect: DOMRect,
  offsetBottom?: number,
) {
  if (
    offsetBottom !== undefined &&
    Math.round(targetRect.bottom) < Math.round(placeholderRect.bottom) + offsetBottom
  ) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}
