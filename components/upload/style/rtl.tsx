import type { UploadToken } from '.';
import type { GenerateStyle } from '../../_util/theme';

// =========================== Motion ===========================
const genRtlStyle: GenerateStyle<UploadToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

export default genRtlStyle;
