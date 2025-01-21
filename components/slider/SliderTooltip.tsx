import * as React from 'react';
import { useRef } from 'react';
import type { SliderRef } from 'rc-slider/lib/Slider';
import raf from 'rc-util/lib/raf';
import { composeRef } from 'rc-util/lib/ref';

import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';

export type SliderTooltipProps = TooltipProps & {
  draggingDelete?: boolean;
};

const SliderTooltip = React.forwardRef<SliderRef, SliderTooltipProps>((props, ref) => {
  const { open, draggingDelete } = props;
  const innerRef = useRef<any>(null);

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

  React.useEffect(() => {
    if (mergedOpen) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [mergedOpen, props.title]);

  return <Tooltip ref={composeRef(innerRef, ref)} {...props} open={mergedOpen} />;
});

if (process.env.NODE_ENV !== 'production') {
  SliderTooltip.displayName = 'SliderTooltip';
}

export default SliderTooltip;
