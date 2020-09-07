import { useRef, useEffect } from 'react';
import useForceUpdate from '../_util/hooks/useForceUpdate';

// Note. Only for upload usage. Do not export to global util hooks
export default function useFreshState<T>(
  defaultValue: T,
  propValue?: T,
): [(displayValue?: boolean) => T, (newValue: T) => void] {
  const valueRef = useRef(defaultValue);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (propValue) {
      valueRef.current = propValue;
      forceUpdate();
    }
  }, [propValue]);

  // Set value
  function setValue(newValue: T) {
    valueRef.current = newValue;
    forceUpdate();
  }

  // Get value
  function getValue(displayValue = false) {
    if (displayValue) {
      return propValue || valueRef.current;
    }

    return valueRef.current;
  }

  return [getValue, setValue];
}
