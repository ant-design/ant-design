import React, { useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import classNames from 'classnames';

import type { SplitterProps, SplitterSemanticDraggerClassNames } from './interface';

export interface SplitBarProps {
  index: number;
  active: boolean;
  draggerStyle?: React.CSSProperties;
  draggerClassName?: SplitterSemanticDraggerClassNames;
  prefixCls: string;
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  draggerIcon?: SplitterProps['draggerIcon'];
  collapsibleIcon?: SplitterProps['collapsibleIcon'];
  onOffsetStart: (index: number) => void;
  onOffsetUpdate: (index: number, offsetX: number, offsetY: number, lazyEnd?: boolean) => void;
  onOffsetEnd: (lazyEnd?: boolean) => void;
  onCollapse: (index: number, type: 'start' | 'end') => void;
  vertical: boolean;
  ariaNow: number;
  ariaMin: number;
  ariaMax: number;
  lazy?: boolean;
  containerSize: number;
}

function getValidNumber(num: number | undefined): number {
  return typeof num === 'number' && !Number.isNaN(num) ? Math.round(num) : 0;
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
    draggerIcon,
    draggerStyle,
    draggerClassName,
    collapsibleIcon,
    startCollapsible,
    endCollapsible,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
    lazy,
    containerSize,
  } = props;

  const splitBarPrefixCls = `${prefixCls}-bar`;

  // ======================== Resize ========================
  const [startPos, setStartPos] = useState<[x: number, y: number] | null>(null);
  const [constrainedOffset, setConstrainedOffset] = useState<number>(0);

  const constrainedOffsetX = vertical ? 0 : constrainedOffset;
  const constrainedOffsetY = vertical ? constrainedOffset : 0;

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (resizable && e.currentTarget) {
      setStartPos([e.pageX, e.pageY]);
      onOffsetStart(index);
    }
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (resizable && e.touches.length === 1) {
      const touch = e.touches[0];
      setStartPos([touch.pageX, touch.pageY]);
      onOffsetStart(index);
    }
  };

  // Updated constraint calculation
  const getConstrainedOffset = (rawOffset: number) => {
    const currentPos = (containerSize * ariaNow) / 100;
    const newPos = currentPos + rawOffset;

    // Calculate available space
    const minAllowed = Math.max(0, (containerSize * ariaMin) / 100);
    const maxAllowed = Math.min(containerSize, (containerSize * ariaMax) / 100);

    // Constrain new position within bounds
    const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, newPos));
    return clampedPos - currentPos;
  };

  const handleLazyMove = useEvent((offsetX: number, offsetY: number) => {
    const constrainedOffsetValue = getConstrainedOffset(vertical ? offsetY : offsetX);
    setConstrainedOffset(constrainedOffsetValue);
  });

  const handleLazyEnd = useEvent(() => {
    onOffsetUpdate(index, constrainedOffsetX, constrainedOffsetY, true);
    setConstrainedOffset(0);
    onOffsetEnd(true);
  });

  React.useEffect(() => {
    if (startPos) {
      const onMouseMove = (e: MouseEvent) => {
        const { pageX, pageY } = e;
        const offsetX = pageX - startPos[0];
        const offsetY = pageY - startPos[1];

        if (lazy) {
          handleLazyMove(offsetX, offsetY);
        } else {
          onOffsetUpdate(index, offsetX, offsetY);
        }
      };

      const onMouseUp = () => {
        if (lazy) {
          handleLazyEnd();
        } else {
          onOffsetEnd();
        }
        setStartPos(null);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const touch = e.touches[0];
          const offsetX = touch.pageX - startPos[0];
          const offsetY = touch.pageY - startPos[1];

          if (lazy) {
            handleLazyMove(offsetX, offsetY);
          } else {
            onOffsetUpdate(index, offsetX, offsetY);
          }
        }
      };

      const handleTouchEnd = () => {
        if (lazy) {
          handleLazyEnd();
        } else {
          onOffsetEnd();
        }
        setStartPos(null);
      };

      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [startPos, lazy, vertical, index, containerSize, ariaNow, ariaMin, ariaMax]);

  const transformStyle = {
    [`--${splitBarPrefixCls}-preview-offset`]: `${constrainedOffset}px`,
  };

  // ======================== Render ========================
  const [startIcon, endIcon, startCustomize, endCustomize] = React.useMemo(() => {
    let startIcon = null;
    let endIcon = null;
    const startCustomize = collapsibleIcon?.start !== undefined;
    const endCustomize = collapsibleIcon?.end !== undefined;

    if (vertical) {
      startIcon = startCustomize ? collapsibleIcon.start : <UpOutlined />;
      endIcon = endCustomize ? collapsibleIcon.end : <DownOutlined />;
    } else {
      startIcon = startCustomize ? collapsibleIcon.start : <LeftOutlined />;
      endIcon = endCustomize ? collapsibleIcon.end : <RightOutlined />;
    }

    return [startIcon, endIcon, startCustomize, endCustomize];
  }, [collapsibleIcon, vertical]);

  return (
    <div
      className={splitBarPrefixCls}
      role="separator"
      aria-valuenow={getValidNumber(ariaNow)}
      aria-valuemin={getValidNumber(ariaMin)}
      aria-valuemax={getValidNumber(ariaMax)}
    >
      {lazy && (
        <div
          className={classNames(`${splitBarPrefixCls}-preview`, {
            [`${splitBarPrefixCls}-preview-active`]: !!constrainedOffset,
          })}
          style={transformStyle}
        />
      )}

      <div
        style={draggerStyle}
        className={classNames(
          `${splitBarPrefixCls}-dragger`,
          {
            [`${splitBarPrefixCls}-dragger-disabled`]: !resizable,
            [`${splitBarPrefixCls}-dragger-active`]: active,
            [`${splitBarPrefixCls}-dragger-customize`]: draggerIcon !== undefined,
          },
          draggerClassName?.default,
          active && draggerClassName?.active,
        )}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {draggerIcon !== undefined ? (
          <div className={classNames(`${splitBarPrefixCls}-dragger-icon`)}>{draggerIcon}</div>
        ) : null}
      </div>

      {/* Start Collapsible */}
      {startCollapsible && (
        <div
          className={classNames(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-start`,
            {
              [`${splitBarPrefixCls}-collapse-bar-customize`]: startCustomize,
            },
          )}
          onClick={() => onCollapse(index, 'start')}
        >
          <span
            className={classNames(
              `${splitBarPrefixCls}-collapse-icon`,
              `${splitBarPrefixCls}-collapse-start`,
            )}
          >
            {startIcon}
          </span>
        </div>
      )}

      {/* End Collapsible */}
      {endCollapsible && (
        <div
          className={classNames(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-end`,
            {
              [`${splitBarPrefixCls}-collapse-bar-customize`]: endCustomize,
            },
          )}
          onClick={() => onCollapse(index, 'end')}
        >
          <span
            className={classNames(
              `${splitBarPrefixCls}-collapse-icon`,
              `${splitBarPrefixCls}-collapse-end`,
            )}
          >
            {endIcon}
          </span>
        </div>
      )}
    </div>
  );
};

export default SplitBar;
