import * as React from 'react';
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
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { RowProps } from '../grid';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import useGutter from '../grid/hooks/useGutter';
import { genCssVar } from '../theme/util/genStyleUtils';
import useDelay from './hooks/useDelay';
import usePositions from './hooks/usePositions';
import type { ItemHeightData } from './hooks/usePositions';
import useRefs from './hooks/useRefs';
import MasonryItem from './MasonryItem';
import type { MasonryItemType } from './MasonryItem';
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

  // ================== Items Position ==================
  const [itemHeights, setItemHeights] = React.useState<ItemHeightData[]>([]);

  const collectItemSize = useDelay(() => {
    const nextItemsHeight = mergedItems.map<ItemHeightData>((item, index) => {
      const itemKey = item.key ?? index;
      const itemEle = getItemRef(itemKey);
      const rect = itemEle?.getBoundingClientRect();
      return [itemKey, rect ? rect.height : 0, item.column];
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
    [mergedItems, itemPositions],
  );

  React.useEffect(() => {
    collectItemSize();
  }, [mergedItems, columnCount]);

  // Trigger for `onLayoutChange`
  const [itemColumns, setItemColumns] = React.useState<ItemColumnsType[]>([]);

  useLayoutEffect(() => {
    if (onLayoutChange && itemWithPositions.every(({ position }) => position)) {
      setItemColumns((prevItemColumns) => {
        const nextItemColumns = itemWithPositions.map<ItemColumnsType>(({ item, position }) => [
          item,
          position!.column,
        ]);
        return isEqual(prevItemColumns, nextItemColumns) ? prevItemColumns : nextItemColumns;
      });
    }
  }, [itemWithPositions]);

  useLayoutEffect(() => {
    if (onLayoutChange && items && items.length === itemColumns.length) {
      onLayoutChange(itemColumns.map(([item, column]) => ({ ...item, column })));
    }
  }, [itemColumns]);

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
              [varName('item-width')]: `calc((100% + ${horizontalGutter}px) / ${columnCount})`,
              insetInlineStart: `calc(${varRef('item-width')} * ${columnIndex})`,
              width: `calc(${varRef('item-width')} - ${horizontalGutter}px)`,
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
