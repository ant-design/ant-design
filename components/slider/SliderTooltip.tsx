import * as React from 'react';
import { useRef, useState } from 'react';
import raf from '@rc-component/util/lib/raf';
import { composeRef } from '@rc-component/util/lib/ref';
import type { SliderRef } from '@rc-component/slider/lib/Slider';

import type { TooltipPlacement, TooltipProps } from '../tooltip';
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

  // Check if tooltip overflows container and adjust placement
  const checkAndAdjustPlacement = React.useCallback(() => {
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

    // Get container
    const container = getPopupContainer
      ? getPopupContainer(triggerElement)
      : document.body;

    // Get container boundaries
    const containerRect = container === document.body
      ? { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }
      : container.getBoundingClientRect();

    // Get tooltip position
    const popupRect = popupElement.getBoundingClientRect();

    // Get original placement
    const originalPlacement = placement || 'top';
    
    // Check if tooltip overflows container
    const isOverflowLeft = popupRect.left < containerRect.left;
    const isOverflowRight = popupRect.right > containerRect.right;
    const isOverflowTop = popupRect.top < containerRect.top;
    const isOverflowBottom = popupRect.bottom > containerRect.bottom;

    // If original placement is top or bottom (horizontal mode), check horizontal overflow
    if (originalPlacement === 'top' || originalPlacement === 'bottom') {
      if (isOverflowLeft) {
        // Left overflow, change to right placement
        setAdjustedPlacement('right');
      } else if (isOverflowRight) {
        // Right overflow, change to left placement
        setAdjustedPlacement('left');
      } else {
        // No horizontal overflow, restore original placement
        setAdjustedPlacement(placement);
      }
    }
    // If original placement is left or right (vertical mode), check vertical overflow
    else if (originalPlacement === 'left' || originalPlacement === 'right') {
      if (isOverflowTop) {
        // Top overflow, change to bottom placement
        setAdjustedPlacement('bottom');
      } else if (isOverflowBottom) {
        // Bottom overflow, change to top placement
        setAdjustedPlacement('top');
      } else {
        // No vertical overflow, restore original placement
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
      // Use raf again to ensure tooltip is positioned
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
      // Reset placement when closed
      setAdjustedPlacement(placement);
    }
  }, [mergedOpen, props.title, value, placement, scheduleAdjustPlacement, cancelAdjustPlacement]);

  // Listen to tooltip position changes
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
