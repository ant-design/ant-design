import { useMemo } from 'react';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
}
export type MaskType = MaskConfig | boolean;

const normalizeMaskConfig = (mask?: MaskType): MaskConfig => {
  if (mask && typeof mask === 'object') {
    return mask;
  }
  if (typeof mask === 'boolean') {
    return {
      enabled: mask,
      blur: mask,
    };
  }
  return {};
};

export const useMergedMask = (
  mask?: MaskType,
  contextMask?: MaskType,
  prefixCls?: string,
): [boolean, { [key: string]: string | undefined }] => {
  return useMemo(() => {
    const maskConfig = normalizeMaskConfig(mask);
    const contextMaskConfig = normalizeMaskConfig(contextMask);

    const mergedConfig: MaskConfig = { ...contextMaskConfig, ...maskConfig };

    const className = mergedConfig.blur !== false ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }];
  }, [mask, contextMask, prefixCls]);
};
