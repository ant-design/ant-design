// Proxy the dom ref with `{ nativeElement, otherFn }` type
// ref: https://github.com/ant-design/ant-design/discussions/45242

import { useImperativeHandle, type Ref } from 'react';

function fillProxy(
  element: HTMLElement & { _antProxy?: Record<string, any> },
  handler: Record<string, any>,
) {
  element._antProxy = element._antProxy || {};

  Object.keys(handler).forEach((key) => {
    if (!(key in element._antProxy!)) {
      const ori = (element as any)[key];
      element._antProxy![key] = ori;

      (element as any)[key] = handler[key];
    }
  });

  return element;
}

export default function useProxyImperativeHandle<
  NativeELementType extends HTMLElement,
  ReturnRefType extends { nativeElement: NativeELementType },
>(ref: Ref<any> | undefined, init: () => ReturnRefType) {
  return useImperativeHandle(ref, () => {
    const refObj = init();
    const { nativeElement } = refObj;

    if (typeof Proxy !== 'undefined') {
      return new Proxy(nativeElement, {
        get(obj: any, prop: any) {
          if ((refObj as any)[prop]) {
            return (refObj as any)[prop];
          }

          return Reflect.get(obj, prop);
        },
      });
    }

    // Fallback of IE
    return fillProxy(nativeElement, refObj);
  });
}
