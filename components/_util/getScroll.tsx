export default function getScroll(target: HTMLElement | Window | Document | null, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (target instanceof Window) {
    result = target[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = target[method];
  }
  if (target && !(target instanceof Window) && typeof result !== 'number') {
    result = (target.ownerDocument || (target as Document)).documentElement[method];
  }
  return result;
}
