import * as React from 'react';

import type { ShowCollapsibleIconMode } from '../SplitBar';
import type { ItemType } from './useItems';

export type ResizableInfo = {
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  showStartCollapsibleIcon: ShowCollapsibleIconMode;
  showEndCollapsibleIcon: ShowCollapsibleIconMode;
};

type Option = { collapsible: boolean; showCollapsibleIcon: ShowCollapsibleIconMode };

function getShowCollapsibleIcon(prev: Option, next: Option) {
  if (prev.collapsible && next.collapsible) {
    if (prev.showCollapsibleIcon === true || next.showCollapsibleIcon === true) {
      return true;
    }
    if (prev.showCollapsibleIcon === 'auto' || next.showCollapsibleIcon === 'auto') {
      return 'auto';
    }
    return false;
  }
  if (prev.collapsible) {
    return prev.showCollapsibleIcon;
  }
  if (next.collapsible) {
    return next.showCollapsibleIcon;
  }
  return false;
}

export default function useResizable(items: ItemType[], pxSizes: number[], reverse: boolean) {
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
        // Allow size=0 if min=0 (explicit zero min), otherwise check if size > 0
        (prevSize !== 0 || prevMin === 0 || prevMin === '0' || prevMin === '0%' || !prevMin) &&
        // Next is not collapsed and limit min size
        // Allow size=0 if min=0 (explicit zero min), otherwise check if size > 0
        (nextSize !== 0 || nextMin === 0 || nextMin === '0' || nextMin === '0%' || !nextMin);

      const prevEndCollapsible = !!prevCollapsible.end && prevSize > 0;
      const nextStartExpandable = !!nextCollapsible.start && nextSize === 0 && prevSize > 0;
      const startCollapsible = prevEndCollapsible || nextStartExpandable;

      const nextStartCollapsible = !!nextCollapsible.start && nextSize > 0;
      const prevEndExpandable = !!prevCollapsible.end && prevSize === 0 && nextSize > 0;
      const endCollapsible = nextStartCollapsible || prevEndExpandable;

      const showStartCollapsibleIcon = getShowCollapsibleIcon(
        {
          collapsible: prevEndCollapsible,
          showCollapsibleIcon: prevCollapsible.showCollapsibleIcon,
        },
        {
          collapsible: nextStartExpandable,
          showCollapsibleIcon: nextCollapsible.showCollapsibleIcon,
        },
      );

      const showEndCollapsibleIcon = getShowCollapsibleIcon(
        {
          collapsible: nextStartCollapsible,
          showCollapsibleIcon: nextCollapsible.showCollapsibleIcon,
        },
        {
          collapsible: prevEndExpandable,
          showCollapsibleIcon: prevCollapsible.showCollapsibleIcon,
        },
      );

      resizeInfos[i] = {
        resizable: mergedResizable,
        startCollapsible: !!(reverse ? endCollapsible : startCollapsible),
        endCollapsible: !!(reverse ? startCollapsible : endCollapsible),
        showStartCollapsibleIcon: reverse ? showEndCollapsibleIcon : showStartCollapsibleIcon,
        showEndCollapsibleIcon: reverse ? showStartCollapsibleIcon : showEndCollapsibleIcon,
      };
    }

    return resizeInfos;
  }, [pxSizes, items, reverse]);
}
