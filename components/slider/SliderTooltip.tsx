import raf from 'rc-util/lib/raf';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { useRef } from 'react';
import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible } = props;
  const innerRef = useRef<any>(null);

  const rafRef = useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      innerRef.current?.forcePopupAlign();
      rafRef.current = null;
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible, props.title]);

  return <Tooltip ref={composeRef(innerRef, ref)} {...props} />;
});

export default SliderTooltip;
