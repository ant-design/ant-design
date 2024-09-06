import React, { useEffect, useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
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
  vertical: boolean;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const {
    prefixCls,
    vertical,
    index,
    resizable,
    collapsible,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
  } = props;

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

  // ======================== Render ========================
  const StartIcon = vertical ? UpOutlined : LeftOutlined;
  const EndIcon = vertical ? DownOutlined : RightOutlined;

  return (
    <div className={splitBarPrefixCls}>
      <div
        className={classNames(`${splitBarPrefixCls}-dragger`, {
          [`${splitBarPrefixCls}-dragger-disabled`]: !mergedResizable,
          [`${splitBarPrefixCls}-dragger-active`]: !!startPos,
        })}
        onMouseDown={onMouseDown}
      />

      {/* Start Collapsible */}
      {startCollapsible && (
        <div
          className={classNames(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-start`,
          )}
        >
          <StartIcon
            className={classNames(
              `${splitBarPrefixCls}-collapse-icon`,
              `${splitBarPrefixCls}-collapse-start`,
            )}
            // onMouseDown={(e) => e.stopPropagation()}
            // onClick={() => onFold('previous')}
          />
        </div>
      )}

      {/* End Collapsible */}
      {endCollapsible && (
        <div
          className={classNames(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-end`,
          )}
        >
          <EndIcon
            className={classNames(
              `${splitBarPrefixCls}-collapse-icon`,
              `${splitBarPrefixCls}-collapse-end`,
            )}
            // onMouseDown={(e) => e.stopPropagation()}
            // onClick={() => onFold('next')}
          />
        </div>
      )}
    </div>
  );
};

export default SplitBar;
