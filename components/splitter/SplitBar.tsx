import React, { useRef, useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import { getFilterStringType } from '../_util/hooks';
import { genCssVar } from '../theme/util/genStyleUtils';
import type { SplitterProps, SplitterSemanticType } from './interface';

export type ShowCollapsibleIconMode = boolean | 'auto';

export interface SplitBarProps {
  index: number;
  active: boolean;
  draggerStyle?: NonNullable<SplitterSemanticType['styles']>['dragger'];
  draggerClassName?: NonNullable<SplitterSemanticType['classNames']>['dragger'];
  prefixCls: string;
  rootPrefixCls: string;
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  draggerIcon?: SplitterProps['draggerIcon'];
  collapsibleIcon?: SplitterProps['collapsibleIcon'];
  showStartCollapsibleIcon: ShowCollapsibleIconMode;
  showEndCollapsibleIcon: ShowCollapsibleIconMode;
  onDraggerDoubleClick?: (index: number) => void;
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

function getValidNumber(num?: number): number {
  return typeof num === 'number' && !Number.isNaN(num) && Number.isFinite(num)
    ? Math.round(num)
    : 0;
}

const DOUBLE_CLICK_TIME_GAP = 300;

const SplitBar: React.FC<SplitBarProps> = (props) => {
  const {
    prefixCls,
    rootPrefixCls,
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
    onDraggerDoubleClick,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
    lazy,
    containerSize,
    showStartCollapsibleIcon,
    showEndCollapsibleIcon,
  } = props;
  const draggerClassNames = getFilterStringType(draggerClassName, 'default');

  const splitBarPrefixCls = `${prefixCls}-bar`;

  const lastClickTimeRef = useRef<number>(0);
  const [varName] = genCssVar(rootPrefixCls, 'splitter');

  // ======================== Resize ========================
  const [startPos, setStartPos] = useState<[x: number, y: number] | null>(null);
  const [constrainedOffset, setConstrainedOffset] = useState<number>(0);

  const constrainedOffsetX = vertical ? 0 : constrainedOffset;
  const constrainedOffsetY = vertical ? constrainedOffset : 0;

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    const currentTime = Date.now();
    const timeGap = currentTime - lastClickTimeRef.current;

    if (timeGap > 0 && timeGap < DOUBLE_CLICK_TIME_GAP) {
      // Prevent drag start if it's a double-click action
      return;
    }

    lastClickTimeRef.current = currentTime;

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

  const getVisibilityClass = (mode: ShowCollapsibleIconMode): string => {
    switch (mode) {
      case true:
        return `${splitBarPrefixCls}-collapse-bar-always-visible`;
      case false:
        return `${splitBarPrefixCls}-collapse-bar-always-hidden`;
      case 'auto':
        return `${splitBarPrefixCls}-collapse-bar-hover-only`;
    }
  };

  useLayoutEffect(() => {
    if (!startPos) {
      return;
    }

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

    const eventHandlerMap: Partial<Record<keyof WindowEventMap, EventListener>> = {
      mousemove: onMouseMove as EventListener,
      mouseup: onMouseUp,
      touchmove: handleTouchMove as EventListener,
      touchend: handleTouchEnd,
    };

    for (const [event, handler] of Object.entries(eventHandlerMap)) {
      // eslint-disable-next-line react-web-api/no-leaked-event-listener
      window.addEventListener(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(eventHandlerMap)) {
        window.removeEventListener(event, handler);
      }
    };
  }, [startPos, index, lazy]);

  const transformStyle: React.CSSProperties = {
    [varName('bar-preview-offset')]: `${constrainedOffset}px`,
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
          className={clsx(`${splitBarPrefixCls}-preview`, {
            [`${splitBarPrefixCls}-preview-active`]: !!constrainedOffset,
          })}
          style={transformStyle}
        />
      )}

      <div
        style={draggerStyle}
        className={clsx(
          `${splitBarPrefixCls}-dragger`,
          {
            [`${splitBarPrefixCls}-dragger-disabled`]: !resizable,
            [`${splitBarPrefixCls}-dragger-active`]: active,
            [`${splitBarPrefixCls}-dragger-customize`]: draggerIcon !== undefined,
          },
          draggerClassNames?.default,
          active && draggerClassNames?.active,
        )}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onDoubleClick={() => onDraggerDoubleClick?.(index)}
      >
        {draggerIcon !== undefined ? (
          <div className={clsx(`${splitBarPrefixCls}-dragger-icon`)}>{draggerIcon}</div>
        ) : null}
      </div>

      {/* Start Collapsible */}
      {startCollapsible && (
        <div
          className={clsx(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-start`,
            {
              [`${splitBarPrefixCls}-collapse-bar-customize`]: startCustomize,
            },
            getVisibilityClass(showStartCollapsibleIcon),
          )}
          onClick={() => onCollapse(index, 'start')}
        >
          <span
            className={clsx(
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
          className={clsx(
            `${splitBarPrefixCls}-collapse-bar`,
            `${splitBarPrefixCls}-collapse-bar-end`,
            {
              [`${splitBarPrefixCls}-collapse-bar-customize`]: endCustomize,
            },
            getVisibilityClass(showEndCollapsibleIcon),
          )}
          onClick={() => onCollapse(index, 'end')}
        >
          <span
            className={clsx(
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
