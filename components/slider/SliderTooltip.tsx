import * as React from 'react';
import Tooltip, { TooltipProps } from '../tooltip';

export default function SliderTooltip(props: TooltipProps) {
  const { visible } = props;
  const tooltipRef = React.useRef<Tooltip>(null);

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
      if (tooltipRef.current && (tooltipRef.current as any).tooltip) {
        (tooltipRef.current as any).tooltip.forcePopupAlign();
      }

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
}
