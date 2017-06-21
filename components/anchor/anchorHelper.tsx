import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';

export const reqAnimFrame = getRequestAnimationFrame();

export const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
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

export function getOffsetTop(element: HTMLElement): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return rect.top - docElem.clientTop;
  }

  return rect.top;
}

export type Section = {
  top: number;
  bottom: number;
  section: any;
};

export function scrollTo(href: string, offsetTop = 0, target = getDefaultTarget, callback = () => { }) {
  const scrollTop = getScroll(target(), true);
  const targetElement = document.getElementById(href.substring(1));
  if (!targetElement) {
    return;
  }
  const eleOffsetTop = getOffsetTop(targetElement);
  const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
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
  private currentAnchor: HTMLAnchorElement | null;
  private _activeAnchor: string;

  constructor() {
    this.links = [];
    this.currentAnchor = null;
    this._activeAnchor = '';
  }

  addLink(link: string) {
    if (this.links.indexOf(link) === -1) {
      this.links.push(link);
    }
  }

  getCurrentActiveAnchor(): HTMLAnchorElement | null {
    return this.currentAnchor;
  }

  setActiveAnchor(component: HTMLAnchorElement) {
    this.currentAnchor = component;
  }

  getCurrentAnchor(offsetTop: number = 0, bounds = 5) {
    let activeAnchor = '';
    if (typeof document === 'undefined') {
      return activeAnchor;
    }

    const linksPositions = (this.links
      .map(section => {
        const target = document.getElementById(section.substring(1));
        if (target && getOffsetTop(target) < offsetTop + bounds) {
          const top = getOffsetTop(target);
          if (top <= offsetTop + bounds) {
            return {
              section,
              top,
              bottom: top + target.clientHeight,
            };
          }
        }
        return null;
      })
      .filter(section => section !== null) as Array<Section>);

    if (linksPositions.length) {
      const maxSection = linksPositions.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
      return maxSection.section;
    }
    return '';
  }

  scrollTo(href: string, offsetTop: number | undefined, target = getDefaultTarget, callback = () => { }) {
    scrollTo(href, offsetTop, target, callback);
  }
}

export default AnchorHelper;
