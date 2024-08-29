/* eslint-disable react/no-array-index-key */
import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import SplitterContext from './context';
import type { PanelProps, SplitterContextType, SplitterProps } from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';
import useResize, { sizeTransform } from './useResize';

const SPLIT_BAR_SIZE = 2;

const Splitter: React.FC<React.PropsWithChildren<SplitterProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    children,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======== container ========
  const containerRef = useRef<HTMLDivElement>(null);

  // ======== rtl ========
  const isRTL = direction === 'rtl';

  // ======== panel ========
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelCount = Children.count(children);
  const gutterCount = (panelCount - 1) * SPLIT_BAR_SIZE;
  const gutter = gutterCount / panelCount;

  const defaultSize = 100 / panelCount;
  const [basicsState, setBasicsState] = useState<number[]>(new Array(panelCount).fill(defaultSize));
  const items = useMemo(() => {
    const infos: PanelProps[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        infos.push({ ...child.props });
      }
    });
    return infos;
  }, [children]);

  // ======== resizing  ========
  const [resizing, setResizing] = useState(false);
  const { setOffset, setSize } = useResize({
    panelsRef,
    layout,
    gutter,
    gutterCount,
    items,
    isRTL,
    basicsData: basicsState,
    onResize,
    setBasicsState,
  });

  // 计算初始值
  useEffect(() => {
    const getInitialBasics = (container: HTMLDivElement) => {
      const { width, height } = container.getBoundingClientRect();
      const containerWidth = width - gutterCount;
      const containerHeight = height - gutterCount;

      const sizes: number[] = [];
      let sum = 0;
      let count = 0;

      items.forEach((item) => {
        // size 为受控值
        let currentSize = item.size;

        if (currentSize === undefined || currentSize === '') {
          return sizes.push(defaultSize);
        }

        currentSize = sizeTransform(
          currentSize,
          layout === 'horizontal' ? containerWidth : containerHeight,
        );
        sum += currentSize;
        count += 1;
        sizes.push(currentSize);
      });

      const averageSize = sum > 100 ? 0 : (100 - sum) / (panelCount - count);
      items.forEach((_, idx) => {
        if (sizes[idx] === defaultSize) {
          sizes[idx] = averageSize;
        }
      });
      return sizes;
    };

    if (containerRef.current) {
      setBasicsState(getInitialBasics(containerRef.current));
    }

    // item.size 改变时，重新计算 flexBasis
  }, [
    JSON.stringify(items.map((item) => item.size)),
    panelCount,
    layout,
    gutterCount,
    defaultSize,
  ]);

  const containerClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
      [`${prefixCls}-resizing`]: resizing,
      [`${prefixCls}-rtl`]: isRTL,
    },
    rootClassName,
    cssVarCls,
    rootCls,
    hashId,
  );

  const splitterContextValue = useMemo<SplitterContextType>(
    () => ({
      containerRef,
      panelsRef,
      gutterCount,
      isRTL,
      layout,
      resizing,
      basicsState,
      setSize,
      setOffset,
      setResizing,
      onResizeStart,
      onResizeEnd,
    }),
    [isRTL, layout, resizing, basicsState],
  );

  return wrapCSSVar(
    <SplitterContext.Provider value={splitterContextValue}>
      <div ref={containerRef} style={style} className={containerClassName}>
        {items.map((item, idx) => (
          <>
            <InternalPanel
              {...item}
              ref={(ref) => {
                panelsRef.current[idx] = ref;
              }}
              key={`panel-${idx}`}
              size={basicsState[idx]}
              prefixCls={prefixCls}
              gutter={gutter}
            />

            {idx + 1 < panelCount && (
              <SplitBar
                key={`split-bar${`-${idx}`}`}
                prefixCls={prefixCls}
                size={SPLIT_BAR_SIZE}
                index={idx}
                resizable={item.resizable}
                collapsible={item.collapsible}
              />
            )}
          </>
        ))}
      </div>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
