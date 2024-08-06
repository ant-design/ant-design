import React, { useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { SplitterContext } from './context';
import type { PanelProps } from './Panel';

export interface SplitBarProps extends Pick<PanelProps, 'resizable' | 'collapsible'> {
  prefixCls: string;
  index: number;
  size?: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, size, index, resizable = true, collapsible = false } = props;

  const { isRTL, layout, resizing, basicsState, resizeStart, setSize } =
    React.useContext(SplitterContext);

  const oldBasicsRef = useRef({ previous: 0, next: 0 });
  const [active, setActive] = useState(false);

  const splitBarPrefixCls = `${prefixCls}-bar`;
  const splitBarClassName = classNames(splitBarPrefixCls, {
    [`${prefixCls}-bar-disabled`]: !resizable,
    [`${prefixCls}-bar-active`]: active,
  });

  const reverse = layout === 'horizontal' && isRTL;
  const previousIdx = reverse ? index + 1 : index;
  const nextIdx = reverse ? index : index + 1;
  const previousSize = basicsState?.[previousIdx] || 0;
  const nextSize = basicsState?.[nextIdx] || 0;

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
      <div className={`${splitBarPrefixCls}-area`} />

      {resizable ? <div className={`${splitBarPrefixCls}-resizable`} /> : null}

      {collapsible ? (
        <>
          {previousSize ? (
            <LeftOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-previous`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                oldBasicsRef.current.previous = previousSize;

                if (nextSize) {
                  setSize?.(0, previousIdx);
                  setSize?.(100, nextIdx);
                } else {
                  setSize?.(100 - oldBasicsRef.current.next, previousIdx);
                  setSize?.(oldBasicsRef.current.next, nextIdx);
                }
              }}
            />
          ) : null}

          {nextSize ? (
            <RightOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-next`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                oldBasicsRef.current.next = nextSize;

                if (previousSize) {
                  setSize?.(100, previousIdx);
                  setSize?.(0, nextIdx);
                } else {
                  setSize?.(oldBasicsRef.current.previous, previousIdx);
                  setSize?.(100 - oldBasicsRef.current.previous, nextIdx);
                }
              }}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SplitBar;
