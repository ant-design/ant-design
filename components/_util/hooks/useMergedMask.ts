import { useMemo } from 'react';

import type { MaskType } from '../../modal/interface';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
}

const normalizeMaskConfig = (mask?: MaskType | MaskConfig): MaskConfig => {
  if (mask && typeof mask === 'object') {
    return mask;
  }
  if (typeof mask === 'boolean' || mask === 'blur') {
    return {
      enabled: !!mask,
      blur: mask === 'blur',
    };
  }
  return {};
};

function useMergedMask(
  mask?: MaskType | MaskConfig,
  contextMask?: MaskType | MaskConfig,
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
