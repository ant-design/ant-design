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
  layout?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
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
  const [childrenNode, defaultSize] = useMemo(() => {
    const nodes: ReactNode[] = [];
    let sum = 0;
    let count = 0;
    let size = 0;

    // 插入手柄
    items.forEach((child, idx) => {
      if (child.size) {
        sum += child.size;
        count += 1;
      }

      nodes.push(
        <Panel size={child.size} prefixCls={prefixCls} gutter={gutter}>
          {child.content}
        </Panel>,
      );

      if (idx + 1 < panelCount) {
        nodes.push(<SplitBar prefixCls={prefixCls} size={splitBarSize} index={idx} />);
      }
    });

    // 计算默认大小
    if (sum > 100) {
      size = 0;
    } else {
      size = (100 - sum) / (items.length - count);
    }

    return [nodes, size];
  }, [items]);

  const { resizing, resizeStart } = useResize(
    containerRef,
    gutter,
    splitBarSize * (panelCount - 1),
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
    <SplitPanelContext.Provider value={{ layout, resizeStart, defaultSize }}>
      <div ref={containerRef} style={{ height }} className={groupClassName}>
        {childrenNode}
      </div>
    </SplitPanelContext.Provider>,
  );
};

export default SplitPanel;
