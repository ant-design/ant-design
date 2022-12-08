import { useEffect, useRef } from 'react';

export default function useMutationObserver() {
  const instance = useRef<MutationObserver>();

  const destroyObserver = () => {
    if (instance.current) {
      instance.current.takeRecords();
      instance.current.disconnect();
      instance.current = undefined;
    }
  };

  const createObserver = (target: Node, callback: MutationCallback) => {
    if (MutationObserver) {
      destroyObserver();
      instance.current = new MutationObserver(callback);
      instance.current.observe(target, {
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'],
      });
    }
  };

  useEffect(() => destroyObserver, []);

  return { createObserver, destroyObserver };
}
