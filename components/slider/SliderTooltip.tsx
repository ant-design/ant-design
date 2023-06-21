import type { SliderRef } from 'rc-slider/lib/Slider';
import raf from 'rc-util/lib/raf';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { useRef } from 'react';
import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';

const SliderTooltip = React.forwardRef<SliderRef, TooltipProps>((props, ref) => {
  const { open } = props;
  const innerRef = useRef<any>(null);

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

  React.useEffect(() => {
    if (open) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [open, props.title]);

  return <Tooltip ref={composeRef(innerRef, ref)} {...props} />;
});

if (process.env.NODE_ENV !== 'production') {
  SliderTooltip.displayName = 'SliderTooltip';
}

export default SliderTooltip;
