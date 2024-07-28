import type { ReactNode } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { SplitterContext } from './context';
import Panel from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';
import useResize from './useResize';

export interface SplitterItem {
  collapsible?: boolean;
  min?: number;
  max?: number;
  size?: number;
  defaultSize?: number;
  content: ReactNode;
  resizable?: boolean;
}

export interface SplitterProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;

  items: SplitterItem[];
  layout?: 'horizontal' | 'vertical';

  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
}

const SPLIT_BAR_SIZE = 2;

const Splitter: React.FC<SplitterProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = 'horizontal',
    items = [],

    onResizeStart,
    onResize,
    onResizeEnd,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const panelCount = items.length;
  const gutter = ((items.length - 1) * SPLIT_BAR_SIZE) / items.length;

  // 获取初始默认值
  const getInitialBasics = () => {
    const sizes: number[] = [];
    let sum = 0;
    let count = 0;

    items.forEach((child) => {
      const currentSize = child.size || child.defaultSize;
      if (currentSize) {
        sum += currentSize;
        count += 1;
        sizes.push(currentSize);
      }
    });

    const averageSize = sum > 100 ? 0 : (100 - sum) / (items.length - count);
    items.forEach((_, idx) => {
      if (!sizes[idx]) {
        sizes[idx] = averageSize;
      }
    });
    return sizes;
  };

  const basicsRef = useRef<number[]>([]);
  const [basicsState, setBasicsState] = useState<number[]>([]);
  const childrenNode = useMemo(() => {
    const initBasics = getInitialBasics();
    basicsRef.current = initBasics;
    setBasicsState(initBasics);

    return items.reduce((node: ReactNode[], item, idx) => {
      node.push(
        <Panel
          {...item}
          ref={(ref) => {
            panelRefs.current[idx] = ref;
          }}
          key={`panel${`-${idx}`}`}
          size={initBasics[idx]}
          prefixCls={prefixCls}
          gutter={gutter}
        >
          {item.content}
        </Panel>,
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
    }, []);

    // item.size 改变时，重新赋值 flexBasis
  }, [JSON.stringify(items.map((item) => item.size))]);

  const { resizing, resizeStart, setSize } = useResize({
    container: containerRef,
    panels: panelRefs,
    layout,
    gutter,
    basics: basicsRef,
    items,
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
    },
    cssVarCls,
    rootCls,
    hashId,
  );

  return wrapCSSVar(
    <SplitterContext.Provider value={{ layout, resizing, basicsState, resizeStart, setSize }}>
      <div ref={containerRef} style={style} className={containerClassName}>
        {childrenNode}
      </div>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
