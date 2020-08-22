import * as React from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';

/**
 * Always debounce error to avoid [error -> null -> error] blink
 */
export default function useCacheErrors(
  errors: React.ReactNode[],
  changeTrigger: (visible: boolean) => void,
  directly: boolean,
): [boolean, React.ReactNode[]] {
  const cacheRef = React.useRef({
    errors,
    visible: !!errors.length,
  });

  const forceUpdate = useForceUpdate();

  const update = () => {
    const prevVisible = cacheRef.current.visible;
    const newVisible = !!errors.length;

    const prevErrors = cacheRef.current.errors;
    cacheRef.current.errors = errors;
    cacheRef.current.visible = newVisible;

    if (prevVisible !== newVisible) {
      changeTrigger(newVisible);
    } else if (
      prevErrors.length !== errors.length ||
      prevErrors.some((prevErr, index) => prevErr !== errors[index])
    ) {
      forceUpdate();
    }
  };

  React.useEffect(() => {
    if (!directly) {
      const timeout = setTimeout(update, 10);
      return () => clearTimeout(timeout);
    }
  }, [errors]);

  if (directly) {
    update();
  }

  return [cacheRef.current.visible, cacheRef.current.errors];
}
