import React from 'react';
import type { TooltipPlacement } from '../index';

interface SmartPlacementOptions {
  arrowWidth?: number;
  offset?: number;
}

/**
 * Checks if a tooltip would fit at a given position without overflowing the viewport.
 */
function checkPlacementFits(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
  viewportWidth: number,
  viewportHeight: number,
  options: SmartPlacementOptions = {},
): boolean {
  const { arrowWidth = 0, offset = 0 } = options;
  const tooltipWidth = tooltipRect.width;
  const tooltipHeight = tooltipRect.height;

  const triggerLeft = triggerRect.left;
  const triggerTop = triggerRect.top;
  const triggerRight = triggerRect.right;
  const triggerBottom = triggerRect.bottom;
  const triggerWidth = triggerRect.width;
  const triggerHeight = triggerRect.height;

  const gap = arrowWidth + offset;

  let tooltipLeft: number;
  let tooltipTop: number;

  switch (placement) {
    case 'top':
    case 'topLeft':
    case 'topRight': {
      tooltipTop = triggerTop - tooltipHeight - gap;
      if (placement === 'topLeft') {
        tooltipLeft = triggerLeft;
      } else if (placement === 'topRight') {
        tooltipLeft = triggerRight - tooltipWidth;
      } else {
        tooltipLeft = triggerLeft + triggerWidth / 2 - tooltipWidth / 2;
      }
      break;
    }
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight': {
      tooltipTop = triggerBottom + gap;
      if (placement === 'bottomLeft') {
        tooltipLeft = triggerLeft;
      } else if (placement === 'bottomRight') {
        tooltipLeft = triggerRight - tooltipWidth;
      } else {
        tooltipLeft = triggerLeft + triggerWidth / 2 - tooltipWidth / 2;
      }
      break;
    }
    case 'left':
    case 'leftTop':
    case 'leftBottom': {
      tooltipLeft = triggerLeft - tooltipWidth - gap;
      if (placement === 'leftTop') {
        tooltipTop = triggerTop;
      } else if (placement === 'leftBottom') {
        tooltipTop = triggerBottom - tooltipHeight;
      } else {
        tooltipTop = triggerTop + triggerHeight / 2 - tooltipHeight / 2;
      }
      break;
    }
    case 'right':
    case 'rightTop':
    case 'rightBottom': {
      tooltipLeft = triggerRight + gap;
      if (placement === 'rightTop') {
        tooltipTop = triggerTop;
      } else if (placement === 'rightBottom') {
        tooltipTop = triggerBottom - tooltipHeight;
      } else {
        tooltipTop = triggerTop + triggerHeight / 2 - tooltipHeight / 2;
      }
      break;
    }
    default: {
      tooltipLeft = 0;
      tooltipTop = 0;
    }
  }

  // Check if tooltip fits within viewport bounds
  return (
    tooltipLeft >= 0 &&
    tooltipTop >= 0 &&
    tooltipLeft + tooltipWidth <= viewportWidth &&
    tooltipTop + tooltipHeight <= viewportHeight
  );
}

/**
 * Get fallback placements for a given base placement.
 */
function getFallbackPlacements(placement: TooltipPlacement): TooltipPlacement[] {
  const fallbacks: Record<TooltipPlacement, TooltipPlacement[]> = {
    top: ['top', 'bottom', 'left', 'right'],
    bottom: ['bottom', 'top', 'left', 'right'],
    left: ['left', 'right', 'top', 'bottom'],
    right: ['right', 'left', 'top', 'bottom'],
    topLeft: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'top', 'bottom'],
    topRight: ['topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'top', 'bottom'],
    bottomLeft: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight', 'bottom', 'top'],
    bottomRight: ['bottomRight', 'bottomLeft', 'topRight', 'topLeft', 'bottom', 'top'],
    leftTop: ['leftTop', 'leftBottom', 'rightTop', 'rightBottom', 'left', 'right'],
    leftBottom: ['leftBottom', 'leftTop', 'rightBottom', 'rightTop', 'left', 'right'],
    rightTop: ['rightTop', 'rightBottom', 'leftTop', 'leftBottom', 'right', 'left'],
    rightBottom: ['rightBottom', 'rightTop', 'leftBottom', 'leftTop', 'right', 'left'],
  };

  return fallbacks[placement] || [placement];
}

/**
 * Hook to calculate the best tooltip placement to avoid viewport overflow.
 * @param placement The requested placement
 * @param triggerRef Reference to the trigger element
 * @param tooltipRef Reference to the tooltip element
 * @param options Configuration options (arrowWidth, offset)
 * @returns The best placement to use (original or a fallback)
 */
export function useSmartPlacement(
  placement: TooltipPlacement,
  triggerRef: React.RefObject<HTMLElement>,
  tooltipRef: React.RefObject<HTMLElement>,
  options?: SmartPlacementOptions,
): TooltipPlacement {
  return React.useMemo(() => {
    // Guard against SSR or undefined window
    if (typeof window === 'undefined') {
      return placement;
    }

    // If refs are not available, return original placement
    if (!triggerRef?.current || !tooltipRef?.current) {
      return placement;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get fallback placements in priority order
    const fallbacks = getFallbackPlacements(placement);

    // Try each placement in order
    for (const fallbackPlacement of fallbacks) {
      if (
        checkPlacementFits(
          triggerRect,
          tooltipRect,
          fallbackPlacement,
          viewportWidth,
          viewportHeight,
          options,
        )
      ) {
        return fallbackPlacement;
      }
    }

    // If none fit, return original placement
    return placement;
  }, [placement, triggerRef, tooltipRef, options]);
}

export default useSmartPlacement;
