import * as React from 'react';
import { useRef } from 'react';
import { composeRef } from 'rc-util/lib/ref';
import Tooltip, { TooltipProps } from '../tooltip';

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible } = props;
  const innerRef = useRef<any>(null);

  const rafRef = useRef<number | null>(null);

  function cancelKeepAlign() {
    window.cancelAnimationFrame(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = window.requestAnimationFrame(() => {
      innerRef.current.forcePopupAlign();
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

  return <Tooltip ref={composeRef(innerRef, ref)} {...props} />;
});

export default SliderTooltip;
