import { CSSMotionProps } from 'rc-motion';

export function getMotion(prefixCls: string, transitionName?: string): CSSMotionProps {
  return {
    motionName: transitionName ?? `${prefixCls}-move-up`,
  };
}

/** Wrap message open with promise like function */
export function wrapPromiseFn(openFn: (resolve: VoidFunction) => VoidFunction) {
  let closeFn: VoidFunction;

  const closePromise = new Promise<void>(resolve => {
    closeFn = openFn(resolve);
  });

  const result: any = () => {
    closeFn?.();
  };

  result.then = (filled: VoidFunction, rejected: VoidFunction) =>
    closePromise.then(filled, rejected);
  result.promise = closePromise;

  return result;
}
