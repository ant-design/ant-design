// Proxy the dom ref with `{ nativeElement, otherFn }` type
// ref: https://github.com/ant-design/ant-design/discussions/45242

import { useImperativeHandle, type Ref } from 'react';

export default function useProxyImperativeHandle<
  NativeELementType extends HTMLElement,
  ReturnRefType extends { nativeElement: NativeELementType },
>(ref: Ref<any> | undefined, init: () => ReturnRefType) {
  return useImperativeHandle(ref, () => {
    const refObj = init();
    const { nativeElement } = refObj;

    return new Proxy(nativeElement, {
      get(obj: any, prop: any) {
        if ((refObj as any)[prop]) {
          return (refObj as any)[prop];
        }

        return obj[prop];
      },
    });
  });
}
