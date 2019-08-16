import raf from 'raf';
import getScroll from './getScroll';
import { easeInOutCubic } from './easings';

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window;
  /** Scroll end callback */
  callback?: () => any;
  /** Animation duration, default as 450 */
  duration?: number;
}

export default function scrollTo(y: number, options: ScrollToOptions = {}) {
  const { getContainer = () => window, callback, duration = 450 } = options;

  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < duration) {
      raf(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  raf(frameFunc);
}
