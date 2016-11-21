import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

export const reqAnimFrame = getRequestAnimationFrame();

export const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
};

export function getDefaultTarget() {
  return typeof window !== 'undefined' ?
    window : null;
}

export function getOffsetTop(element): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if ( rect.width || rect.height ) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return  rect.top - docElem.clientTop;
  }

  return rect.top;
}

export function scrollTo(href, target = getDefaultTarget, callback = () => {}) {
  const scrollTop = getScroll(target(), true);
  const targetElement = document.getElementById(href.substring(1));
  if (!targetElement) {
    return;
  }
  const offsetTop = getOffsetTop(targetElement);
  const targetScrollTop = scrollTop + offsetTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    window.scrollTo(window.pageXOffset, easeInOutCubic(time, scrollTop, targetScrollTop, 450));
    if (time < 450) {
      reqAnimFrame(frameFunc);
    } else {
      callback();
    }
  };
  reqAnimFrame(frameFunc);
  history.pushState(null, '', href);
}

class AnchorHelper {
  private links: Array<string>;
  private currentAnchor: HTMLElement | null;
  private _activeAnchor: string;

  constructor() {
    this.links = [];
    this.currentAnchor = null;
    this._activeAnchor = '';
  }

  addLink(link) {
    if (this.links.indexOf(link) === -1) {
      this.links.push(link);
    }
  }

  getCurrentActiveAnchor(): HTMLElement | null {
    return this.currentAnchor;
  }

  setActiveAnchor(component) {
    this.currentAnchor = component;
  }

  getCurrentAnchor(bounds = 5) {
    let activeAnchor = '';
    if (typeof document === 'undefined') {
      return activeAnchor;
    }

    this.links.forEach(section => {
      const target = document.getElementById(section.substring(1));
      if (target) {
        const top = getOffsetTop(target);
        const bottom = top + target.clientHeight;
        if ((top <= bounds) && (bottom >= -bounds)) {
          activeAnchor = section;
        }
      }
    });
    this._activeAnchor = activeAnchor || this._activeAnchor;
    return this._activeAnchor;
  }

  scrollTo(href, target = getDefaultTarget, callback = () => {}) {
    scrollTo(href, target, callback);
  }
}

export default AnchorHelper;
