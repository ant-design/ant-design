import * as React from 'react';
import type { CSSProperties } from 'react';
import VirtualList from '@rc-component/virtual-list';
import { clsx } from 'clsx';

import MasonryItem from './MasonryItem';
import type { MasonryRenderItem } from './Masonry';
import type { MasonryItemType } from './MasonryItem';

interface VirtualMasonryProps<ItemDataType = any> {
  prefixCls: string;
  itemWithPositions: MasonryRenderItem<ItemDataType>[];
  setItemRef: (key: React.Key, element: HTMLDivElement | null) => void;
  itemRender?: (itemInfo: MasonryItemType<ItemDataType> & { index: number }) => React.ReactNode;
  mergedClassName?: string;
  mergedStyle?: React.CSSProperties;
  collectItemSize: VoidFunction;
  fresh?: boolean;
  horizontalGutter: number;
  verticalGutter: number;
  columnCount: number;
  totalHeight: number;
  varName: (unit: string, fallbackVar?: string) => string;
  varRef: (unit: string, fallbackVar?: string) => string;
}

const DEFAULT_ITEM_HEIGHT = 100;

const VirtualMasonry = <ItemDataType,>(props: VirtualMasonryProps<ItemDataType>) => {
  const {
    prefixCls,
    itemWithPositions,
    setItemRef,
    itemRender,
    mergedClassName,
    mergedStyle,
    collectItemSize,
    fresh,
    horizontalGutter,
    verticalGutter,
    columnCount,
    totalHeight,
    varName,
    varRef,
  } = props;

  const [listHeight, setListHeight] = React.useState(() =>
    Math.max(
      1,
      Math.min(totalHeight, typeof window === 'undefined' ? totalHeight : window.innerHeight),
    ),
  );

  React.useEffect(() => {
    const updateListHeight = () => {
      setListHeight(Math.max(1, Math.min(totalHeight, window.innerHeight)));
    };

    updateListHeight();
    window.addEventListener('resize', updateListHeight);

    return () => {
      window.removeEventListener('resize', updateListHeight);
    };
  }, [totalHeight]);

  const columnItems = React.useMemo(() => {
    const grouped = new Map<number, MasonryRenderItem<ItemDataType>[]>();

    for (let i = 0; i < columnCount; i += 1) {
      grouped.set(i, []);
    }

    itemWithPositions.forEach((record) => {
      const column = record.position?.column ?? 0;
      const current = grouped.get(column) || [];
      current.push(record);
      grouped.set(column, current);
    });

    grouped.forEach((items) => {
      items.sort((a, b) => (a.position?.top ?? 0) - (b.position?.top ?? 0));
    });

    return grouped;
  }, [columnCount, itemWithPositions]);

  const columnIndexes = React.useMemo(
    () => Array.from({ length: columnCount }, (_, index) => index),
    [columnCount],
  );

  return (
    <>
      {columnIndexes.map((columnIndex) => {
        const data = columnItems.get(columnIndex) || [];
        const columnStyle: CSSProperties = {
          [varName('item-width')]: `calc((100% + ${horizontalGutter}px) / ${columnCount})`,
          insetInlineStart: `calc(${varRef('item-width')} * ${columnIndex})`,
          width: `calc(${varRef('item-width')} - ${horizontalGutter}px)`,
          top: 0,
          position: 'absolute',
          height: totalHeight,
          overflow: 'hidden',
        };

        return (
          <div key={`virtual-column-${columnIndex}`} style={columnStyle}>
            <VirtualList
              data={data}
              itemKey="itemKey"
              itemHeight={DEFAULT_ITEM_HEIGHT}
              height={listHeight}
              onScroll={collectItemSize}
            >
              {(record) => (
                <MasonryItem
                  prefixCls={prefixCls}
                  key={record.itemKey}
                  item={record.item}
                  style={{
                    ...mergedStyle,
                    marginBottom: verticalGutter,
                    width: '100%',
                    position: 'relative',
                  }}
                  className={clsx(mergedClassName, `${prefixCls}-item-fade`)}
                  ref={(ele) => {
                    setItemRef(record.itemKey, ele);
                  }}
                  index={record.itemIndex}
                  itemRender={itemRender}
                  column={columnIndex}
                  onResize={fresh ? collectItemSize : null}
                />
              )}
            </VirtualList>
          </div>
        );
      })}
    </>
  );
};

export default VirtualMasonry;
