import React, { useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';

import useResponsiveObserver, { responsiveArray, ScreenMap } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';
import { Gap, Gutter, MasonryProps } from './types';

const Masonry: React.FC<MasonryProps> = ({
  columns,
  prefixCls: customizePrefixCls,
  gutter = 0,
  sequential = false,
  children,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('masonry', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const containerRef = useRef<HTMLDivElement>(null);

  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

  const [containerHeight, setContainerHeight] = React.useState(0);

  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const responsiveObserver = useResponsiveObserver();

  const itemPrefixCls = `${prefixCls}-item`;

  // ================================== Effect ==================================
  React.useEffect(() => {
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

  // ================================== Render ==================================
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

  useEffect(() => {
    if (!containerRef.current) return;

    const itemElements = containerRef.current.childNodes;
    if (!itemElements.length) return;

    const columnHeights = new Array(currentColumns).fill(0);

    itemElements.forEach((item, index) => {
      if (!(item instanceof Element) || (item as HTMLElement).dataset.type === 'line-break') return;

      const child = item as HTMLElement;

      const itemHeight = parseFloat(window.getComputedStyle(child).height) + verticalGutter;

      let columnIndex: number;
      if (sequential) {
        // In sequential mode, items are placed in order from left to right
        columnIndex = index % currentColumns;
      } else {
        // In non-sequential mode, find the shortest column
        columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      }

      columnHeights[columnIndex] += itemHeight;

      // Instead of creating a new style object, we'll update the existing style properties
      child.style.setProperty(`--${itemPrefixCls}-order`, `${columnIndex + 1}`);
      child.style.setProperty(
        `--${itemPrefixCls}-width`,
        `calc(${100 / currentColumns}% - ${horizontalGutter}px)`,
      );
      child.style.setProperty(
        `--${itemPrefixCls}-margin`,
        `${verticalGutter / 2}px ${horizontalGutter / 2}px`,
      );
    });

    // Use the highest column height for the container
    const maxColumnHeight = Math.max(...columnHeights);

    // Update container height
    setContainerHeight(maxColumnHeight);
  }, [currentColumns, gutters, sequential]);

  const mansoryCls = classNames(prefixCls, hashId, cssVarCls);

  const lineBreaks = new Array(currentColumns).fill(0).map((_, index) => {
    const key = `line-break-${index}`;
    return (
      <div
        key={key}
        data-type="line-break"
        className={`${itemPrefixCls}-line-break`}
        style={{
          [`--${itemPrefixCls}-order`]: `${index + 1}`,
        }}
      />
    );
  });

  return wrapCSSVar(
    <div
      ref={containerRef}
      className={mansoryCls}
      style={{ [`--${prefixCls}-height`]: `${containerHeight}px` }}
    >
      {children}
      {lineBreaks}
    </div>,
  );
};

export default Masonry;
