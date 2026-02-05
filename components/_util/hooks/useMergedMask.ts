import { useMemo } from 'react';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
  closable?: boolean;
}
export type MaskType = MaskConfig | boolean;

export const normalizeMaskConfig = (mask?: MaskType): MaskConfig => {
  if (mask && typeof mask === 'object') {
    return mask;
  }
  if (typeof mask === 'boolean') {
    return {
      enabled: mask,
    };
  }
  return {};
};

export const useMergedMask = (
  mask?: MaskType,
  contextMask?: MaskType,
  prefixCls?: string,
  maskClosable?: boolean,
): [
  config: boolean,
  maskBlurClassName: { [key: string]: string | undefined },
  maskClosable: boolean,
] => {
  return useMemo(() => {
    const maskConfig = normalizeMaskConfig(mask);
    const contextMaskConfig = normalizeMaskConfig(contextMask);

    const mergedConfig: MaskConfig = {
      blur: false,
      ...contextMaskConfig,
      ...maskConfig,
    };

    if (mergedConfig.closable === undefined) {
      mergedConfig.closable = maskClosable ?? true;
    }

    const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }, !!mergedConfig.closable];
  }, [mask, contextMask, prefixCls, maskClosable]);
};
