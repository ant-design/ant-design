import * as React from 'react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { CSSMotionList } from '@rc-component/motion';
import ResizeObserver from '@rc-component/resize-observer';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import isEqual from '@rc-component/util/lib/isEqual';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { RowProps } from '../grid';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import useGutter from '../grid/hooks/useGutter';
import useDelay from './hooks/useDelay';
import usePositions from './hooks/usePositions';
import type { ItemHeightData } from './hooks/usePositions';
import useRefs from './hooks/useRefs';
import MasonryItem from './MasonryItem';
import type { MasonryItemType } from './MasonryItem';
import useStyle from './style';

export type Gap = number | undefined;

export type Key = string | number;

export type SemanticName = keyof MasonrySemanticClassNames & keyof MasonrySemanticStyles;

type MasonrySemanticClassNames = {
  root?: string;
  item?: string;
};

type MasonrySemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
};

export type MasonryClassNamesType = SemanticClassNamesType<MasonryProps, MasonrySemanticClassNames>;

export type MasonryStylesType = SemanticStylesType<MasonryProps, MasonrySemanticStyles>;

export interface MasonryProps<ItemDataType = any> {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: CSSProperties;

  classNames?: MasonryClassNamesType;
  styles?: MasonryStylesType;

  /** Spacing between items */
  gutter?: RowProps['gutter'];

  // Data
  items?: MasonryItemType<ItemDataType>[];

  itemRender?: (itemInfo: MasonryItemType<ItemDataType> & { index: number }) => React.ReactNode;

  /** Number of columns in the masonry grid layout */
  columns?: number | Partial<Record<Breakpoint, number>>;

  /** Trigger when item layout order changed */
  onLayoutChange?: (sortInfo: { key: React.Key; column: number }[]) => void;

  fresh?: boolean;
}

export interface MasonryRef {
  nativeElement: HTMLDivElement;
}

