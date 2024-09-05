/* eslint-disable react/no-array-index-key */
import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { useEvent } from 'rc-util';

import type { GetProp } from '../_util/type';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import SplitterContext from './context';
import useHandle from './hooks/useHandle';
import useItems from './hooks/useItems';
import useResize, { sizeTransform } from './hooks/useResize';
import useSizes from './hooks/useSizes';
import type { PanelProps, SplitterContextType, SplitterProps } from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';

function calculatePanelSize(containerSize: number, numCells: number) {
  const averageSize = Math.floor(containerSize / numCells);
  const totalSize = averageSize * (numCells - 1);
  const lastSize = containerSize - totalSize;

  return {
    averageSize,
    lastSize,
  };
}

const Splitter: React.FC<React.PropsWithChildren<SplitterProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    children,
    transition,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================== Direct ========================
  const isVertical = layout === 'vertical';
  const isRTL = direction === 'rtl';
  const reverse = layout === 'horizontal' && isRTL;

  // ====================== Items Data ======================
  const items = useItems(children);

  // ====================== Container =======================
  const [containerSize, setContainerSize] = useState<number>(100);

  const onContainerResize: GetProp<typeof ResizeObserver, 'onResize'> = (size) => {
    setContainerSize(isVertical ? size.offsetHeight : size.offsetWidth);
  };

  // ========================= Size =========================
  const [itemPtgSizes, itemPxSizes, onOffsetStart, onOffsetUpdate] = useSizes(items, containerSize);

  // ======================== Events ========================
  const onInternalResizeStart = useEvent(() => {
    onOffsetStart();
    onResizeStart?.(itemPxSizes);
  });

  const onInternalResizeUpdate = useEvent((index: number, offset: number) => {
    const nextSizes = onOffsetUpdate(index, offset);
    onResize?.(nextSizes);
  });

  const onInternalResizeEnd = useEvent(() => {
    onResizeEnd?.(itemPxSizes);
  });

  // ======== container ========
  const containerRef = useRef<HTMLDivElement>(null);

  // ======== panel ========
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelCount = Children.count(children);
  const initializeSize = 100 / panelCount;
  const [basicsState, setBasicsState] = useState<number[]>(
    new Array(panelCount).fill(initializeSize),
  );

  // ======== resizing  ========
  const [resizing, setResizing] = useState(false);
  const { setOffset, setSize } = useResize({
    panelsRef,
    items,
    basicsState,
    reverse,
    onResize,
    setBasicsState,
  });
  const { onStart } = useHandle({
    containerRef,
    layout,
    basicsState,
    onResizeStart,
    onResizeEnd,
    setOffset,
    setResizing,
  });

  // Calculate initial value
  useEffect(() => {
    const getInitialBasics = (container: HTMLDivElement) => {
      const { width, height } = container.getBoundingClientRect();
      const containerWidth = width;
      const containerHeight = height;

      const sizes: number[] = [];
      let customSum = 0;
      let customCount = 0;

      // Collect custom sizes
      items.forEach((item) => {
        let currentSize = item.size;

        if (currentSize === undefined || currentSize === '') {
          return sizes.push(initializeSize);
        }

        currentSize = sizeTransform(
          currentSize,
          layout === 'horizontal' ? containerWidth : containerHeight,
        );
        customSum += currentSize;
        customCount += 1;
        sizes.push(currentSize);
      });

      // Supplementary mean size
      let supplementCount = panelCount - customCount;
      const { averageSize, lastSize } = calculatePanelSize(100 - customSum, supplementCount);
      items.forEach((_, idx) => {
        if (sizes[idx] === initializeSize) {
          sizes[idx] = supplementCount === 1 ? lastSize : averageSize;
          supplementCount -= 1;
        }
      });

      return sizes;
    };

    if (containerRef.current) {
      setBasicsState(getInitialBasics(containerRef.current));
    }

    // When item.size changes, recalculate flexBasis
  }, [JSON.stringify(items.map((item) => item.size)), layout]);

  const splitterContextValue = useMemo<SplitterContextType>(
    () => ({
      basicsState,
      layout,
      reverse,
      resizing,
      onStart,
      setSize,
    }),
    [basicsState, layout, reverse, resizing],
  );

  // ======================== Styles ========================
  const containerClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
      [`${prefixCls}-resizing`]: resizing,
      [`${prefixCls}-rtl`]: isRTL,
      [`${prefixCls}-transition`]: transition,
    },
    rootClassName,
    cssVarCls,
    rootCls,
    hashId,
  );

  // ======================== Render ========================
  return wrapCSSVar(
    <SplitterContext.Provider value={splitterContextValue}>
      <ResizeObserver onResize={onContainerResize}>
        <div ref={containerRef} style={style} className={containerClassName}>
          {items.map((item, idx) => {
            const last = idx === panelCount - 1;

            // Panel
            const panel = (
              <InternalPanel
                {...item}
                last={last}
                prefixCls={prefixCls}
                size={itemPtgSizes[idx] * 100}
                ref={(ref) => {
                  panelsRef.current[idx] = ref;
                }}
              />
            );

            // Split Bar
            let splitBar: React.ReactElement | null = null;
            if (!last) {
              const nextItem = items[idx + 1];

              splitBar = (
                <SplitBar
                  index={idx}
                  prefixCls={prefixCls}
                  resizable={[item.resizable, nextItem.resizable]}
                  collapsible={[item.collapsible, nextItem.collapsible]}
                  onOffsetStart={onInternalResizeStart}
                  onOffsetUpdate={(offsetX, offsetY) => {
                    let offset = isVertical ? offsetY : offsetX;
                    if (reverse) {
                      offset = -offset;
                    }
                    onInternalResizeUpdate(idx, offset);
                  }}
                  onOffsetEnd={onInternalResizeEnd}
                />
              );
            }

            return (
              <React.Fragment key={`split-panel-${idx}`}>
                {panel}
                {splitBar}
              </React.Fragment>
            );
          })}
        </div>
      </ResizeObserver>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
