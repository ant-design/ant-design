import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

function useCombinedRefs(
  ...refs: Array<React.MutableRefObject<unknown> | ((instance: unknown) => void) | null>
) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible } = props;
  const innerRef = React.useRef<any>(null);
  const tooltipRef = useCombinedRefs(ref, innerRef);

  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    window.cancelAnimationFrame(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      (tooltipRef.current as any).forcePopupAlign();

      rafRef.current = null;
      keepAlign();
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible]);

  return <Tooltip ref={tooltipRef} {...props} />;
});

export default SliderTooltip;
