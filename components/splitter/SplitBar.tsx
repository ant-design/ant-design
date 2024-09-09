import React, { useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import classNames from 'classnames';

export interface SplitBarProps {
  index: number;
  active: boolean;
  prefixCls: string;
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  onOffsetStart: (index: number) => void;
  onOffsetUpdate: (index: number, offsetX: number, offsetY: number) => void;
  onOffsetEnd: VoidFunction;
  onCollapse: (index: number, type: 'start' | 'end') => void;
  vertical: boolean;
  ariaNow: number;
  ariaMin: number;
  ariaMax: number;
}

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const {
    prefixCls,
    vertical,
    index,
    active,
    ariaNow,
    ariaMin,
    ariaMax,
    resizable,
    startCollapsible,
    endCollapsible,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
  } = props;

  const splitBarPrefixCls = `${prefixCls}-bar`;

  // ======================== Resize ========================
  const [startPos, setStartPos] = useState<[x: number, y: number] | null>(null);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (resizable && e.currentTarget) {
      setStartPos([e.pageX, e.pageY]);
      onOffsetStart(index);
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
    <div
      className={splitBarPrefixCls}
      role="separator"
      aria-valuenow={Math.round(ariaNow)}
      aria-valuemin={Math.round(ariaMin)}
      aria-valuemax={Math.round(ariaMax)}
    >
      <div
        className={classNames(`${splitBarPrefixCls}-dragger`, {
          [`${splitBarPrefixCls}-dragger-disabled`]: !resizable,
          [`${splitBarPrefixCls}-dragger-active`]: active,
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