const Masonry = React.forwardRef<MasonryRef, MasonryProps>((props, ref) => {
  const {
    rootClassName,
    className,
    style,
    classNames,
    styles,
    columns,
    prefixCls: customizePrefixCls,
    gutter = 0,
    items,
    itemRender,
    onLayoutChange,
    fresh,
  } = props;

  // ======================= MISC =======================
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('masonry');

  const prefixCls = getPrefixCls('masonry', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================= Refs =======================
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: containerRef.current!,
  }));

  const [setItemRef, getItemRef] = useRefs();

  // ======================= Item =======================
  const [mergedItems, setMergedItems] = React.useState<MasonryItemType[]>([]);

  React.useEffect(() => {
    setMergedItems(items || []);
  }, [items]);

  const [viewState, setViewState] = useState({ scrollTop: 0, clientHeight: 0 });

  // ====================== Scroll ======================
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // find scrollable parent
    let scrollNode: HTMLElement | Window = window;
    let parent = container.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      const overflowY = style.overflowY;

      if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
        scrollNode = parent;
        break;
      }
      parent = parent.parentElement;
    }

    const handleScroll = throttleByAnimationFrame(() => {
      if (scrollNode instanceof Window) {
        setViewState({
          scrollTop: window.scrollY,
          clientHeight: window.innerHeight,
        });
      } else {
        const element = scrollNode as HTMLElement;

        setViewState({
          scrollTop: element.scrollTop,
          clientHeight: element.clientHeight,
        });
      }
    });

    scrollNode.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      scrollNode.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  // ==================== Breakpoint ====================
  const screens = useBreakpoint();
  const gutters = useGutter(gutter, screens);
  const [horizontalGutter = 0, verticalGutter = horizontalGutter] = gutters;

  // ====================== Layout ======================
  const columnCount = React.useMemo<number>(() => {
    if (!columns) {
      return 3;
    }

    if (typeof columns === 'number') {
      return columns;
    }

    // Find first matching responsive breakpoint
    const matchingBreakpoint = responsiveArray.find(
      (breakpoint) => screens[breakpoint] && columns[breakpoint] !== undefined,
    );

    if (matchingBreakpoint) {
      return columns[matchingBreakpoint] as number;
    }

    return columns.xs ?? 1;
  }, [columns, screens]);

  // =========== Merged Props for Semantic ==========
  const mergedProps: MasonryProps = {
    ...props,
    columns: columnCount,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    MasonryClassNamesType,
    MasonryStylesType,
    MasonryProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  // ================== Items Position ==================
  const [itemHeights, setItemHeights] = React.useState<ItemHeightData[]>([]);

  const averageHeight = React.useMemo(() => {
    let total = 0;
    let count = 0;

    itemHeights.forEach(([, height]) => {
      if (height > 0) {
        total += height;
        count += 1;
      }
    });

    return count > 0 ? Math.round(total / count) : 100;
  }, [itemHeights]);

  const allItemHeights = React.useMemo(() => {
    const heightMap = new Map<React.Key, number>(itemHeights.map(([key, height]) => [key, height]));

    return mergedItems.map((item, index) => {
      const key = item.key ?? index;
      const knownHeight = heightMap.get(key);
      const height = knownHeight !== undefined ? knownHeight : averageHeight;

      return [key, height, item.column] as ItemHeightData;
    });
  }, [mergedItems, itemHeights, averageHeight]);

  const collectItemSize = useDelay(() => {
    setItemHeights((prevItemsHeight) => {
      const prevHeightMap = new Map<React.Key, number>(
        prevItemsHeight.map(([key, height]) => [key, height]),
      );

      const nextItemsHeight: ItemHeightData[] = [];

      mergedItems.forEach((item, index) => {
        const itemKey = item.key ?? index;
        const itemEle = getItemRef(itemKey);
        const rect = itemEle?.getBoundingClientRect();

        if (rect) {
          nextItemsHeight.push([itemKey, rect.height, item.column]);
        } else {
          const prevHeight = prevHeightMap.get(itemKey);

          if (prevHeight !== undefined) {
            nextItemsHeight.push([itemKey, prevHeight, item.column]);
          }
        }
      });

      return isEqual(prevItemsHeight, nextItemsHeight) ? prevItemsHeight : nextItemsHeight;
    });
  });

  const [itemPositions, totalHeight] = usePositions(
    allItemHeights,
    columnCount,
    verticalGutter as number,
  );

  const itemWithPositions = React.useMemo(() => {
    return mergedItems.map((item, index) => {
      const key = item.key ?? index;
      const height = allItemHeights[index]?.[1] || 0;

      return {
        item,
        itemIndex: index,
        itemKey: key,
        key,
        position: itemPositions.get(key),
        height,
      };
    });
  }, [mergedItems, itemPositions, allItemHeights]);

  // ====================== Virtual ======================
  const visibleItems = React.useMemo(() => {
    if (!viewState.clientHeight) {
      return itemWithPositions.slice(0, 50);
    }

    const { scrollTop, clientHeight } = viewState;
    const buffer = clientHeight; // Render 1 screen buffer above and below

    return itemWithPositions.filter((item) => {
      // Always render items that haven't been measured yet
      if (!item.position) return false;

      const top = item.position?.top ?? 0;
      const bottom = top + item.height;

      return bottom > scrollTop - buffer && top < scrollTop + clientHeight + buffer;
    });
  }, [itemWithPositions, viewState]);

  useLayoutEffect(() => {
    collectItemSize();

    // eslint-disable-next-line compat/compat
    const rafId = requestAnimationFrame(collectItemSize);

    return () => cancelAnimationFrame(rafId);
  }, [mergedItems, columnCount, visibleItems]);

  // ==================== Layout Change ====================
  useLayoutEffect(() => {
    if (onLayoutChange && itemWithPositions.length) {
      const sortInfo = itemWithPositions.map(({ key, position }) => ({
        key,
        column: position?.column || 0,
      }));

      onLayoutChange(sortInfo);
    }
  }, [itemWithPositions, onLayoutChange]);

  // ====================== Render ======================
  return (
    <ResizeObserver onResize={collectItemSize}>
      <div
        ref={containerRef}
        className={clsx(
          prefixCls,
          contextClassName,
          mergedClassNames.root,
          rootClassName,
          className,
          hashId,
          cssVarCls,
          { [`${prefixCls}-rtl`]: direction === 'rtl' },
        )}
        style={{
          height: totalHeight,
          ...mergedStyles.root,
          ...contextStyle,
          ...style,
        }}
        // Listen for image events
        onLoad={collectItemSize}
        onError={collectItemSize}
      >
        <CSSMotionList
          keys={visibleItems}
          component={false}
          // Motion config
          motionAppear
          motionLeave
          motionName={`${prefixCls}-item-fade`}
        >
          {(motionInfo, motionRef) => {
            const {
              item,
              itemKey,
              position = {},
              itemIndex,

              key,
              className: motionClassName,
              style: motionStyle,
            } = motionInfo;
            const { column: columnIndex = 0 } = position;

            const itemStyle: CSSProperties = {
              '--item-width': `calc((100% + ${horizontalGutter}px) / ${columnCount})`,
              insetInlineStart: `calc(var(--item-width) * ${columnIndex})`,
              width: `calc(var(--item-width) - ${horizontalGutter}px)`,
              top: position.top,
              position: 'absolute',
            };

            return (
              <MasonryItem
                prefixCls={prefixCls}
                key={key}
                item={item}
                style={{ ...motionStyle, ...mergedStyles.item, ...itemStyle }}
                className={clsx(mergedClassNames.item, motionClassName)}
                ref={composeRef(motionRef, (ele) => setItemRef(itemKey, ele))}
                index={itemIndex}
                itemRender={itemRender}
                column={columnIndex}
                onResize={fresh ? collectItemSize : null}
              />
            );
          }}
        </CSSMotionList>
      </div>
    </ResizeObserver>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Masonry.displayName = 'Masonry';
}

export default Masonry as (<ItemDataType = any>(
  props: React.PropsWithChildren<MasonryProps<ItemDataType>> & React.RefAttributes<MasonryRef>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;
