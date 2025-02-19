import * as React from 'react';
import type { CSSProperties } from 'react';
import { useEvent } from '@rc-component/util';
import raf from '@rc-component/util/lib/raf';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';

import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { GetProp } from '../_util/type';
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

export interface MasonryProps {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: CSSProperties;

  /** Spacing between items */
  gutter?: RowProps['gutter'];

  // Data
  items: MasonryItemType[];

  itemRender?: (item: MasonryItemType) => React.ReactNode;

  /** Number of columns in the masonry grid layout */
  columns: number | Partial<Record<Breakpoint, number>>;

  // TODO: Remove this
  /** When true, items are placed sequentially */
  sequential?: boolean;

  keepAspectRatio?: boolean;
}

const getNearestNumber = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

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
    sequential = false,
    items = [],
    keepAspectRatio = false,
    itemRender,
  } = props;

  // ======================= MISC =======================
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('masonry', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // const itemPrefixCls = `${prefixCls}-item`;

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
  // const [itemLayouts, setItemLayouts] = React.useState<CSSProperties[]>([]);
  // const [containerHeight, setContainerHeight] = React.useState<number>(0);

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

  // const updatePosition = useCallback(() => {
  //   if (containerRef.current) {
  //     const columnHeights = Array.from({ length: columnCount }, () => 0);
  //     const curContainerWidth = containerRef.current.clientWidth;
  //     const eachItemWidth = getNearestNumber(
  //       (curContainerWidth - horizontalGutter * (columnCount - 1)) / columnCount,
  //     );
  //     const newItemLayouts: CSSProperties[] = [];

  //     const containerElements = containerRef.current.querySelectorAll(`[data-${itemPrefixCls}]`);

  //     let skip = false;
  //     containerElements.forEach((element, index) => {
  //       if (skip) {
  //         return;
  //       }

  //       const elementHeight = parseFloat(element.getAttribute('data-height')!);
  //       const elementWidth = parseFloat(element.getAttribute('data-width')!);

  //       if (elementHeight === 0) {
  //         skip = true;
  //         return;
  //       }

  //       const aspectRatio = elementWidth / elementHeight;

  //       const adjustedHeight = keepAspectRatio
  //         ? getNearestNumber(eachItemWidth / aspectRatio)
  //         : getNearestNumber(elementHeight);

  //       let columnIndex: number;
  //       const existingColumn = element.getAttribute('data-column');

  //       if (existingColumn !== null) {
  //         // If item already has a column assigned, keep it there
  //         columnIndex = parseInt(existingColumn, 10);
  //       } else if (sequential) {
  //         columnIndex = index % columnCount;
  //       } else {
  //         columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
  //       }

  //       // Store column assignment on the element
  //       element.setAttribute('data-column', columnIndex.toString());

  //       columnHeights[columnIndex] += adjustedHeight + verticalGutter;

  //       newItemLayouts.push({
  //         [`--${itemPrefixCls}-width`]: `${eachItemWidth}px`,
  //         [`--${itemPrefixCls}-height`]: `${adjustedHeight}px`,
  //         [`--${itemPrefixCls}-translate-x`]: `${
  //           direction === 'rtl' ? '-' : ''
  //         }${getNearestNumber(columnIndex * (eachItemWidth + horizontalGutter))}px`,
  //         [`--${itemPrefixCls}-translate-y`]: `${getNearestNumber(columnHeights[columnIndex] - adjustedHeight - verticalGutter)}px`,
  //       });
  //     });

  //     if (!skip) {
  //       setItemLayouts(newItemLayouts);
  //       setContainerHeight(Math.max(...columnHeights));
  //     }
  //   }
  // }, [
  //   columnCount,
  //   horizontalGutter,
  //   verticalGutter,
  //   sequential,
  //   items.map((item, index) => item.key ?? index).join(','),
  // ]);

  // useLayoutEffect(() => {
  //   if (containerRef.current) {
  //     const images = containerRef.current.getElementsByTagName('img');
  //     const imageLoadPromises = Array.from(images).map(
  //       (img) =>
  //         new Promise((resolve) => {
  //           img.addEventListener('load', resolve, { once: true });
  //           img.addEventListener('error', resolve, { once: true });
  //         }),
  //     );

  //     // Update height after all images are loaded
  //     Promise.all(imageLoadPromises).then(updatePosition);

  //     // Cleanup
  //     return () => {
  //       Array.from(images).forEach((img) => {
  //         img.removeEventListener('load', updatePosition);
  //         img.removeEventListener('error', updatePosition);
  //       });
  //     };
  //   }
  // }, []);

  // useLayoutEffect(() => {
  //   updatePosition();
  // }, [
  //   columnCount,
  //   horizontalGutter,
  //   verticalGutter,
  //   sequential,
  //   items.map((item, index) => item.key ?? index).join(','),
  // ]);

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

  const [itemPositions, totalHeight] = usePositions(columnCount, verticalGutter, itemHeights);

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
      >
        {items.map((item, index) => {
          const key = item.key ?? index;
          const itemPosition = itemPositions[index];
          const { column: columnIndex = 0 } = itemPosition || {};

          const itemStyle: CSSProperties = {
            left: `calc(${(columnIndex / columnCount) * 100}% + ${halfHorizontalGutter}px)`,
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
            />
          );
        })}
      </div>
    </ResizeObserver>,
  );
});

export default Masonry;
