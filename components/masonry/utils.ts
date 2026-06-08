import type { CSSProperties } from 'react';

import type { ItemHeightData } from './hooks/usePositions';

export const DEFAULT_ESTIMATED_ITEM_HEIGHT = 120;

export function getEstimatedItemHeight(
  itemHeights: ItemHeightData[],
  fallback = DEFAULT_ESTIMATED_ITEM_HEIGHT,
): number {
  const knownHeights = itemHeights.map(([, height]) => height).filter((height) => height > 0);
  if (knownHeights.length === 0) {
    return fallback;
  }
  return knownHeights.reduce((total, current) => total + current, 0) / knownHeights.length;
}

export interface MasonryItemStyleConfig {
  varName: (unit: string, fallbackVar?: string) => string;
  varRef: (unit: string, fallbackVar?: string) => string;
  horizontalGutter: number;
  columnCount: number;
  columnIndex: number;
  top?: number;
}

export function getMasonryItemStyle({
  varName,
  varRef,
  horizontalGutter,
  columnCount,
  columnIndex,
  top,
}: MasonryItemStyleConfig): CSSProperties {
  return {
    [varName('item-width')]: `calc((100% + ${horizontalGutter}px) / ${columnCount})`,
    insetInlineStart: `calc(${varRef('item-width')} * ${columnIndex})`,
    width: `calc(${varRef('item-width')} - ${horizontalGutter}px)`,
    top,
    position: 'absolute',
  };
}
