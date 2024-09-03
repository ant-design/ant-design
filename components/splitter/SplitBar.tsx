import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import SplitterContext from './context';
import useCollapsible from './hooks/useCollapsible';
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

  const { previousIcon, nextIcon, overlap, onFold, setOldBasics } = useCollapsible({
    basicsState,
    collapsible,
    index,
    reverse,
    setSize,
  });

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
          setOldBasics();
        }
      }}
    >
      <div className={`${splitBarPrefixCls}-bg`} />

      <div className={`${splitBarPrefixCls}-area`} />

      {resizable ? <div className={`${splitBarPrefixCls}-resizable`} /> : null}

      {collapsible ? (
        <>
          {previousIcon ? (
            <LeftOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-previous`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => onFold('previous')}
            />
          ) : null}

          {nextIcon ? (
            <RightOutlined
              className={classNames(
                `${splitBarPrefixCls}-collapse-icon`,
                `${splitBarPrefixCls}-collapse-next`,
              )}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => onFold('next')}
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default SplitBar;
