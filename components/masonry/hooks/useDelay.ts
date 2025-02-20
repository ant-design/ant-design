import * as React from 'react';
import { useEvent } from '@rc-component/util';

export default function useDelay(callback: VoidFunction) {
  const idRef = React.useRef<number>(0);

  const triggerFn = useEvent(() => {
    idRef.current += 1;
    const id = idRef.current;

    const channel = new MessageChannel();
    channel.port1.onmessage = () => {
      if (id === idRef.current) {
        callback();
      }
    };

    Promise.resolve().then(() => {
      channel.port2.postMessage(null);
    });
  });

  return triggerFn;
}
