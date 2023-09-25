import type { CSSObject } from '@ant-design/cssinjs';

import { prepareComponentToken, type CascaderToken } from '.';
import { genComponentStyleHook, type GenerateStyle } from '../../theme/internal';

// ============================== Ribbon ==============================
const genPanelStyle: GenerateStyle<CascaderToken> = (token: CascaderToken): CSSObject => {
  const { componentCls } = token;

  return {
    [`${componentCls}-panel`]: {
      background: 'rgba(255,0,0,0.1)',
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  ['Cascader', 'Panel'],
  (token) => genPanelStyle(token),
  prepareComponentToken,
);
