import type { ReactNode } from 'react';
import React, { useMemo, useRef } from 'react';
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

  const containerRef = useRef<HTMLDivElement>(null);

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-panel', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const splitBarSize = 4;
  const panelCount = items.length;
  const gutter = ((items.length - 1) * splitBarSize) / items.length;

  // 获取初始默认值
  const getInitialOffsets = () => {
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

  const offsets = useRef<number[]>([]);
  const childrenNode = useMemo(() => {
    const daFaultOffsets = getInitialOffsets();
    offsets.current = daFaultOffsets;

    return items.reduce((node: ReactNode[], item, idx) => {
      node.push(
        <Panel
          {...item}
          key={`panel${`-${idx}`}`}
          size={daFaultOffsets[idx]}
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
            size={splitBarSize}
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

  const { resizing, resizeStart } = useResize({
    container: containerRef,
    layout,
    gutter,
    offsets,
    items,
    onResizeStart,
    onResize,
    onResizeEnd,
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
    <SplitterContext.Provider value={{ layout, resizeStart }}>
      <div ref={containerRef} style={style} className={containerClassName}>
        {childrenNode}
      </div>
    </SplitterContext.Provider>,
  );
};

export default Splitter;
