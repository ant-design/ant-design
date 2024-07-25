import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { SplitterContext } from './context';
import type { SplitterItem } from './Splitter';

export interface SplitBarProps extends Pick<SplitterItem, 'resizable' | 'collapsible'> {
  prefixCls: string;
  index: number;
  size?: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, size, index, resizable = true, collapsible = false } = props;

  const { resizeStart } = React.useContext(SplitterContext);

  const splitBarClassName = classNames(`${prefixCls}-bar`, {
    [`${prefixCls}-bar-disabled`]: !resizable,
  });

  return (
    <div
      style={{ flexBasis: size }}
      className={splitBarClassName}
      onMouseDown={(e) => {
        if (resizable) {
          resizeStart?.(e, index);
        }
      }}
    >
      {resizable ? <div className={`${prefixCls}-bar-resize`} /> : null}

      {collapsible ? (
        <div className={`${prefixCls}-bar-collapse`}>
          <LeftOutlined size={12} />
          <div style={{ width: 8 }} />
          <RightOutlined size={12} />
        </div>
      ) : null}
    </div>
  );
};

export default SplitBar;
