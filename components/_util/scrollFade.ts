export const scrollFadeMaxHeight = 76;
export const scrollFadeScrollbarGutter = 10;

export const getScrollFadeVariables = (prefixCls: string) => {
  const normalizedPrefixCls = prefixCls.replace(/^\./, '');

  return {
    top: `--${normalizedPrefixCls}-scroll-fade-top-height`,
    bottom: `--${normalizedPrefixCls}-scroll-fade-bottom-height`,
  };
};

interface ScrollFadeOptions {
  topVariable: string;
  bottomVariable: string;
  maxFadeHeight?: number;
}

export const updateScrollFade = (
  frameElement: HTMLElement,
  scrollElement: HTMLElement,
  options: ScrollFadeOptions,
) => {
  const { topVariable, bottomVariable, maxFadeHeight = scrollFadeMaxHeight } = options;
  const maxScrollTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
  const distanceFromTop = scrollElement.scrollTop;
  const distanceFromBottom = maxScrollTop - scrollElement.scrollTop;

  frameElement.style.setProperty(
    topVariable,
    `${Math.min(maxFadeHeight, Math.max(0, distanceFromTop))}px`,
  );
  frameElement.style.setProperty(
    bottomVariable,
    `${Math.min(maxFadeHeight, Math.max(0, distanceFromBottom))}px`,
  );
};

export const observeScrollFade = (
  frameElement: HTMLElement,
  scrollElement: HTMLElement,
  options: ScrollFadeOptions,
): (() => void) => {
  const { topVariable, bottomVariable } = options;
  let animationFrame = 0;

  const updateFadeHeights = () => {
    updateScrollFade(frameElement, scrollElement, options);
  };

  const scheduleFadeUpdate = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(updateFadeHeights);
  };

  const resizeObserver = new ResizeObserver(scheduleFadeUpdate);
  const observeScrollElement = (element: HTMLElement) => {
    resizeObserver.observe(element);
    if (element.firstElementChild) {
      resizeObserver.observe(element.firstElementChild);
    }
  };

  updateFadeHeights();
  observeScrollElement(scrollElement);

  return () => {
    cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    frameElement.style.removeProperty(topVariable);
    frameElement.style.removeProperty(bottomVariable);
  };
};
