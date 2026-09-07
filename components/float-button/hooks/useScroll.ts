import React from 'react';

import getScroll from '../../_util/getScroll';
import { isDocument, isHTMLElement, isWindow } from '../../_util/is';
import throttleByAnimationFrame from '../../_util/throttleByAnimationFrame';

type ScrollTarget = HTMLElement | Window | Document;

interface ScrollOptions {
  getTarget: () => ScrollTarget | null;
  showProgress: boolean;
  visibilityHeight: number;
}

const getScrollProgress = (target: ScrollTarget | null): number => {
  const scrollTop = getScroll(target);

  let scrollElement: HTMLElement | null = null;

  if (isWindow(target)) {
    scrollElement = target.document.documentElement;
  } else if (isDocument(target)) {
    scrollElement = target.documentElement;
  } else if (isHTMLElement(target)) {
    scrollElement = target;
  }

  if (!scrollElement) {
    return 0;
  }

  const maxScroll = Math.max(scrollElement.scrollHeight - scrollElement.clientHeight, 0);

  return maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
};

const useScroll = (options: ScrollOptions) => {
  const { getTarget, showProgress, visibilityHeight } = options;

  const [visible, setVisible] = React.useState(visibilityHeight === 0);

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const container = getTarget();
    const syncScrollState = () => {
      setVisible(getScroll(container) >= visibilityHeight);
      if (showProgress) {
        setScrollProgress(getScrollProgress(container));
      }
    };
    const handleScroll = throttleByAnimationFrame(syncScrollState);

    syncScrollState();
    container?.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [getTarget, showProgress, visibilityHeight]);

  React.useEffect(() => {
    if (!showProgress) {
      return;
    }
    const handleResize = throttleByAnimationFrame(() => {
      setScrollProgress(getScrollProgress(getTarget()));
    });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [getTarget, showProgress]);

  return { scrollProgress, visible } as const;
};

export default useScroll;
