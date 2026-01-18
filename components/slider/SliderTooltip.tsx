import * as React from 'react';
import { useRef, useState } from 'react';
import raf from '@rc-component/util/lib/raf';
import { composeRef } from '@rc-component/util/lib/ref';
import type { SliderRef } from '@rc-component/slider/lib/Slider';

import type { TooltipProps, TooltipPlacement } from '../tooltip';
import Tooltip from '../tooltip';

export type SliderTooltipProps = TooltipProps & {
  draggingDelete?: boolean;
  value?: number;
};

const SliderTooltip = React.forwardRef<SliderRef, SliderTooltipProps>((props, ref) => {
  const { open, draggingDelete, value, placement, getPopupContainer } = props;
  const innerRef = useRef<any>(null);
  const [adjustedPlacement, setAdjustedPlacement] = useState<TooltipPlacement | undefined>(placement);

  const mergedOpen = open && !draggingDelete;

  const rafRef = useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      innerRef.current?.forceAlign();
      rafRef.current = null;
    });
  }

  // 检测 tooltip 是否超出容器并调整 placement
  const checkAndAdjustPlacement = React.useCallback(() => {
    console.log('checkAndAdjustPlacement');
    if (!mergedOpen) {
      return;
    }

    const tooltipRef = innerRef.current;
    if (!tooltipRef) {
      return;
    }

    const popupElement = tooltipRef.popupElement;
    const triggerElement = tooltipRef.nativeElement;

    if (!popupElement || !triggerElement) {
      return;
    }

    // 获取容器
    const container = getPopupContainer
      ? getPopupContainer(triggerElement)
      : document.body;

    // 获取容器边界
    const containerRect = container === document.body
      ? { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }
      : container.getBoundingClientRect();

    // 获取 tooltip 的位置
    const popupRect = popupElement.getBoundingClientRect();

    // 获取原始 placement
    const originalPlacement = placement || 'top';
    
    // 检查 tooltip 是否超出容器
    const isOverflowLeft = popupRect.left < containerRect.left;
    const isOverflowRight = popupRect.right > containerRect.right;
    const isOverflowTop = popupRect.top < containerRect.top;
    const isOverflowBottom = popupRect.bottom > containerRect.bottom;

    // 如果原始 placement 是 top 或 bottom（水平模式），检查左右溢出
    if (originalPlacement === 'top' || originalPlacement === 'bottom') {
      if (isOverflowLeft) {
        // 左侧超出，改为右侧展示
        setAdjustedPlacement('right');
      } else if (isOverflowRight) {
        // 右侧超出，改为左侧展示
        setAdjustedPlacement('left');
      } else {
        // 没有左右溢出，恢复原始 placement
        setAdjustedPlacement(placement);
      }
    }
    // 如果原始 placement 是 left 或 right（垂直模式），检查上下溢出
    else if (originalPlacement === 'left' || originalPlacement === 'right') {
      if (isOverflowTop) {
        // 顶部超出，改为底部展示
        setAdjustedPlacement('bottom');
      } else if (isOverflowBottom) {
        // 底部超出，改为顶部展示
        setAdjustedPlacement('top');
      } else {
        // 没有上下溢出，恢复原始 placement
        setAdjustedPlacement(placement);
      }
    }
  }, [mergedOpen, placement, getPopupContainer]);

  const adjustPlacementRef = useRef<number | null>(null);

  const cancelAdjustPlacement = React.useCallback(() => {
    if (adjustPlacementRef.current !== null) {
      raf.cancel(adjustPlacementRef.current);
      adjustPlacementRef.current = null;
    }
  }, []);

  const scheduleAdjustPlacement = React.useCallback(() => {
    cancelAdjustPlacement();
    adjustPlacementRef.current = raf(() => {
      // 再次使用 raf 确保 tooltip 已经定位
      adjustPlacementRef.current = raf(() => {
        checkAndAdjustPlacement();
        adjustPlacementRef.current = null;
      });
    });
  }, [cancelAdjustPlacement, checkAndAdjustPlacement]);

  React.useEffect(() => {
    if (mergedOpen) {
      keepAlign();
      scheduleAdjustPlacement();
      return () => {
        cancelKeepAlign();
        cancelAdjustPlacement();
      };
    } else {
      cancelKeepAlign();
      cancelAdjustPlacement();
      // 关闭时重置 placement
      setAdjustedPlacement(placement);
    }
  }, [mergedOpen, props.title, value, placement, scheduleAdjustPlacement, cancelAdjustPlacement]);

  // 监听 tooltip 位置变化
  React.useEffect(() => {
    if (!mergedOpen) {
      return;
    }

    const handleResize = () => {
      scheduleAdjustPlacement();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [mergedOpen, scheduleAdjustPlacement]);

  return <Tooltip ref={composeRef(innerRef, ref)} {...props} open={mergedOpen} placement={adjustedPlacement} />;
});

if (process.env.NODE_ENV !== 'production') {
  SliderTooltip.displayName = 'SliderTooltip';
}

export default SliderTooltip;
