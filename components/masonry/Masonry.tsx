import * as React from 'react';
import type { CSSProperties } from 'react';
import { CSSMotionList } from '@rc-component/motion';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import isEqual from '@rc-component/util/lib/isEqual';
import { composeRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';

import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
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
export interface MasonryProps<ItemDateType = any> {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: CSSProperties;

  /** Spacing between items */
  gutter?: RowProps['gutter'];

  // Data
  items: MasonryItemType<ItemDateType>[];

  itemRender?: (itemInfo: MasonryItemType<ItemDateType> & { index: number }) => React.ReactNode;

  /** Number of columns in the masonry grid layout */
  columns: number | Partial<Record<Breakpoint, number>>;

  /** Trigger when sort order changed */
  onSortChange?: (sortInfo: { key: React.Key; column: number }[]) => void;

  fresh?: boolean;
}

export interface MasonryRef {
  nativeElement: HTMLDivElement;
}

const Masonry = React.forwardRef<MasonryRef, MasonryProps>((props, ref) => {
  const {
    className,
    rootClassName,
    style,
    columns,
    prefixCls: customizePrefixCls,
    gutter = 0,
    items = [],
    itemRender,
    onSortChange,
    fresh,
  } = props;

  // ======================= MISC =======================
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('masonry', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================= Refs =======================
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: containerRef.current!,
  }));

  const [setItemRef, getItemRef] = useRefs();

  // ==================== Breakpoint ====================
  const screens = useBreakpoint();
  const gutters = useGutter(gutter, screens);
  const [horizontalGutter = 0, verticalGutter = horizontalGutter] = gutters;
  const halfHorizontalGutter = horizontalGutter / 2;

  // ====================== Layout ======================
  const columnCount = React.useMemo<number>(() => {
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

  // ================== Items Position ==================
  const [itemHeights, setItemHeights] = React.useState<ItemHeightData[]>([]);

  const collectItemSize = useDelay(() => {
    const nextItemsHeight = items.map((item, index): ItemHeightData => {
      const itemKey = item.key ?? index;
      const itemEle = getItemRef(itemKey);
      const rect = itemEle?.getBoundingClientRect();
      return [itemKey, rect ? rect.height : 0, item.column];
    });

    setItemHeights((prevItemsHeight) =>
      isEqual(prevItemsHeight, nextItemsHeight) ? prevItemsHeight : nextItemsHeight,
    );
  });

  const [itemPositions, totalHeight] = usePositions(itemHeights, columnCount, verticalGutter);

  const itemWithPositions = React.useMemo(
    () =>
      items.map((item, index) => {
        const key = item.key ?? index;
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
    [items, itemPositions],
  );

  React.useEffect(() => {
    collectItemSize();
  }, [items, columnCount]);

  // Trigger for `onSortChange`
  type ItemColumnsType = [item: MasonryItemType, column: number][];
  const [itemColumns, setItemColumns] = React.useState<ItemColumnsType>([]);
  useLayoutEffect(() => {
    if (onSortChange && itemWithPositions.every(({ position }) => position)) {
      setItemColumns((prevItemColumns: ItemColumnsType) => {
        const nextItemColumns: ItemColumnsType = itemWithPositions.map(({ item, position }) => [
          item,
          position!.column,
        ]);
        return isEqual(prevItemColumns, nextItemColumns) ? prevItemColumns : nextItemColumns;
      });
    }
  }, [itemWithPositions]);

  useLayoutEffect(() => {
    if (onSortChange && items.length === itemColumns.length) {
      onSortChange(itemColumns.map(([item, column]) => ({ ...item, column })));
    }
  }, [itemColumns]);

  // ====================== Render ======================
  return wrapCSSVar(
    <ResizeObserver onResize={collectItemSize}>
      <div
        ref={containerRef}
        className={classNames(prefixCls, rootClassName, className, hashId, cssVarCls, {
          [`${prefixCls}-rtl`]: direction === 'rtl',
        })}
        style={{
          height: totalHeight,
          marginInline: -halfHorizontalGutter,
          ...style,
        }}
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
              insetInlineStart: `calc(${(columnIndex / columnCount) * 100}% + ${halfHorizontalGutter}px)`,
              width: `calc(${100 / columnCount}% - ${horizontalGutter}px)`,
              top: position.top,
              position: 'absolute',
            };

            return (
              <MasonryItem
                prefixCls={prefixCls}
                key={key}
                item={item}
                style={{ ...motionStyle, ...itemStyle }}
                className={motionClassName}
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
    </ResizeObserver>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Masonry.displayName = 'Masonry';
}

export default Masonry as (<ItemDataType = any>(
  props: React.PropsWithChildren<MasonryProps<ItemDataType>> & React.RefAttributes<MasonryRef>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;
