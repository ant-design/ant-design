import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import { showBorderBeamEffect } from '../BorderBeamEffect';
import type { BorderBeamEffectHandler } from '../BorderBeamEffect';

type BorderBeamEffectInfo = {
  className: string;
  rootClassName: string;
  style?: React.CSSProperties;
};

type UseBorderBeamEffectOptions = {
  prefixCls: string;
  effectInfo: BorderBeamEffectInfo;
  hostElement: HTMLElement | null;
};

const useBorderBeamEffect = ({
  prefixCls,
  effectInfo,
  hostElement,
}: UseBorderBeamEffectOptions) => {
  const effectRef = React.useRef<BorderBeamEffectHandler | null>(null);
  const {
    className: effectClassName,
    rootClassName: effectRootClassName,
    style: effectStyle,
  } = effectInfo;

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
        rootClassName: effectRootClassName,
        style: effectStyle,
      });

      return;
    }

    effectRef.current.update({
      className: effectClassName,
      rootClassName: effectRootClassName,
      style: effectStyle,
    });
  }, [effectClassName, effectRootClassName, effectStyle, hostElement, prefixCls]);

  React.useEffect(
    () => () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    },
    [],
  );
};

export default useBorderBeamEffect;
