export function isWindow(obj: any): obj is Window {
  return obj !== null && obj !== undefined && obj === obj.window;
}

const getScroll = (target: HTMLElement | Window | Document | null): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  let result = 0;
  if (isWindow(target)) {
    result = target.pageYOffset;
  } else if (target instanceof Document) {
    result = target.documentElement.scrollTop;
  } else if (target instanceof HTMLElement) {
    result = target.scrollTop;
  } else if (target) {
    // According to the type inference, the `target` is `never` type.
    // Since we configured the loose mode type checking, and supports mocking the target with such shape below::
    //    `{ documentElement: { scrollLeft: 200, scrollTop: 400 } }`,
    //    the program may falls into this branch.
    // Check the corresponding tests for details. Don't sure what is the real scenario this happens.
    /* biome-ignore lint/complexity/useLiteralKeys: target is a never type */ /* eslint-disable-next-line dot-notation */
    result = target['scrollTop'];
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = (target.ownerDocument ?? target).documentElement?.scrollTop;
  }
  return result;
};

export default getScroll;
