import React, { useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import SplitterContext from './context';
import type { SplitBarProps } from './interface';

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, index, resizable = true, collapsible = false } = props;

  const { reverse, resizing, basicsState, setSize, onStart } = React.useContext(SplitterContext);

  const [active, setActive] = useState(false);
  const splitBarPrefixCls = `${prefixCls}-bar`;
  const splitBarClassName = classNames(splitBarPrefixCls, {
    [`${prefixCls}-bar-disabled`]: !resizable,
    [`${prefixCls}-bar-active`]: active,
  });

  // Panel size before folding
  const oldBasicsRef = useRef({ previous: basicsState[index], next: basicsState[index + 1] });

  // panel index
  const previousIdx = reverse ? index + 1 : index;
  const nextIdx = reverse ? index : index + 1;
  // panel size
  const previousSize = basicsState?.[previousIdx] || 0;
  const nextSize = basicsState?.[nextIdx] || 0;
  // collapsible
  let previousIcon = false;
  let nextIcon = false;
  if (typeof collapsible === 'object') {
    const { start = false, end = false } = collapsible;
    previousIcon = start;
    nextIcon = end;

    if (previousIcon && previousSize === 0) {
      previousIcon = false;
      nextIcon = true;
    }
    if (nextIcon && nextSize === 0) {
      previousIcon = true;
      nextIcon = false;
    }
  } else if (collapsible) {
    previousIcon = true;
    nextIcon = true;
  }

  // When the panel size is 0, the SplitBar will overlap
  const overlap = previousSize === 0 || nextSize === 0;

  useEffect(() => {
    if (!resizing && active) {
      setActive(false);
    }
  }, [active, resizing]);

  return (
    <div
      className={splitBarClassName}
      style={overlap ? { flexBasis: '2px' } : undefined}
      onMouseDown={(e) => {
        if (resizable && e.currentTarget) {
          onStart?.(e.clientX, e.clientY, index);
          setActive(true);
          oldBasicsRef.current = { previous: basicsState[index], next: basicsState[index + 1] };
        }
      }}
    >
      <div className={`${splitBarPrefixCls}-bg`} />

      <div className={`${splitBarPrefixCls}-area`} />

      {resizable ? <div className={`${splitBarPrefixCls}-resizable`} /> : null}

      {collapsible ? (
        <>
          {previousIcon && previousSize ? (
            <LeftOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-previous`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                oldBasicsRef.current.previous = previousSize;
                const count = previousSize + nextSize;
                let curPreviousSize = 0;
                let curNextSize = 0;

                if (nextSize) {
                  curPreviousSize = 0;
                  curNextSize = count;
                } else {
                  curPreviousSize = count - oldBasicsRef.current.next;
                  curNextSize = oldBasicsRef.current.next;
                }
                oldBasicsRef.current.next = nextSize;

                setSize?.(curPreviousSize, previousIdx);
                setSize?.(curNextSize, nextIdx);
              }}
            />
          ) : null}

          {nextIcon && nextSize ? (
            <RightOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-next`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => {
                oldBasicsRef.current.next = nextSize;
                const count = previousSize + nextSize;
                let curPreviousSize = 0;
                let curNextSize = 0;

                if (previousSize) {
                  curPreviousSize = count;
                  curNextSize = 0;
                } else {
                  curPreviousSize = oldBasicsRef.current.previous;
                  curNextSize = count - oldBasicsRef.current.previous;
                }
                oldBasicsRef.current.previous = previousSize;

                setSize?.(curPreviousSize, previousIdx);
                setSize?.(curNextSize, nextIdx);
              }}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SplitBar;
