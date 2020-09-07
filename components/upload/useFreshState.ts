import { useRef, useEffect } from 'react';
import raf from 'rc-util/lib/raf';
import useForceUpdate from '../_util/hooks/useForceUpdate';

// Note. Only for upload usage. Do not export to global util hooks
export default function useFreshState<T>(
  defaultValue: T,
  propValue?: T,
): [(displayValue?: boolean) => T, (newValue: T) => void] {
  const valueRef = useRef(defaultValue);
  const forceUpdate = useForceUpdate();
  const rafRef = useRef<number>();

  // Set value
  function setValue(newValue: T) {
    valueRef.current = newValue;
    forceUpdate();
  }

  function cleanUp() {
    raf.cancel(rafRef.current!);
  }

  function rafSyncValue(newValue: T) {
    cleanUp();
    rafRef.current = raf(() => {
      setValue(newValue);
    });
  }

  // Get value
  function getValue(displayValue = false) {
    if (displayValue) {
      return propValue || valueRef.current;
    }

    return valueRef.current;
  }

  // Effect will always update in a next frame to avoid sync state overwrite current processing state
  useEffect(() => {
    if (propValue) {
      rafSyncValue(propValue);
    }
  }, [propValue]);

  // Clean up
  useEffect(
    () => () => {
      cleanUp();
    },
    [],
  );

  return [getValue, setValue];
}
