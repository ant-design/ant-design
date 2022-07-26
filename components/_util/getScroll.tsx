export function isWindow(obj: any): obj is Window {
  return obj !== null && obj !== undefined && obj === obj.window;
}

export default function getScroll(
  target: HTMLElement | Window | Document | null,
  top: boolean,
): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (isWindow(target)) {
    result = target[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target instanceof HTMLElement) {
    result = target[method];
  } else if (target) {
    // According to the type inference, the `target` is `never` type.
    // Since we configured the loose mode type checking, and supports mocking the target with such shape below::
    //    `{ documentElement: { scrollLeft: 200, scrollTop: 400 } }`,
    //    the program may falls into this branch.
    // Check the corresponding tests for details. Don't sure what is the real scenario this happens.
    result = target[method];
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = (target.ownerDocument ?? target).documentElement?.[method];
  }
  return result;
}
