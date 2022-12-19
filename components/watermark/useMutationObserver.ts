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

  const reRendering = (mutation: MutationRecord, watermarkElement?: HTMLElement) => {
    let flag = false;
    // Whether to delete the watermark node
    if (mutation.removedNodes.length) {
      flag = Array.from(mutation.removedNodes).some((node) => node === watermarkElement);
    }
    // Whether the watermark dom property value has been modified
    if (mutation.type === 'attributes' && mutation.target === watermarkElement) {
      flag = true;
    }
    return flag;
  };

  return { createObserver, destroyObserver, reRendering };
}
