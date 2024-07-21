import type { ReactNode } from 'react';
import React, { useRef } from 'react';
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

  const boxRef = useRef<HTMLDivElement>(null);

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-panel', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const groupClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
    },
    cssVarCls,
    rootCls,
    hashId,
  );

  const childrenNode: ReactNode[] = [];
  const panelCount = items.length;
  const panelInitSize = 100 / panelCount;
  const gutter = ((items.length - 1) * splitBarSize) / items.length;

  items.forEach((child, idx) => {
    childrenNode.push(
      <Panel prefixCls={prefixCls} size={panelInitSize} gutter={gutter}>
        {child.content}
      </Panel>,
    );

    if (idx + 1 < panelCount) {
      childrenNode.push(<SplitBar prefixCls={prefixCls} size={splitBarSize} index={idx} />);
    }
  });

  const [resizing, startInfo, setResizing] = useResize();

  return wrapCSSVar(
    <SplitPanelContext.Provider value={{ layout, panelInitSize, resizing, startInfo, setResizing }}>
      <div
        ref={boxRef}
        style={{ height }}
        className={groupClassName}
        onMouseMove={(e) => {
          const { x, splitPanelBar } = startInfo.current;
          if (resizing && boxRef.current && splitPanelBar) {
            const { width } = boxRef.current.getBoundingClientRect();
            const boxWidth = width - (items.length - 1) * splitBarSize;

            const previousElement = splitPanelBar.previousElementSibling as HTMLDivElement;
            const nextElement = splitPanelBar.nextElementSibling as HTMLDivElement;

            const offsetX = e.clientX - x;

            const previousSize = 100 * ((previousElement.clientWidth + offsetX) / boxWidth);
            const nextSize = 100 * ((nextElement.clientWidth - offsetX) / boxWidth);

            previousElement.style.flexBasis = `calc(${previousSize}% - ${gutter}px)`;
            nextElement.style.flexBasis = `calc(${nextSize}% - ${gutter}px)`;

            startInfo.current.x = e.clientX;
            startInfo.current.y = e.clientY;
          }
        }}
        onMouseUp={() => {
          if (resizing) {
            console.log('[ onMouseUp ] ===>');
            setResizing(false);
            startInfo.current = { x: 0, y: 0, splitPanelBar: null };
          }
        }}
      >
        {childrenNode}
      </div>
    </SplitPanelContext.Provider>,
  );
};

export default SplitPanel;
