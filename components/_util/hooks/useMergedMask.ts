import { useMemo } from 'react';

import type { MaskType } from '../../modal/interface';

export interface MaskConfig {
  enabled?: boolean;
  blur?: boolean;
}

const normalizeMaskConfig = (mask?: MaskType | MaskConfig): MaskConfig => {
  if (typeof mask === 'object') {
    return mask;
  }
  if (mask === undefined) {
    return {};
  }
  return {
    enabled: !!mask,
    blur: mask === 'blur',
  };
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

    const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : undefined;

    return [mergedConfig.enabled !== false, { mask: className }];
  }, [mask, contextMask, prefixCls]);
}

export default useMergedMask;
