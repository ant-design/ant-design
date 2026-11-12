import * as React from 'react';
import type { CSSProperties } from 'react';
import ResizeObserver from '@rc-component/resize-observer';
import type { ResizeObserverProps } from '@rc-component/resize-observer';
import { clsx } from 'clsx';

import MasonryItem from './MasonryItem';
import type { MasonryRenderItem } from './Masonry';
import type { MasonryItemType } from './MasonryItem';
import { getMasonryItemStyle } from './utils';

interface VirtualMasonryProps<ItemDataType = any> {
  prefixCls: string;
  itemWithPositions: MasonryRenderItem<ItemDataType>[];
  itemRender?: (itemInfo: MasonryItemType<ItemDataType> & { index: number }) => React.ReactNode;
  mergedClassName?: string;
  mergedStyle?: React.CSSProperties;
  horizontalGutter: number;
  verticalGutter: number;
  columnCount: number;
  totalHeight: number;
  varName: (unit: string, fallbackVar?: string) => string;
  varRef: (unit: string, fallbackVar?: string) => string;
}

type ItemBound<ItemDataType> = {
  record: MasonryRenderItem<ItemDataType>;
  top: number;
  bottom: number;
};

const lowerBoundByBottom = <ItemDataType,>(
  bounds: ItemBound<ItemDataType>[],
  target: number,
): number => {
  let left = 0;
  let right = bounds.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (bounds[mid].bottom < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

const upperBoundByTop = <ItemDataType,>(
  bounds: ItemBound<ItemDataType>[],
  target: number,
): number => {
  let left = 0;
  let right = bounds.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (bounds[mid].top <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

const VirtualMasonry = <ItemDataType,>(props: VirtualMasonryProps<ItemDataType>) => {
  const {
    prefixCls,
    itemWithPositions,
    itemRender,
    mergedClassName,
    mergedStyle,
    horizontalGutter,
    verticalGutter,
    columnCount,
    totalHeight,
    varName,
    varRef,
  } = props;
  const holderRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const lastScrollTopRef = React.useRef(0);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const scrollRafRef = React.useRef<number | null>(null);

  const onHolderResize: ResizeObserverProps['onResize'] = (sizeInfo) => {
    setViewportHeight(sizeInfo.offsetHeight || sizeInfo.height);
  };

  React.useEffect(
    () => () => {
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    },
    [],
  );

  // When the dataset shrinks, the previous scrollTop can sit below all items.
  // Clamp both DOM scroll and React state so visibleItems stays non-empty.
  // Also cancel any pending scroll RAF so a stale nextTop cannot overwrite the clamp.
  React.useLayoutEffect(() => {
    if (scrollRafRef.current !== null) {
      window.cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }

    const holder = holderRef.current!;
    const maxScrollTop = Math.max(0, totalHeight - holder.clientHeight);
    if (holder.scrollTop > maxScrollTop) {
      holder.scrollTop = maxScrollTop;
    }

    const nextTop = holder.scrollTop;
    if (nextTop !== lastScrollTopRef.current) {
      lastScrollTopRef.current = nextTop;
      setScrollTop(nextTop);
    }
  }, [itemWithPositions, totalHeight]);

  const [columnBounds, averageItemHeight] = React.useMemo(() => {
    const columns: ItemBound<ItemDataType>[][] = Array.from({ length: columnCount }, () => []);
    let totalSpanHeight = 0;
    let itemCount = 0;

    for (let i = 0; i < itemWithPositions.length; i += 1) {
      const record = itemWithPositions[i];
      if (!record.position || !record.layoutHeight) {
        continue;
      }

      const top = record.position.top;
      const spanHeight = record.layoutHeight + verticalGutter;
      columns[record.position.column]?.push({
        record,
        top,
        bottom: top + spanHeight,
      });
      totalSpanHeight += spanHeight;
      itemCount += 1;
    }

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex += 1) {
      columns[columnIndex].sort((a, b) => a.top - b.top);
    }

    return [columns, itemCount ? totalSpanHeight / itemCount : 0] as const;
  }, [columnCount, itemWithPositions, verticalGutter]);

  const visibleItems = React.useMemo(() => {
    // Without a constrained viewport (e.g. missing container height), keep the
    // window empty instead of treating unbounded growth as "everything visible".
    if (viewportHeight <= 0) {
      return [] as MasonryRenderItem<ItemDataType>[];
    }

    const baseOverscan = Math.max(viewportHeight * 0.8, averageItemHeight * 3);
    const overscanTop = scrollDirection === 'up' ? baseOverscan * 2 : baseOverscan;
    const overscanBottom = scrollDirection === 'down' ? baseOverscan * 2 : baseOverscan;
    const start = Math.max(0, scrollTop - overscanTop);
    const end = scrollTop + viewportHeight + overscanBottom;

    const result: MasonryRenderItem<ItemDataType>[] = [];
    for (let columnIndex = 0; columnIndex < columnBounds.length; columnIndex += 1) {
      const bounds = columnBounds[columnIndex];
      if (!bounds.length) {
        continue;
      }

      const startIndex = lowerBoundByBottom(bounds, start);
      const endIndex = upperBoundByTop(bounds, end);
      for (let index = startIndex; index < endIndex; index += 1) {
        result.push(bounds[index].record);
      }
    }

    result.sort((a, b) => a.itemIndex - b.itemIndex);
    return result;
  }, [averageItemHeight, columnBounds, scrollDirection, scrollTop, viewportHeight]);

  return (
    <ResizeObserver onResize={onHolderResize}>
      <div
        ref={holderRef}
        className={`${prefixCls}-virtual-holder`}
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        onScroll={() => {
          if (scrollRafRef.current !== null) {
            window.cancelAnimationFrame(scrollRafRef.current);
          }
          scrollRafRef.current = window.requestAnimationFrame(() => {
            scrollRafRef.current = null;
            const holder = holderRef.current;
            if (!holder) {
              return;
            }
            // Read the live scroll offset so a clamp from dataset shrink wins over
            // a stale value captured when the scroll event was queued.
            const latestTop = holder.scrollTop;
            setScrollDirection(latestTop >= lastScrollTopRef.current ? 'down' : 'up');
            lastScrollTopRef.current = latestTop;
            setScrollTop(latestTop);
          });
        }}
      >
        <div
          className={`${prefixCls}-virtual-inner`}
          style={{ height: totalHeight, position: 'relative' }}
        >
          {visibleItems.map((record) => {
            const columnIndex = record.position!.column;
            const top = record.position!.top;

            const itemStyle: CSSProperties = {
              ...mergedStyle,
              ...getMasonryItemStyle({
                varName,
                varRef,
                horizontalGutter,
                columnCount,
                columnIndex,
                top,
              }),
            };

            return (
              <MasonryItem
                prefixCls={prefixCls}
                key={record.itemKey}
                item={record.item}
                style={itemStyle}
                className={clsx(mergedClassName, `${prefixCls}-item-fade`)}
                index={record.itemIndex}
                itemRender={itemRender}
                column={columnIndex}
                onResize={null}
              />
            );
          })}
        </div>
      </div>
    </ResizeObserver>
  );
};

export default VirtualMasonry;
