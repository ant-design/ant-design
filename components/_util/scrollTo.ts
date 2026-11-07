import { raf } from '@rc-component/util';

import { easeInOutCubic } from './easings';
import getScroll from './getScroll';
import { isDocument, isFunction, isWindow } from './is';

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window | Document;
  /** Scroll end callback */
  callback?: () => void;
  /** Animation duration, default as 450 */
  duration?: number;
}

const scrollTo = (y: number, options: ScrollToOptions = {}) => {
  const { getContainer = () => window, callback, duration = 450 } = options;
  const container = getContainer();
  const scrollTop = getScroll(container);

  const scroll = (top: number) => {
    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, top);
    } else if (isDocument(container)) {
      container.documentElement.scrollTop = top;
    } else {
      container.scrollTop = top;
    }
  };

  if (duration <= 0) {
    scroll(y);
    if (isFunction(callback)) {
      callback();
    }
    return () => {};
  }

  const startTime = Date.now();

  let rafId: number;

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    scroll(nextScrollTop);
    if (time < duration) {
      rafId = raf(frameFunc);
    } else if (isFunction(callback)) {
      callback();
    }
  };
  rafId = raf(frameFunc);

  return () => {
    raf.cancel(rafId);
  };
};

export default scrollTo;
