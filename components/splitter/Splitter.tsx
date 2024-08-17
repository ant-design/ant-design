import type { ReactNode } from 'react';
import React, { Children, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { SplitterContextType } from './context';
import { SplitterContext } from './context';
import type { PanelProps } from './Panel';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';
import useResize, { sizeTransform } from './useResize';

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  layout?: 'horizontal' | 'vertical';
  onResizeStart?: (sizes: number[], index: number) => void;
  onResize?: (sizes: number[], index: number) => void;
  onResizeEnd?: (sizes: number[], index: number) => void;
}

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
  const isRTL = direction === 'rtl';

  const containerRef = useRef<HTMLDivElement>(null);

  // panel info
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const panelCount = Children.count(children);
  const gutterCount = (panelCount - 1) * SPLIT_BAR_SIZE;
  const gutter = gutterCount / panelCount;

  // panel size
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

  const childrenNode = useMemo(
    () =>
      items.reduce((node: ReactNode[], item, idx) => {
        node.push(
          <InternalPanel
            {...item}
            ref={(ref) => {
              panelsRef.current[idx] = ref;
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={`panel-${idx}`}
            size={basicsState[idx]}
            prefixCls={prefixCls}
            gutter={gutter}
          />,
        );

        if (idx + 1 < panelCount) {
          node.push(
            <SplitBar
              key={`split-bar${`-${idx}`}`}
              prefixCls={prefixCls}
              size={SPLIT_BAR_SIZE}
              index={idx}
              resizable={item.resizable}
              collapsible={item.collapsible}
            />,
          );
        }
        return node;
      }, []),

    [items, basicsState],
  );

  const { resizing, resizeStart, setSize } = useResize({
    containerRef,
    panelsRef,
    layout,
    gutter,
    gutterCount,
    items,
    isRTL,
    basicsData: basicsState,
    onResizeStart,
    onResize,
    onResizeEnd,
    setBasicsState,
  });

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

  useEffect(() => {
    // 计算初始值
    const getInitialBasics = (container: HTMLDivElement) => {
      const { width, height } = container.getBoundingClientRect();
      const containerWidth = width - gutterCount;
      const containerHeight = height - gutterCount;

      const sizes: number[] = [];
      let sum = 0;
      let count = 0;

      items.forEach((child) => {
        let currentSize = child.size ?? child.defaultSize;
        if (currentSize === undefined || currentSize === '') {
          sizes.push(defaultSize);
          return;
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
      return sizes as number[];
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

  const splitterContextValue = useMemo<SplitterContextType>(
    () => ({
      isRTL,
      layout,
      resizing,
      basicsState,
      resizeStart,
      setSize,
    }),
    [isRTL, layout, resizing, basicsState],
  );

  return wrapCSSVar(
    <SplitterContext.Provider value={splitterContextValue}>
      <div ref={containerRef} style={style} className={containerClassName}>
        {childrenNode}
      </div>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
