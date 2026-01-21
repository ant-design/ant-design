import React, { useState } from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import { genCssVar } from '../theme/util/genStyleUtils';
import type { SplitterProps, SplitterSemanticDraggerClassNames } from './interface';

export type ShowCollapsibleIconMode = boolean | 'auto';

export interface SplitBarProps {
  index: number;
  active: boolean;
  draggerStyle?: React.CSSProperties;
  draggerClassName?: SplitterSemanticDraggerClassNames;
  prefixCls: string;
  rootPrefixCls: string;
  resizable: boolean;
  startCollapsible: boolean;
  endCollapsible: boolean;
  draggerIcon?: SplitterProps['draggerIcon'];
  collapsibleIcon?: SplitterProps['collapsibleIcon'];
  showStartCollapsibleIcon: ShowCollapsibleIconMode;
  showEndCollapsibleIcon: ShowCollapsibleIconMode;
  onOffsetStart: (index: number) => void;
  onOffsetConfirm: (index: number, offsetX: number, offsetY: number) => void;
  onOffsetUpdate: (index: number, offsetX: number, offsetY: number, lazyEnd?: boolean) => void;
  onOffsetEnd: (lazyEnd?: boolean) => void;
  onCollapse: (index: number, type: 'start' | 'end') => void;
  vertical: boolean;
  ariaNow: number;
  ariaMin: number;
  ariaMax: number;
  lazy?: boolean;
  containerSize: number;
  step?: number | string;
  onCalculateSnappedOffset?: (index: number, offset: number) => number;
}

function getValidNumber(num?: number): number {
  return typeof num === 'number' && !Number.isNaN(num) && Number.isFinite(num)
    ? Math.round(num)
    : 0;
}

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
    onOffsetStart,
    onOffsetConfirm,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
    lazy,
    containerSize: _containerSize,
    step: _step,
    showStartCollapsibleIcon,
    showEndCollapsibleIcon,
    onCalculateSnappedOffset,
  } = props;

  const splitBarPrefixCls = `${prefixCls}-bar`;

  const [varName] = genCssVar(rootPrefixCls, 'splitter');

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

  const handleLazyMove = useEvent((offsetX: number, offsetY: number) => {
    onOffsetConfirm(index, offsetX, offsetY);

    let offset = vertical ? offsetY : offsetX;

    if (onCalculateSnappedOffset) {
      offset = onCalculateSnappedOffset(index, offset);
    }

    setConstrainedOffset(offset);
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
      const rawOffsetX = pageX - startPos[0];
      const rawOffsetY = pageY - startPos[1];

      onOffsetConfirm(index, rawOffsetX, rawOffsetY);

      if (lazy) {
        handleLazyMove(rawOffsetX, rawOffsetY);
      } else {
        onOffsetUpdate(index, rawOffsetX, rawOffsetY);
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
        const rawOffsetX = touch.pageX - startPos[0];
        const rawOffsetY = touch.pageY - startPos[1];

        onOffsetConfirm(index, rawOffsetX, rawOffsetY);

        if (lazy) {
          handleLazyMove(rawOffsetX, rawOffsetY);
        } else {
          onOffsetUpdate(index, rawOffsetX, rawOffsetY);
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
          draggerClassName?.default,
          active && draggerClassName?.active,
        )}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
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
