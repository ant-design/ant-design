import * as React from 'react';
import { raf } from '@rc-component/util';

export interface FluidHoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface FluidHoverOptions {
  enabled?: boolean;
  /** CSS selector of hoverable items inside the container */
  itemSelector: string;
  /** Returns `true` to skip an item: it is never highlighted */
  isItemDisabled?: (item: HTMLElement) => boolean;
}

interface FluidHoverState {
  rect: FluidHoverRect | null;
  /** `true` on the first position after pointer enter, used to skip the travel transition */
  fresh: boolean;
}

const initialState: FluidHoverState = { rect: null, fresh: true };

/**
 * Track the pointer inside `containerRef` and return the rect (relative to `holder`)
 * of the nearest enabled item, so a single highlight can glide between items
 * instead of each item blinking its own hover state.
 */
export function useFluidHover(
  containerRef: React.RefObject<HTMLElement | null>,
  holder: HTMLElement | null,
  options: FluidHoverOptions,
): [rect: FluidHoverRect | null, fresh: boolean] {
  const { enabled = true, itemSelector, isItemDisabled } = options;

  const [state, setState] = React.useState<FluidHoverState>(initialState);

  const optionsRef = React.useRef({ itemSelector, isItemDisabled, holder });
  optionsRef.current = { itemSelector, isItemDisabled, holder };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) {
      setState(initialState);
      return;
    }

    let rafId: number | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      if (rafId !== null) {
        raf.cancel(rafId);
      }
      rafId = raf(() => {
        rafId = null;
        const {
          itemSelector: selector,
          isItemDisabled: isDisabled,
          holder: curHolder,
        } = optionsRef.current;
        const holderRect = (curHolder ?? container).getBoundingClientRect();

        // Nearest enabled item wins so there is no dead zone between items
        let nearest: DOMRect | null = null;
        let nearestDistance = Number.MAX_VALUE;

        container.querySelectorAll<HTMLElement>(selector).forEach((item) => {
          if (isDisabled?.(item)) {
            return;
          }
          const itemRect = item.getBoundingClientRect();
          const dx = Math.max(itemRect.left - clientX, 0, clientX - itemRect.right);
          const dy = Math.max(itemRect.top - clientY, 0, clientY - itemRect.bottom);
          const distance = dx * dx + dy * dy;
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = itemRect;
          }
        });

        if (nearest) {
          const { left, top, width, height } = nearest as DOMRect;
          setState((prev) => {
            const nextRect: FluidHoverRect = {
              left: left - holderRect.left,
              top: top - holderRect.top,
              width,
              height,
            };
            const prevRect = prev.rect;
            if (
              prevRect &&
              prevRect.left === nextRect.left &&
              prevRect.top === nextRect.top &&
              prevRect.width === nextRect.width &&
              prevRect.height === nextRect.height
            ) {
              return prev;
            }
            return { rect: nextRect, fresh: !prevRect };
          });
        } else {
          setState(initialState);
        }
      });
    };

    const onMouseLeave = () => {
      if (rafId !== null) {
        raf.cancel(rafId);
        rafId = null;
      }
      setState(initialState);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (rafId !== null) {
        raf.cancel(rafId);
      }
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      setState(initialState);
    };
  }, [enabled, containerRef]);

  // Re-enable the travel transition right after the fresh placement is painted
  React.useEffect(() => {
    if (state.fresh && state.rect) {
      setState((prev) => (prev.fresh && prev.rect ? { ...prev, fresh: false } : prev));
    }
  }, [state]);

  return [state.rect, state.fresh];
}

export default useFluidHover;
