import * as React from 'react';
import type { CSSProperties } from 'react';
import { useEvent } from '@rc-component/util';
import raf from '@rc-component/util/lib/raf';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';

import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { RowProps } from '../grid';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import useGutter from '../grid/hooks/useGutter';
import usePositions from './hooks/usePositions';
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

  /** When true, items are placed sequentially */
  sequential?: boolean;
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
    sequential,
    gutter = 0,
    items = [],
    itemRender,
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
  const rafRef = React.useRef<number>(0);
  const clearRaf = () => {
    raf.cancel(rafRef.current);
  };

  const [itemHeights, setItemHeights] = React.useState<number[]>([]);

  const collectItemSize = useEvent(() => {
    clearRaf();
    rafRef.current = raf(() => {
      const nextItemsHeight = items.map((item, index) => {
        const itemEle = getItemRef(item.key ?? index);
        const rect = itemEle?.getBoundingClientRect();
        return rect ? rect.height : 0;
      });
      setItemHeights(nextItemsHeight);
    });
  });

  const [itemPositions, totalHeight] = usePositions(
    itemHeights,
    columnCount,
    verticalGutter,
    sequential,
  );

  React.useEffect(() => {
    collectItemSize();
  }, [items, columnCount]);

  // ====================== Render ======================
  return wrapCSSVar(
    <ResizeObserver onResize={collectItemSize}>
      <div
        ref={containerRef}
        className={classNames(prefixCls, rootClassName, className, hashId, cssVarCls)}
        style={{
          height: totalHeight,
          marginInline: -halfHorizontalGutter,
          ...style,
        }}
        // Listen for image events
        onLoad={collectItemSize}
        onError={collectItemSize}
      >
        {items.map((item, index) => {
          const key = item.key ?? index;
          const itemPosition = itemPositions[index];
          const { column: columnIndex = 0 } = itemPosition || {};

          const itemStyle: CSSProperties = {
            [direction === 'rtl' ? 'right' : 'left']:
              `calc(${(columnIndex / columnCount) * 100}% + ${halfHorizontalGutter}px)`,
            width: `calc(${100 / columnCount}% - ${horizontalGutter}px)`,
            top: itemPosition?.top,
            position: 'absolute',
          };

          return (
            <MasonryItem
              prefixCls={prefixCls}
              key={key}
              item={item}
              style={itemStyle}
              ref={(ele) => setItemRef(key, ele)}
              index={index}
              itemRender={itemRender}
            />
          );
        })}
      </div>
    </ResizeObserver>,
  );
});

export default Masonry as (<ItemDataType = any>(
  props: React.PropsWithChildren<MasonryProps<ItemDataType>> & React.RefAttributes<MasonryRef>,
) => React.ReactElement) &
  Pick<React.FC, 'displayName'>;
