import type { CSSObject } from '@ant-design/cssinjs';

import type { UploadToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

// =========================== Motion ===========================
const genRtlStyle: GenerateStyle<UploadToken, CSSObject> = (token) => {
  const { componentCls } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

export default genRtlStyle;
