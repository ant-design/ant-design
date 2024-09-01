/* eslint-disable react/no-array-index-key */
import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import SplitterContext from './context';
import useHandle from './hooks/useHandle';
import useResize, { sizeTransform } from './hooks/useResize';
import type { PanelProps, SplitterContextType, SplitterProps } from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';

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
  const reverse = layout === 'horizontal' && isRTL;

  // ======== panel ========
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelCount = Children.count(children);

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
  const { basicsRef, setOffset, setSize } = useResize({
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
    basicsRef,
    onResizeStart,
    onResizeEnd,
    setOffset,
    setResizing,
  });

  // 计算初始值
  useEffect(() => {
    const getInitialBasics = (container: HTMLDivElement) => {
      const { width, height } = container.getBoundingClientRect();
      const containerWidth = width;
      const containerHeight = height;

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
      const adjustedSize = Math.floor(averageSize * 100) / 100;
      items.forEach((_, idx) => {
        if (sizes[idx] === defaultSize) {
          sizes[idx] = adjustedSize;
        }
      });
      return sizes;
    };

    if (containerRef.current) {
      setBasicsState(getInitialBasics(containerRef.current));
    }

    // item.size 改变时，重新计算 flexBasis
  }, [JSON.stringify(items.map((item) => item.size)), panelCount, layout, defaultSize]);

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
      basicsState,
      layout,
      reverse,
      resizing,
      onStart,
      setSize,
    }),
    [basicsState, layout, reverse, resizing],
  );

  return wrapCSSVar(
    <SplitterContext.Provider value={splitterContextValue}>
      <div ref={containerRef} style={style} className={containerClassName}>
        {items.map((item, idx) => (
          <React.Fragment key={`split-panel-${idx}`}>
            <InternalPanel
              {...item}
              last={idx === panelCount - 1}
              prefixCls={prefixCls}
              size={basicsState[idx]}
              ref={(ref) => {
                panelsRef.current[idx] = ref;
              }}
            />

            {idx + 1 < panelCount && (
              <SplitBar
                index={idx}
                prefixCls={prefixCls}
                resizable={item.resizable}
                collapsible={item.collapsible}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
