import { useRef, useEffect } from 'react';
import { ValidateStatus } from '../FormItem';
import useForceUpdate from '../../_util/hooks/useForceUpdate';

/**
 * Return cache errors & status to avoid origin quick switch shaking.
 * Thus with quick [error => null => error] will skip the `null` phase.
 */
export default (
  errors: React.ReactNode[],
  status?: ValidateStatus,
): [boolean, React.ReactNode[], ValidateStatus | undefined] => {
  const prevVisibleRef = useRef(!!errors?.length);
  const prevErrorsRef = useRef(errors);
  const prevStatusRef = useRef(status);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const prevErrors = prevErrorsRef.current || [];
      const currentErrors = errors || [];

      // Update cache when update errors or status
      if (
        // Error appear
        (!prevVisibleRef.current && currentErrors.length) ||
        // Error length changed
        prevErrors.length !== currentErrors.length ||
        // Error changed
        currentErrors.some((err, index) => err !== prevErrors[index])
      ) {
        if (errors.length) {
          prevVisibleRef.current = true;
          prevErrorsRef.current = errors;
          prevStatusRef.current = status;
        } else {
          prevVisibleRef.current = false;
        }

        forceUpdate();
      }
    }, 10);

    return () => {
      clearTimeout(timeout);
    };
  }, [errors]);

  return [prevVisibleRef.current, prevErrorsRef.current, prevStatusRef.current];
};
