import { CSSMotionList } from '@rc-component/motion';
import ResizeObserver from '@rc-component/resize-observer';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import isEqual from '@rc-component/util/lib/isEqual';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';
import type { CSSProperties } from 'react';
import * as React from 'react';

import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import type { Breakpoint } from '../_util/responsiveObserver';
import { responsiveArray } from '../_util/responsiveObserver';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { RowProps } from '../grid';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import useGutter from '../grid/hooks/useGutter';
import { genCssVar } from '../theme/util/genStyleUtils';
import useDelay from './hooks/useDelay';
import type { ItemHeightData } from './hooks/usePositions';
import usePositions from './hooks/usePositions';
import useRefs from './hooks/useRefs';
import type { ItemPosition } from './hooks/useVirtualScroll';
import useVirtualScroll from './hooks/useVirtualScroll';
import type { MasonryItemType } from './MasonryItem';
import MasonryItem from './MasonryItem';
import useStyle from './style';

export type Gap = number | undefined;

export type Key = string | number;

export type MasonrySemanticName = keyof MasonrySemanticClassNames & keyof MasonrySemanticStyles;

export type MasonrySemanticClassNames = {
  root?: string;
  item?: string;
};

export type MasonrySemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
};

export type MasonryClassNamesType = SemanticClassNamesType<MasonryProps, MasonrySemanticClassNames>;

export type MasonryStylesType = SemanticStylesType<MasonryProps, MasonrySemanticStyles>;

export interface VirtualConfig {
  /** Container height in pixels (REQUIRED) */
  height: number;
  /** Estimated item height for position calculation (REQUIRED) */
  itemHeight: number;
  /** Number of items to render outside visible area. Default: columnCount * 2 */
  buffer?: number;
}

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

  /** Enable virtual scrolling for large datasets */
  virtual?: VirtualConfig;

  /** Callback when scroll reaches near the end (for infinite loading) */
  onScrollEnd?: () => void;
}

export interface MasonryRef {
  nativeElement: HTMLDivElement;
}

