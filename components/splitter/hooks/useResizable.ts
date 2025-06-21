import * as React from 'react';

import type { ShowCollapsedIconMode } from '../SplitBar';
import type { ItemType } from './useItems';

export type ResizableInfo = {
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  showStartCollapsedIcon: ShowCollapsedIconMode;
  showEndCollapsedIcon: ShowCollapsedIconMode;
};

type Option = { collapsible: boolean; showCollapsedIcon: ShowCollapsedIconMode };

function getShowCollapsedIcon(prev: Option, next: Option) {
  if (prev.collapsible && next.collapsible) {
    if (prev.showCollapsedIcon === true || next.showCollapsedIcon === true) {
      return true;
    }
    if (prev.showCollapsedIcon === 'auto' || next.showCollapsedIcon === 'auto') {
      return 'auto';
    }
    return false;
  }
  if (prev.collapsible) {
    return prev.showCollapsedIcon;
  }
  if (next.collapsible) {
    return next.showCollapsedIcon;
  }
  return false;
}

export default function useResizable(items: ItemType[], pxSizes: number[], isRTL: boolean) {
  return React.useMemo(() => {
    const resizeInfos: ResizableInfo[] = [];

    for (let i = 0; i < items.length - 1; i += 1) {
      const prevItem = items[i];
      const nextItem = items[i + 1];
      const prevSize = pxSizes[i];
      const nextSize = pxSizes[i + 1];

      const {
        resizable: prevResizable = true,
        min: prevMin,
        collapsible: prevCollapsible,
      } = prevItem;
      const {
        resizable: nextResizable = true,
        min: nextMin,
        collapsible: nextCollapsible,
      } = nextItem;

      const mergedResizable =
        // Both need to be resizable
        prevResizable &&
        nextResizable &&
        // Prev is not collapsed and limit min size
        (prevSize !== 0 || !prevMin) &&
        // Next is not collapsed and limit min size
        (nextSize !== 0 || !nextMin);

      const prevEndCollapsible = !!prevCollapsible.end && prevSize > 0;
      const nextStartExpandable = !!nextCollapsible.start && nextSize === 0 && prevSize > 0;
      const startCollapsible = prevEndCollapsible || nextStartExpandable;

      const nextStartCollapsible = !!nextCollapsible.start && nextSize > 0;
      const prevEndExpandable = !!prevCollapsible.end && prevSize === 0 && nextSize > 0;
      const endCollapsible = nextStartCollapsible || prevEndExpandable;

      const showStartCollapsedIcon = getShowCollapsedIcon(
        {
          collapsible: prevEndCollapsible,
          showCollapsedIcon: prevCollapsible.showCollapsedIcon,
        },
        {
          collapsible: nextStartExpandable,
          showCollapsedIcon: nextCollapsible.showCollapsedIcon,
        },
      );

      const showEndCollapsedIcon = getShowCollapsedIcon(
        {
          collapsible: nextStartCollapsible,
          showCollapsedIcon: nextCollapsible.showCollapsedIcon,
        },
        {
          collapsible: prevEndExpandable,
          showCollapsedIcon: prevCollapsible.showCollapsedIcon,
        },
      );

      resizeInfos[i] = {
        resizable: mergedResizable,
        startCollapsible: !!(isRTL ? endCollapsible : startCollapsible),
        endCollapsible: !!(isRTL ? startCollapsible : endCollapsible),
        showStartCollapsedIcon: isRTL ? showEndCollapsedIcon : showStartCollapsedIcon,
        showEndCollapsedIcon: isRTL ? showStartCollapsedIcon : showEndCollapsedIcon,
      };
    }

    return resizeInfos;
  }, [pxSizes, items]);
}
