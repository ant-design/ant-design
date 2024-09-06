import React, { useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import classNames from 'classnames';

export interface SplitBarProps {
  index: number;
  prefixCls: string;
  resizable: [start?: boolean, end?: boolean];
  collapsible: [start?: boolean, end?: boolean];
  size: [start: number, end: number];
  sizeMin: [start?: number, end?: number];
  onOffsetStart: VoidFunction;
  onOffsetUpdate: (index: number, offsetX: number, offsetY: number) => void;
  onOffsetEnd: VoidFunction;
  onCollapse: (index: number, type: 'start' | 'end') => void;
  vertical: boolean;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const {
    prefixCls,
    vertical,
    index,
    size,
    sizeMin,
    resizable,
    collapsible,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
  } = props;

  const splitBarPrefixCls = `${prefixCls}-bar`;

  // ======================== Enable ========================
  const mergedResizable = React.useMemo(() => {
    const [start = true, end = true] = resizable;

    // One of it not support resize
    if (!start || !end) {
      return false;
    }

    // One of it is collapsed and limit min size
    if (size[0] === 0 && sizeMin[0]) {
      return false;
    }

    if (size[1] === 0 && sizeMin[1]) {
      return false;
    }

    return true;
  }, [resizable, size, sizeMin]);

  const startCollapsible = collapsible[0] && size[0] > 0;
  const endCollapsible = collapsible[1] && size[1] > 0;

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

        onOffsetUpdate(index, offsetX, offsetY);
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
            onClick={() => onCollapse(index, 'start')}
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
            onClick={() => onCollapse(index, 'end')}
          />
        </div>
      )}
    </div>
  );
};

export default SplitBar;
