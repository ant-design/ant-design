import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import SplitterContext from './context';
import useCollapsible from './hooks/useCollapsible';

export interface SplitBarProps {
  index: number;
  prefixCls: string;
  resizable: [start?: boolean, end?: boolean];
  collapsible: [start?: boolean, end?: boolean];
  onOffsetStart: VoidFunction;
  onOffsetUpdate: (offsetX: number, offsetY: number) => void;
  onOffsetEnd: VoidFunction;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const { prefixCls, index, resizable, collapsible, onOffsetStart, onOffsetUpdate, onOffsetEnd } =
    props;

  const { reverse, resizing, basicsState, setSize, onStart } = React.useContext(SplitterContext);

  // const [active, setActive] = useState(false);
  const splitBarPrefixCls = `${prefixCls}-bar`;

  // // const { previousIcon, nextIcon, overlap, onFold, setOldBasics } = useCollapsible({
  // //   basicsState,
  // //   collapsible: mergedCollapsible,
  // //   index,
  // //   reverse,
  // //   setSize,
  // // });

  // useEffect(() => {
  //   if (!resizing && active) {
  //     setActive(false);
  //   }
  // }, [active, resizing]);

  // ======================== Enable ========================
  const mergedResizable = React.useMemo(() => {
    const [start = true, end = true] = resizable;
    return start && end;
  }, [resizable]);

  const startCollapsible = collapsible[0];
  const endCollapsible = collapsible[1];

  // ======================== Resize ========================
  const [startPos, setStartPos] = useState<[x: number, y: number] | null>(null);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (mergedResizable && e.currentTarget) {
      setStartPos([e.pageX, e.pageY]);
      onOffsetStart();
    }
  };

  React.useEffect(() => {
    if (startPos) {
      const onMouseMove = (e: MouseEvent) => {
        const { pageX, pageY } = e;
        const offsetX = pageX - startPos[0];
        const offsetY = pageY - startPos[1];

        onOffsetUpdate(offsetX, offsetY);
      };

      const onMouseUp = () => {
        setStartPos(null);
        onOffsetEnd();
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [startPos]);

  // ======================== Styles ========================
  const splitBarClassName = classNames(splitBarPrefixCls, {
    [`${prefixCls}-bar-disabled`]: !mergedResizable,
    [`${prefixCls}-bar-active`]: !!startPos,
  });

  // ======================== Render ========================
  return (
    <div
      className={splitBarClassName}
      // style={overlap ? { flexBasis: '2px' } : undefined}
      // onMouseDown={(e) => {
      //   if (mergedResizable && e.currentTarget) {
      //     onStart?.(e.clientX, e.clientY, index);
      //     setActive(true);
      //     setOldBasics();
      //   }
      // }}
      onMouseDown={onMouseDown}
    >
      <div className={`${splitBarPrefixCls}-dragger`} />

      <div className={`${splitBarPrefixCls}-bg`} />

      <div className={`${splitBarPrefixCls}-area`} />

      {mergedResizable ? <div className={`${splitBarPrefixCls}-resizable`} /> : null}

      {/* Start Collapsible */}
      {startCollapsible && (
        <LeftOutlined
          className={classNames(
            `${splitBarPrefixCls}-collapse-icon`,
            `${splitBarPrefixCls}-collapse-previous`,
          )}
          // onMouseDown={(e) => e.stopPropagation()}
          // onClick={() => onFold('previous')}
        />
      )}

      {/* End Collapsible */}
      {endCollapsible && (
        <RightOutlined
          className={classNames(
            `${splitBarPrefixCls}-collapse-icon`,
            `${splitBarPrefixCls}-collapse-next`,
          )}
          // onMouseDown={(e) => e.stopPropagation()}
          // onClick={() => onFold('next')}
        />
      )}
    </div>
  );
};

export default SplitBar;
