import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import showBorderBeamEffect from '../BorderBeamEffect';
import type { BorderBeamEffectHandler, BorderBeamEffectProps } from '../BorderBeamEffect';

type UseBorderBeamEffectOptions = {
  prefixCls: string;
  effectInfo: BorderBeamEffectProps;
  effectReady: boolean;
  targetElement: HTMLElement | null;
};

const useBorderBeamEffect = ({
  prefixCls,
  effectInfo,
  effectReady,
  targetElement,
}: UseBorderBeamEffectOptions) => {
  const effectRef = React.useRef<BorderBeamEffectHandler | null>(null);
  const { className: effectClassName, style: effectStyle } = effectInfo;

  useLayoutEffect(() => {
    if (!effectReady || !targetElement) {
      effectRef.current?.destroy();
      effectRef.current = null;

      return;
    }

    if (effectRef.current?.target !== targetElement) {
      effectRef.current?.destroy();
      effectRef.current = showBorderBeamEffect(targetElement, {
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
  }, [effectClassName, effectReady, effectStyle, prefixCls, targetElement]);

  React.useEffect(
    () => () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    },
    [],
  );
};

export default useBorderBeamEffect;
