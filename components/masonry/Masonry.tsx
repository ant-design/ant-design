import React, { CSSProperties, useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

import useResponsiveObserver, { responsiveArray, ScreenMap } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';
import { Gap, Gutter, MasonryProps } from './types';

const getNearestNumber = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

const Masonry: React.FC<MasonryProps> = ({
  columns,
  prefixCls: customizePrefixCls,
  gutter = 0,
  sequential = false,
  items,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('masonry', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const gutterRef = useRef<Gutter | [Gutter, Gutter]>(gutter);

  const [itemLayouts, setItemLayouts] = useState<CSSProperties[]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const [screens, setScreens] = useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const responsiveObserver = useResponsiveObserver();
  const itemPrefixCls = `${prefixCls}-item`;
  const mansoryCls = classNames(prefixCls, hashId, cssVarCls);

  useEffect(() => {
    const token = responsiveObserver.subscribe((screen) => {
      const currentGutter = gutterRef.current || 0;
      const gutterHasResponsive =
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'));
      const columnsHasResponsive = typeof columns === 'object';
      if (gutterHasResponsive || columnsHasResponsive) {
        setScreens(screen);
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);

  const gutters = ((): [Gap, Gap] => {
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];
    return normalizedGutter.map((g): Gap => {
      if (typeof g !== 'object') {
        return g;
      }

      // Find first matching responsive breakpoint
      const matchingBreakpoint = responsiveArray.find(
        (breakpoint) => screens[breakpoint] && g[breakpoint] !== undefined,
      );

      return matchingBreakpoint ? (g[matchingBreakpoint] as number) : undefined;
    }) as [Gap, Gap];
  })();

  const horizontalGutter = gutters[0] ?? 0;
  const verticalGutter = gutters[1] ?? gutters[0] ?? 0;

  const currentColumns = useMemo<number>(() => {
    if (typeof columns === 'number') return columns;

    // Find first matching responsive breakpoint
    const matchingBreakpoint = responsiveArray.find(
      (breakpoint) => screens[breakpoint] && columns[breakpoint] !== undefined,
    );

    if (matchingBreakpoint) {
      return columns[matchingBreakpoint] as number;
    }

    return columns.xxl ?? columns.xl ?? columns.lg ?? columns.md ?? columns.sm ?? columns.xs ?? 1;
  }, [columns, screens]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const columnHeights = new Array(currentColumns).fill(0);
      const containerWidth = containerRef.current.clientWidth;
      const eachItemWidth = getNearestNumber(
        (containerWidth - horizontalGutter * (currentColumns - 1)) / currentColumns,
      );
      const newItemLayouts: CSSProperties[] = [];

      const containerElements = containerRef.current.querySelectorAll(`[data-${itemPrefixCls}]`);

      containerElements.forEach((element, index) => {
        // Get original dimensions before any scaling
        const elementHeight = element.clientHeight;
        const elementWidth = eachItemWidth;

        // Calculate aspect ratio of original content
        const aspectRatio = elementWidth / elementHeight;

        // Calculate new height based on target width while preserving aspect ratio
        const adjustedHeight = getNearestNumber(eachItemWidth / aspectRatio);

        let columnIndex: number;
        if (sequential) {
          columnIndex = index % currentColumns;
        } else {
          columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        }

        columnHeights[columnIndex] += adjustedHeight + verticalGutter;

        newItemLayouts.push({
          [`--${itemPrefixCls}-width`]: `${eachItemWidth}px`,
          [`--${itemPrefixCls}-height`]: `${adjustedHeight}px`,
          [`--${itemPrefixCls}-translate-x`]: `${columnIndex * (eachItemWidth + horizontalGutter)}px`,
          [`--${itemPrefixCls}-translate-y`]: `${columnHeights[columnIndex] - adjustedHeight - verticalGutter}px`,
        });
      });

      setItemLayouts(newItemLayouts);
      setContainerHeight(Math.max(...columnHeights));
    }
  }, [currentColumns, horizontalGutter, verticalGutter]);

  return wrapCSSVar(
    <div ref={containerRef} className={mansoryCls} style={{ height: containerHeight }}>
      {items.map((item, index) => (
        <div
          key={item.key ?? index}
          style={itemLayouts[index]}
          className={itemPrefixCls}
          {...{ [`data-${itemPrefixCls}`]: item.key }}
        >
          {item.render()}
        </div>
      ))}
    </div>,
  );
};

export default Masonry;
