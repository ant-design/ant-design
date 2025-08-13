import { useMemo } from 'react';

import type { MaskType } from '../../modal/interface';

function useMergedMask(
  mask?: MaskType,
  contextMask?: MaskType,
  prefixCls?: string,
): [
  MaskType | undefined,
  { [key: string]: string | undefined },
  { [key: string]: React.CSSProperties },
] {
  return useMemo(() => {
    const mergedMask = mask ?? contextMask;
    const className = mergedMask === 'blur' ? `${prefixCls}-mask-blur` : undefined;
    const style = mergedMask === 'blur' ? { backdropFilter: 'blur(4px)' } : {};
    return [mergedMask, { mask: className }, { mask: style }];
  }, [mask, contextMask, prefixCls]);
}
export default useMergedMask;
