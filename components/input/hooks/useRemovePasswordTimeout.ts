import { useEffect, useRef } from 'react';
import type { InputRef } from '../Input';

export default function useRemovePasswordTimeout(
  inputRef: React.RefObject<InputRef>,
  triggerOnMount?: boolean,
) {
  const removePasswordTimeoutRef = useRef<number[]>([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(
      window.setTimeout(() => {
        if (
          inputRef.current?.input &&
          inputRef.current?.input.getAttribute('type') === 'password' &&
          inputRef.current?.input.hasAttribute('value')
        ) {
          inputRef.current?.input.removeAttribute('value');
        }
      }),
    );
  };

  useEffect(() => {
    if (triggerOnMount) {
      removePasswordTimeout();
    }

    return () => removePasswordTimeoutRef.current.forEach(item => window.clearTimeout(item));
  }, []);

  return removePasswordTimeout;
}
