import { useMemo } from 'react';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
  closable?: boolean;
}
export type MaskType = MaskConfig | boolean;

export const normalizeMaskConfig = (mask?: MaskType, maskClosable?: boolean): MaskConfig => {
  let maskConfig: MaskConfig = {};

  if (mask && typeof mask === 'object') {
    maskConfig = mask;
  }
  if (typeof mask === 'boolean') {
    maskConfig = {
      enabled: mask,
    };
  }

  if (maskConfig.closable === undefined && maskClosable !== undefined) {
    maskConfig.closable = maskClosable;
  }

  return maskConfig;
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
    const maskConfig = normalizeMaskConfig(mask, maskClosable);
    const contextMaskConfig = normalizeMaskConfig(contextMask);

    const mergedConfig: MaskConfig = {
      blur: false,
      ...contextMaskConfig,
      ...maskConfig,
      closable: maskConfig.closable ?? maskClosable ?? contextMaskConfig.closable ?? true,
    };

    const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }, !!mergedConfig.closable];
  }, [mask, contextMask, prefixCls, maskClosable]);
};
