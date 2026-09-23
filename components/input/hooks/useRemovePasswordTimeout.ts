import { useEffect, useRef } from 'react';

import type { InputRef } from '../Input';

export default function useRemovePasswordTimeout(
  inputRef: React.RefObject<InputRef | null>,
  triggerOnMount?: boolean,
) {
  const removePasswordTimeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(
      setTimeout(() => {
        const input = inputRef.current?.input;
        if (input && input.getAttribute('type') === 'password' && input.hasAttribute('value')) {
          // Mark the current value as dirty before removing the server-rendered default value.
          // Otherwise, removing the attribute also clears the live value after hydration.
          const value = input.value;
          input.value = value;
          input.removeAttribute('value');
        }
      }),
    );
  };

  useEffect(() => {
    if (triggerOnMount) {
      removePasswordTimeout();
    }

    return () =>
      removePasswordTimeoutRef.current.forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
  }, [triggerOnMount]);

  return removePasswordTimeout;
}