type ItemColumnsType = [item: MasonryItemType, column: number];

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
    virtual,
    onScrollEnd,
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
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [varName, varRef] = genCssVar(rootPrefixCls, 'masonry');

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

  // ================== Height Cache for Virtual ==================
  // Use Map for O(1) lookups instead of array operations
  const heightCacheRef = React.useRef<Map<Key, number>>(new Map());

  // ================== Items Position ==================
  const [itemHeights, setItemHeights] = React.useState<ItemHeightData[]>([]);

  const collectItemSize = useDelay(() => {
    const nextItemsHeight: ItemHeightData[] = [];

    mergedItems.forEach((item, index) => {
      const itemKey = (item.key ?? index) as Key;
      const itemEle = getItemRef(itemKey);
      const rect = itemEle?.getBoundingClientRect();

      if (rect && rect.height > 0) {
        // Cache measured height for virtual scroll
        heightCacheRef.current.set(itemKey, rect.height);
        nextItemsHeight.push([itemKey, rect.height, item.column]);
      } else if (virtual) {
        // In virtual mode, prioritize: declared height > cached height > estimated height
        const declaredHeight = item.height;
        const cachedHeight = heightCacheRef.current.get(itemKey);
        const estimatedHeight = declaredHeight ?? cachedHeight ?? virtual.itemHeight;
        nextItemsHeight.push([itemKey, estimatedHeight, item.column]);
      } else {
        nextItemsHeight.push([itemKey, 0, item.column]);
      }
    });

    setItemHeights((prevItemsHeight) =>
      isEqual(prevItemsHeight, nextItemsHeight) ? prevItemsHeight : nextItemsHeight,
    );
  });

  const [itemPositions, totalHeight] = usePositions(
    itemHeights,
    columnCount,
    verticalGutter as number,
  );

  const itemWithPositions = React.useMemo(
    () =>
      mergedItems.map((item, index) => {
        const key = (item.key ?? index) as Key;
        return {
          item,
          itemIndex: index,
          // CSSMotion will transform key to string.
          // Let's keep the original key here.
          itemKey: key,
          key,
          position: itemPositions.get(key),
        };
      }),
    [mergedItems, itemPositions],
  );

  // ================== Sorted Positions for Virtual ==================
  const sortedPositions = React.useMemo<ItemPosition[]>(() => {
    if (!virtual) {
      return [];
    }

    const positions: ItemPosition[] = [];
    itemWithPositions.forEach(({ itemKey, position }) => {
      if (position) {
        positions.push({
          key: itemKey as Key,
          top: position.top,
          column: position.column,
        });
      }
    });

    // Sort by top position for binary search
    positions.sort((a, b) => a.top - b.top);
    return positions;
  }, [virtual, itemWithPositions]);

  // ================== Virtual Scroll ==================
  const { visibleKeys, onScroll } = useVirtualScroll({
    containerHeight: virtual?.height ?? 0,
    itemHeight: virtual?.itemHeight ?? 0,
    sortedPositions,
    totalHeight,
    buffer: virtual?.buffer,
    columnCount,
    onScrollEnd,
  });

  // ================== Visible Items for Virtual ==================
  const visibleItems = React.useMemo(() => {
    if (!virtual) {
      return itemWithPositions;
    }

    // In virtual mode, only render visible items
    return itemWithPositions.filter(({ itemKey }) => visibleKeys.has(itemKey as Key));
  }, [virtual, itemWithPositions, visibleKeys]);

  React.useEffect(() => {
    collectItemSize();
  }, [mergedItems, columnCount]);

  // Trigger for `onLayoutChange`
  const [itemColumns, setItemColumns] = React.useState<ItemColumnsType[]>([]);

  useLayoutEffect(() => {
    if (onLayoutChange && itemWithPositions.every(({ position }) => position)) {
      setItemColumns((prevItemColumns) => {
        // Use Map for O(1) lookups instead of find() in map()
        const positionMap = new Map(
          itemWithPositions.map(({ item, position }) => [item.key, position!.column]),
        );

        const nextItemColumns = itemWithPositions.map<ItemColumnsType>(({ item, position }) => [
          item,
          position!.column,
        ]);

        // Only update if columns actually changed
        let changed = prevItemColumns.length !== nextItemColumns.length;
        if (!changed) {
          for (let i = 0; i < prevItemColumns.length; i++) {
            const [prevItem, prevColumn] = prevItemColumns[i];
            const newColumn = positionMap.get(prevItem.key);
            if (newColumn !== prevColumn) {
              changed = true;
              break;
            }
          }
        }

        return changed ? nextItemColumns : prevItemColumns;
      });
    }
  }, [itemWithPositions]);

  useLayoutEffect(() => {
    if (onLayoutChange && items && items.length === itemColumns.length) {
      onLayoutChange(itemColumns.map(([item, column]) => ({ ...item, column })));
    }
  }, [itemColumns]);

  // ====================== Render ======================
  const renderItem = (
    itemData: {
      item: MasonryItemType;
      itemKey: Key;
      position?: { column: number; top: number };
      itemIndex: number;
      key: Key;
    },
    itemRef: React.Ref<HTMLDivElement>,
    extraClassName?: string,
    extraStyle?: CSSProperties,
  ) => {
    const { item, itemKey, position, itemIndex, key } = itemData;
    const columnIndex = position?.column ?? 0;
    const topPosition = position?.top;

    const itemStyle: CSSProperties = {
      [varName('item-width')]: `calc((100% + ${horizontalGutter}px) / ${columnCount})`,
      insetInlineStart: `calc(${varRef('item-width')} * ${columnIndex})`,
      width: `calc(${varRef('item-width')} - ${horizontalGutter}px)`,
      top: topPosition,
      position: 'absolute',
    };

    return (
      <MasonryItem
        prefixCls={prefixCls}
        key={key}
        item={item}
        style={{ ...extraStyle, ...mergedStyles.item, ...itemStyle }}
        className={clsx(mergedClassNames.item, extraClassName)}
        ref={composeRef(itemRef, (ele) => setItemRef(itemKey, ele))}
        index={itemIndex}
        itemRender={itemRender}
        column={columnIndex}
        onResize={fresh ? collectItemSize : null}
      />
    );
  };

  // Virtual mode: use scroll container with explicit height
  if (virtual) {
    return (
      <div
        ref={containerRef}
        className={clsx(
          prefixCls,
          `${prefixCls}-virtual`,
          contextClassName,
          mergedClassNames.root,
          rootClassName,
          className,
          hashId,
          cssVarCls,
          { [`${prefixCls}-rtl`]: direction === 'rtl' },
        )}
        style={{
          height: virtual.height,
          overflowY: 'auto',
          ...mergedStyles.root,
          ...contextStyle,
          ...style,
        }}
        onScroll={onScroll}
      >
        <div
          style={{
            height: totalHeight,
            position: 'relative',
          }}
          // Listen for image events
          onLoad={collectItemSize}
          onError={collectItemSize}
        >
          {visibleItems.map((itemData) => renderItem(itemData, null))}
        </div>
      </div>
    );
  }

  // Normal mode: use CSSMotionList for animations
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
        style={{ height: totalHeight, ...mergedStyles.root, ...contextStyle, ...style }}
        // Listen for image events
        onLoad={collectItemSize}
        onError={collectItemSize}
      >
        <CSSMotionList
          keys={itemWithPositions}
          component={false}
          // Motion config
          motionAppear
          motionLeave
          motionName={`${prefixCls}-item-fade`}
        >
          {(motionInfo, motionRef) => {
            const {
              className: motionClassName,
              style: motionStyle,
              ...restMotionInfo
            } = motionInfo;
            return renderItem(restMotionInfo as any, motionRef, motionClassName, motionStyle);
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
