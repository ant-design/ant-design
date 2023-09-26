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
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',

        [`${componentCls}-menus`]: {
          border: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
          borderRadius: token.borderRadiusLG,
          alignItems: 'stretch',
        },
        [`${componentCls}-menu`]: {
          height: 'auto',
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
