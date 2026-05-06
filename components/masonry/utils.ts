import type { CSSProperties } from 'react';

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
