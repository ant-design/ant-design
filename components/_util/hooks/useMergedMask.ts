import { useMemo } from 'react';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
  closable?: boolean;
}
export type MaskType = MaskConfig | boolean;

const normalizeMaskConfig = (mask?: MaskType): MaskConfig => {
  if (mask && typeof mask === 'object') {
    return mask;
  }
  if (typeof mask === 'boolean') {
    return {
      enabled: mask,
      blur: false,
      closable: true,
    };
  }
  return {};
};

export const useMergedMask = (
  mask?: MaskType,
  contextMask?: MaskType,
  prefixCls?: string,
): [boolean, { [key: string]: string | undefined }, boolean | undefined] => {
  return useMemo(() => {
    const maskConfig = normalizeMaskConfig(mask);
    const contextMaskConfig = normalizeMaskConfig(contextMask);

    const mergedConfig: MaskConfig = { ...contextMaskConfig, ...maskConfig };

    const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }, mergedConfig.closable];
  }, [mask, contextMask, prefixCls]);
};
