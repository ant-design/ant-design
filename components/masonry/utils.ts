import type { CSSProperties } from 'react';

import type { MasonryItemType } from './MasonryItem';

export interface MasonryItemStyleConfig {
  varName: (unit: string, fallbackVar?: string) => string;
  varRef: (unit: string, fallbackVar?: string) => string;
  horizontalGutter: number;
  columnCount: number;
  columnIndex: number;
  top?: number;
}

export function getItemKnownHeight(
  item: MasonryItemType,
  index: number,
  itemHeight?: (item: MasonryItemType, index: number) => number,
): number | undefined {
  if (item.height && item.height > 0) {
    return item.height;
  }

  if (itemHeight) {
    const height = itemHeight(item, index);
    if (height > 0) {
      return height;
    }
  }

  return undefined;
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
