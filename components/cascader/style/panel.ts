import type { CSSObject } from '@ant-design/cssinjs';

import { prepareComponentToken, type CascaderToken } from '.';
import { genComponentStyleHook, type GenerateStyle } from '../../theme/internal';
import getColumnsStyle from './columns';

// ============================== Panel ===============================
const genPanelStyle: GenerateStyle<CascaderToken> = (token: CascaderToken): CSSObject => {
  const { componentCls } = token;

  return {
    [`${componentCls}-panel`]: [
      getColumnsStyle(token),
      {
        display: 'inline-flex',
        border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        borderRadius: token.borderRadiusLG,
        overflowX: 'auto',
        maxWidth: '100%',

        [`${componentCls}-menus`]: {
          alignItems: 'stretch',
        },
        [`${componentCls}-menu`]: {
          height: 'auto',
        },

        '&-empty': {
          padding: token.paddingXXS,
        },
      },
    ],
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  ['Cascader', 'Panel'],
  (token) => genPanelStyle(token),
  prepareComponentToken,
);
