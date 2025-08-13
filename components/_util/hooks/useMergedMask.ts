import { useMemo } from 'react';

import type { MaskType } from '../../modal/interface';

function useMergedMask(
  mask?: MaskType,
  contextMask?: MaskType,
  prefixCls?: string,
): [MaskType | undefined, { [key: string]: string | undefined }] {
  return useMemo(() => {
    const mergedMask = mask ?? contextMask;
    const className = mergedMask === 'blur' ? `${prefixCls}-mask-blur` : undefined;
    return [mergedMask, { mask: className }];
  }, [mask, contextMask, prefixCls]);
}
export default useMergedMask;
