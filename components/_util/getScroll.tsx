export default function getScroll(target: HTMLElement | Window | null, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? (target as Window)[prop] : (target as HTMLElement)[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = (document.documentElement as HTMLElement)[method];
  }

  return ret;
}
