import * as React from 'react';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';

import type { StepsProps } from './index';

type StepItem = NonNullable<StepsProps['items']>[number];

type DisplayStep = {
  item: StepItem;
  originIndex: number;
};

type UseDisplayStepsResult = {
  canApplyMaxCount: boolean;
  displaySteps: DisplayStep[];
  mappedDisplayCurrent: number;
  displayItems: StepItem[];
};

/**
 * Normalize a real item into the collapsed display list.
 * The original item key is preserved when provided, otherwise the original index keeps
 * React reconciliation stable while visible steps move around the collapsed list.
 */
function getDisplayStep(item: StepItem, index: number): DisplayStep {
  return {
    item: {
      ...item,
      key: item.key ?? index,
    },
    originIndex: index,
  };
}

/**
 * Build the disabled ellipsis item between two visible steps.
 * Its status reflects the hidden range so the connector still communicates
 * finished or error progress, and its key is derived from the adjacent real steps.
 */
function getEllipsisStep(
  items: StepItem[],
  currentIndex: number,
  prevIndex: number,
  nextIndex: number,
  prefixCls: string,
): DisplayStep {
  const prevKey = items[prevIndex].key ?? prevIndex;
  const nextKey = items[nextIndex].key ?? nextIndex;
  const hasError = items.slice(prevIndex + 1, nextIndex).some((step) => step.status === 'error');
  const ellipsisStatus = hasError ? 'error' : nextIndex - 1 < currentIndex ? 'finish' : 'wait';

  return {
    item: {
      key: `ellipsis-${prevKey}-${nextKey}`,
      title: '',
      icon: React.createElement(EllipsisOutlined),
      status: ellipsisStatus,
      disabled: true,
      className: `${prefixCls}-item-ellipsis`,
    },
    originIndex: -1,
  };
}

/**
 * Pick the real step indexes that should remain visible when `maxCount` applies.
 * First, last, and current are always kept. Remaining slots are filled by priority:
 * current left, current right, first right, last left, then repeat at larger distances.
 *
 * `null` is inserted between non-contiguous indexes and later rendered as an ellipsis.
 */
function getCollapsedIndexes(
  total: number,
  currentIndex: number,
  maxCount: number,
): Array<number | null> {
  const safeCurrent = Math.min(Math.max(currentIndex, 0), total - 1);
  const firstIndex = 0;
  const lastIndex = total - 1;
  const visibleCount = Math.min(maxCount, total);

  if (visibleCount < 5) {
    return Array.from(new Set([firstIndex, safeCurrent, lastIndex])).sort((a, b) => a - b);
  }

  const edgeCount = visibleCount - 2;

  if (safeCurrent <= edgeCount - 1) {
    return [...Array.from({ length: edgeCount }, (_, index) => index), null, lastIndex];
  }

  if (safeCurrent >= total - edgeCount) {
    return [
      firstIndex,
      null,
      ...Array.from({ length: edgeCount }, (_, index) => total - edgeCount + index),
    ];
  }

  const middleCount = visibleCount - 4;
  const middleStart = safeCurrent - Math.floor((middleCount - 1) / 2);

  return [
    firstIndex,
    null,
    ...Array.from({ length: middleCount }, (_, index) => middleStart + index),
    null,
    lastIndex,
  ];
}

/**
 * Convert the original items/current into the list consumed by rc-steps.
 * When steps are collapsed, rc-steps receives a compact item list and a remapped current,
 * while callers still interact with the original step indexes through `onChange`.
 */
export default function useDisplaySteps(
  mergedItems: StepItem[],
  current: number,
  initial: number,
  maxCount: number | undefined,
  prefixCls: string,
): UseDisplayStepsResult {
  const canApplyMaxCount = maxCount !== undefined && maxCount >= 3 && mergedItems.length > maxCount;

  const mappedCurrent = current;

  const displaySteps = React.useMemo<DisplayStep[]>(() => {
    if (!canApplyMaxCount) {
      return mergedItems.map((item, originIndex) => ({ item, originIndex }));
    }

    const collapsedIndexes = getCollapsedIndexes(mergedItems.length, mappedCurrent, maxCount);

    return collapsedIndexes.map((index, collapsedIndex) =>
      index === null
        ? getEllipsisStep(
            mergedItems,
            mappedCurrent,
            collapsedIndexes[collapsedIndex - 1] as number,
            collapsedIndexes[collapsedIndex + 1] as number,
            prefixCls,
          )
        : getDisplayStep(mergedItems[index], index),
    );
  }, [canApplyMaxCount, mappedCurrent, mergedItems, maxCount, prefixCls]);

  const displayCurrent = displaySteps.findIndex((step) => step.originIndex === mappedCurrent);

  return {
    canApplyMaxCount,
    displaySteps,
    mappedDisplayCurrent: displayCurrent >= 0 ? displayCurrent : mappedCurrent,
    displayItems: displaySteps.map((step) => step.item),
  };
}
