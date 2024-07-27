import React, { useEffect, useRef, useState } from 'react';
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

  const { resizing, basicsState, resizeStart, setSize } = React.useContext(SplitterContext);

  const oldBasicsRef = useRef({ previous: 0, next: 0 });
  const [active, setActive] = useState(false);

  const splitBarClassName = classNames(`${prefixCls}-bar`, {
    [`${prefixCls}-bar-disabled`]: !resizable,
    [`${prefixCls}-bar-active`]: active,
  });

  const previous = basicsState?.[index];
  const next = basicsState?.[index + 1];

  useEffect(() => {
    if (!resizing && active) {
      setActive(false);
    }
  }, [active, resizing]);

  return (
    <div
      style={{ flexBasis: size }}
      className={splitBarClassName}
      onMouseDown={(e) => {
        if (resizable) {
          resizeStart?.(e, index);
          setActive(true);
        }
      }}
    >
      {resizable ? <div className={`${prefixCls}-bar-resize`} /> : null}

      {collapsible ? (
        <div className={`${prefixCls}-bar-collapse`}>
          {previous ? (
            <LeftOutlined
              size={12}
              onClick={() => {
                oldBasicsRef.current.previous = previous;

                if (next) {
                  setSize?.(basicsState[index] + basicsState[index + 1], index + 1);
                  setSize?.(0, index);
                } else {
                  setSize?.(oldBasicsRef.current.previous - oldBasicsRef.current.next, index);
                  setSize?.(oldBasicsRef.current.next, index + 1);
                }
              }}
            />
          ) : null}

          <div style={{ width: 8 }} />

          {next ? (
            <RightOutlined
              size={12}
              onClick={() => {
                oldBasicsRef.current.next = next;

                if (previous) {
                  setSize?.(basicsState[index] + basicsState[index + 1], index);
                  setSize?.(0, index + 1);
                } else {
                  setSize?.(oldBasicsRef.current.previous, index);
                  setSize?.(oldBasicsRef.current.next - oldBasicsRef.current.previous, index + 1);
                }
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SplitBar;
