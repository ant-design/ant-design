import type { ReactNode } from 'react';
import React, { useMemo, useRef } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { SplitPanelContext } from './context';
import Panel from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';
import useResize from './useResize';

export interface SplitPanelProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;

  layout?: 'horizontal' | 'vertical';
  height?: number;
  splitBarSize?: number;
  items?: {
    size?: number;
    content: ReactNode;
  }[];
}

const SplitPanel: React.FC<SplitPanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    layout = 'horizontal',
    height,
    splitBarSize = 4,
    items = [],
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-panel', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const panelCount = items.length;
  const gutter = ((items.length - 1) * splitBarSize) / items.length;

  const getInitialOffsets = () => {
    const arr: number[] = [];
    let sum = 0;
    let count = 0;
    let size = 0;

    items.forEach((child) => {
      if (child.size) {
        sum += child.size;
        count += 1;
        arr.push(child.size);
      }
    });
    size = sum > 100 ? 0 : (100 - sum) / (items.length - count);
    items.forEach((_, idx) => {
      if (!arr[idx]) {
        arr[idx] = size;
      }
    });
    return arr;
  };
  const offsets = useRef<number[]>([]);
  const childrenNode = useMemo(() => {
    const daFaultOffsets = getInitialOffsets();
    offsets.current = daFaultOffsets;
    const nodes: ReactNode[] = [];

    items.forEach((child, idx) => {
      nodes.push(
        <Panel
          key={`panel-${`${layout}-${idx}`}`}
          size={daFaultOffsets[idx]}
          prefixCls={prefixCls}
          gutter={gutter}
        >
          {child.content}
        </Panel>,
      );

      if (idx + 1 < panelCount) {
        nodes.push(
          <SplitBar
            key={`split-bar-${`${layout}-${idx}`}`}
            prefixCls={prefixCls}
            size={splitBarSize}
            index={idx}
          />,
        );
      }
    });

    return nodes;
  }, [items, layout]);

  const { resizing, resizeStart } = useResize(
    containerRef,
    layout,
    gutter,
    splitBarSize * (panelCount - 1),
    offsets,
  );

  const groupClassName = classNames(
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
    <SplitPanelContext.Provider value={{ layout, resizeStart }}>
      <div ref={containerRef} style={{ height }} className={groupClassName}>
        {childrenNode}
      </div>
    </SplitPanelContext.Provider>,
  );
};

export default SplitPanel;
