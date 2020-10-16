import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';
import useCombinedRefs from '../_util/hooks/useCombinedRefs';

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
