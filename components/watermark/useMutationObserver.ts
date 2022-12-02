import { useEffect, useRef } from 'react';

const getRandomId = () => {
  let randomId = `${Math.random().toString(36).substring(2, 6)}-${Date.now()}`;
  if (process.env.NODE_ENV === 'test') {
    randomId = '7mte-1669650061677';
  }
  return randomId;
};

const WATERMARK_ID_NAME = 'data-watermark-id';

export default function useMutationObserver() {
  const instance = useRef<MutationObserver>();
  const watermarkId = useRef(getRandomId());

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
        attributeFilter: ['style', 'class', WATERMARK_ID_NAME],
      });
    }
  };

  useEffect(() => () => destroyObserver(), []);

  return {
    WATERMARK_ID_NAME,
    watermarkId: watermarkId.current,
    createObserver,
    destroyObserver,
  };
}
