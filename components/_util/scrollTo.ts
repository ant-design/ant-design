import raf from 'raf';
import getScroll from './getScroll';
import Eases from './eases';

type easeType = keyof typeof Eases;

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window;
  /** Scroll end callback */
  callback?: () => any;
  /** Animation duration, default as 450 */
  duration?: number;
  /** easing function, default as easeInOutCubic */
  ease?: easeType;
}

// TODO: support x
export default function scrollTo(x: number, y: number, options: ScrollToOptions = {}) {
  const {
    getContainer = () => window,
    callback,
    duration = 450,
    ease = 'easeInOutCubic',
  } = options;

  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();
  let easeFunc = Eases[ease];

  if (!easeFunc) {
    console.warn('Unknown easing funciton in scrollTo, default use easeInOutCubic');
    easeFunc = Eases.easeInOutCubic;
  }

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeFunc(time > duration ? duration : time, scrollTop, y, duration);
    if (container === window) {
      window.scrollTo(x, nextScrollTop);
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < duration) {
      raf(frameFunc);
    } else {
      if (typeof callback === 'function') callback();
    }
  };
  raf(frameFunc);
}
