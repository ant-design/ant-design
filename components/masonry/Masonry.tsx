import * as React from 'react';
import type { CSSProperties } from 'react';
import { CSSMotionList } from '@rc-component/motion';
import ResizeObserver from '@rc-component/resize-observer';
import { composeRef, isEqual, useEvent, useLayoutEffect } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isNumber } from '../_util/is';
import { responsiveArray } from '../_util/responsiveObserver';
import type { Breakpoint } from '../_util/responsiveObserver';
import { devUseWarning } from '../_util/warning';
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
import { getItemKnownHeight, getMasonryItemStyle } from './utils';
import VirtualMasonry from './VirtualMasonry';
import useStyle from './style';

export type Gap = number | undefined;

export type Key = string | number;

export type MasonrySemanticType = {
  classNames?: {
    root?: string;
    item?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
  };
};

export type MasonrySemanticAllType = GenerateSemantic<MasonrySemanticType, MasonryProps>;

export interface MasonryProps<ItemDataType = any> {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: CSSProperties;

  classNames?: MasonrySemanticAllType['classNamesAndFn'];
  styles?: MasonrySemanticAllType['stylesAndFn'];

  /** Spacing between items */
  gutter?: RowProps['gutter'];

  // Data
  items?: MasonryItemType<ItemDataType>[];

  itemRender?: (itemInfo: MasonryItemType<ItemDataType> & { index: number }) => React.ReactNode;

  /** Get item height for virtual mode when `MasonryItem.height` is not set */
  itemHeight?: (item: MasonryItemType<ItemDataType>, index: number) => number;

  /** Number of columns in the masonry grid layout */
  columns?: number | Partial<Record<Breakpoint, number>>;

  /** Trigger when item layout order changed */
  onLayoutChange?: (sortInfo: { key: React.Key; column: number }[]) => void;

  fresh?: boolean;

  /** Enable virtualized rendering for large data sets */
  virtual?: boolean;
}

export interface MasonryRef {
  nativeElement: HTMLDivElement;
}

type ItemColumnsType = [item: MasonryItemType, column: number];
export interface MasonryRenderItem<ItemDataType = unknown> {
  item: MasonryItemType<ItemDataType>;
  itemIndex: number;
  itemKey: React.Key;
  key: React.Key;
  position?: {
    column: number;
    top: number;
  };
  layoutHeight?: number;
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
    itemHeight,
    onLayoutChange,
    fresh,
    virtual,
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

  const warning = devUseWarning('Masonry');
  warning(
    !virtual || !fresh,
    'usage',
    '`fresh` is not supported in virtual mode. Update `MasonryItem.height` or `itemHeight` instead.',
  );
  warning(
    !virtual || !(items || []).some((item, index) => !getItemKnownHeight(item, index, itemHeight)),
    'usage',
    'Virtual mode requires a known height for each item. Provide `MasonryItem.height` or `itemHeight`.',
  );

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

    if (isNumber(columns)) {
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

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    MasonrySemanticAllType['classNames'],
    MasonrySemanticAllType['styles'],
    MasonryProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
    props: mergedProps,
  });

  // ================== Items Position ==================
  const [itemHeights, setItemHeights] = React.useState<ItemHeightData[]>([]);

  const virtualItemHeights = React.useMemo<ItemHeightData[]>(() => {
    if (!virtual) {
      return [];
    }

    return mergedItems.map<ItemHeightData>((item, index) => {
      const itemKey = item.key ?? index;
      const height = getItemKnownHeight(item, index, itemHeight) ?? 0;
      return [itemKey, height, item.column];
    });
  }, [itemHeight, mergedItems, virtual]);

  const collectItemSize = useDelay(() => {
    if (virtual) {
      return;
    }

    setItemHeights((prevItemsHeight) => {
      const prevHeightMap = new Map<React.Key, number>();
      prevItemsHeight.forEach(([key, height]) => {
        prevHeightMap.set(key, height);
      });
      const nextItemsHeight = mergedItems.map<ItemHeightData>((item, index) => {
        const itemKey = item.key ?? index;
        const itemEle = getItemRef(itemKey);
        const rect = itemEle?.getBoundingClientRect();
        const measuredHeight = rect?.height ?? item.height ?? prevHeightMap.get(itemKey) ?? 0;

        return [itemKey, measuredHeight, item.column];
      });

      return isEqual(prevItemsHeight, nextItemsHeight) ? prevItemsHeight : nextItemsHeight;
    });
  });

  const positionItemHeights = virtual ? virtualItemHeights : itemHeights;

  const [itemPositions, totalHeight] = usePositions(
    positionItemHeights,
    columnCount,
    verticalGutter as number,
  );

  const itemWithPositions = React.useMemo<MasonryRenderItem[]>(
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
          layoutHeight: virtual ? getItemKnownHeight(item, index, itemHeight) : undefined,
        };
      }),
    [itemHeight, itemPositions, mergedItems, virtual],
  );

  React.useEffect(() => {
    if (!virtual) {
      collectItemSize();
    }
  }, [mergedItems, columnCount, virtual]);

  // Trigger for `onLayoutChange`
  const [itemColumns, setItemColumns] = React.useState<ItemColumnsType[]>([]);

  const triggerLayoutChange = useEvent((nextItemColumns: ItemColumnsType[]) => {
    onLayoutChange?.(nextItemColumns.map(([item, column]) => ({ ...item, column })));
  });

  useLayoutEffect(() => {
    if (itemWithPositions.every(({ position }) => position)) {
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
    if (items && items.length === itemColumns.length && itemColumns.length > 0) {
      triggerLayoutChange(itemColumns);
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
        style={
          virtual
            ? {
                ...mergedStyles.root,
                display: mergedStyles.root?.display ?? 'block',
                overflow: mergedStyles.root?.overflow ?? 'hidden',
              }
            : {
                height: totalHeight,
                ...mergedStyles.root,
              }
        }
        // Listen for image events
        onLoad={collectItemSize}
        onError={collectItemSize}
      >
        {virtual ? (
          <VirtualMasonry
            prefixCls={prefixCls}
            itemWithPositions={itemWithPositions}
            itemRender={itemRender}
            mergedClassName={mergedClassNames.item}
            mergedStyle={mergedStyles.item}
            horizontalGutter={horizontalGutter as number}
            verticalGutter={verticalGutter as number}
            columnCount={columnCount}
            totalHeight={totalHeight}
            varName={varName}
            varRef={varRef}
          />
        ) : (
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

              const itemStyle = getMasonryItemStyle({
                varName,
                varRef,
                horizontalGutter: horizontalGutter as number,
                columnCount,
                columnIndex,
                top: position.top,
              });

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
        )}
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
