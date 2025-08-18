import { useMemo } from 'react';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
}

const normalizeMaskConfig = (mask?: boolean | MaskConfig): MaskConfig => {
  if (mask && typeof mask === 'object') {
    return mask;
  }
  if (typeof mask === 'boolean') {
    return {
      enabled: !!mask,
      blur: !!mask,
    };
  }
  return {};
};

function useMergedMask(
  mask?: boolean | MaskConfig,
  contextMask?: boolean | MaskConfig,
  prefixCls?: string,
): [boolean, { [key: string]: string | undefined }] {
  return useMemo(() => {
    const maskConfig = normalizeMaskConfig(mask);
    const contextMaskConfig = normalizeMaskConfig(contextMask);

    const mergedConfig: MaskConfig = {
      ...contextMaskConfig,
      ...maskConfig,
    };

    const className = mergedConfig.blur !== false ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }];
  }, [mask, contextMask, prefixCls]);
}

export default useMergedMask;
