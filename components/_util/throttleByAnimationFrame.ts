import raf from 'rc-util/lib/raf';

type throttledFn = (...args: any[]) => void;

type throttledCancelFn = { cancel: () => void };

function throttleByAnimationFrame<T extends any[]>(fn: (...args: T) => void) {
  let requestId: number | null;

  const later = (args: T) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled: throttledFn & throttledCancelFn = (...args: T) => {
    if (requestId == null) {
      requestId = raf(later(args));
    }
  };

  throttled.cancel = () => {
    raf.cancel(requestId!);
    requestId = null;
  };

  return throttled;
}

export default throttleByAnimationFrame;
