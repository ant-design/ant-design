import raf from 'rc-util/lib/raf';
import * as React from 'react';
import { useRef } from 'react';

type Updater<ValueType> = (prev?: ValueType) => ValueType;

export default function useFrameState<ValueType>(
  defaultValue: ValueType,
): [ValueType, (updater: Updater<ValueType>) => void] {
  const [value, setValue] = React.useState(defaultValue);
  const frameRef = useRef<number | null>(null);
  const batchRef = useRef<Updater<ValueType>[]>([]);
  const destroyRef = useRef(false);

  React.useEffect(() => {
    destroyRef.current = false;
    return () => {
      destroyRef.current = true;
      raf.cancel(frameRef.current!);
      frameRef.current = null;
    };
  }, []);

  function setFrameValue(updater: Updater<ValueType>) {
    if (destroyRef.current) {
      return;
    }

    if (frameRef.current === null) {
      batchRef.current = [];
      frameRef.current = raf(() => {
        frameRef.current = null;
        setValue((prevValue) => {
          let current = prevValue;

          batchRef.current.forEach((func) => {
            current = func(current);
          });

          return current;
        });
      });
    }

    batchRef.current.push(updater);
  }

  return [value, setFrameValue];
}
