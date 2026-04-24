import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import showBorderBeamEffect from '../BorderBeamEffect';
import type { BorderBeamEffectHandler, BorderBeamEffectProps } from '../BorderBeamEffect';

type UseBorderBeamEffectOptions = {
  prefixCls: string;
  effectInfo: BorderBeamEffectProps;
  hostElement: HTMLElement | null;
};

const useBorderBeamEffect = ({
  prefixCls,
  effectInfo,
  hostElement,
}: UseBorderBeamEffectOptions) => {
  const effectRef = React.useRef<BorderBeamEffectHandler | null>(null);
  const { className: effectClassName, style: effectStyle } = effectInfo;

  useLayoutEffect(() => {
    if (!hostElement) {
      effectRef.current?.destroy();
      effectRef.current = null;

      return;
    }

    if (effectRef.current?.target !== hostElement) {
      // A host swap usually means the child instance changed or the component switched between
      // direct injection and wrapper mode, so the previous holder must be discarded.
      effectRef.current?.destroy();
      effectRef.current = showBorderBeamEffect(hostElement, {
        prefixCls,
        className: effectClassName,
        style: effectStyle,
      });

      return;
    }

    effectRef.current.update({
      className: effectClassName,
      style: effectStyle,
    });
  }, [effectClassName, effectStyle, hostElement, prefixCls]);

  React.useEffect(
    () => () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    },
    [],
  );
};

export default useBorderBeamEffect;
