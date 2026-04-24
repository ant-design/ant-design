import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import showBorderBeamEffect from '../BorderBeamEffect';
import type { BorderBeamEffectHandler, BorderBeamEffectProps } from '../BorderBeamEffect';

type UseBorderBeamEffectOptions = {
  prefixCls: string;
  effectInfo: BorderBeamEffectProps;
  effectReady: boolean;
  hostElement: HTMLElement | null;
};

const useBorderBeamEffect = ({
  prefixCls,
  effectInfo,
  effectReady,
  hostElement,
}: UseBorderBeamEffectOptions) => {
  const effectRef = React.useRef<BorderBeamEffectHandler | null>(null);
  const { className: effectClassName, style: effectStyle } = effectInfo;

  useLayoutEffect(() => {
    // 未确认定位前不要插 holder：否则 static child 上的 absolute holder 会先按错误包含块渲染。
    if (!effectReady || !hostElement) {
      effectRef.current?.destroy();
      effectRef.current = null;

      return;
    }

    if (effectRef.current?.target !== hostElement) {
      // host 变化通常来自 children type/key 切换、wrapper/direct 模式切换，必须销毁旧 holder。
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
  }, [effectClassName, effectReady, effectStyle, hostElement, prefixCls]);

  React.useEffect(
    () => () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    },
    [],
  );
};

export default useBorderBeamEffect;
