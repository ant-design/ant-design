import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSplitPanelStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      display: 'flex',
    },
  };
};

const genSplitPanelGroupStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}-group`]: {
      display: 'flex',

      '&-horizontal': {
        flexDirection: 'row',
      },

      '&-vertical': {
        flexDirection: 'column',
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('SplitPanel', (token) => [
  genSplitPanelStyle(token),
  genSplitPanelGroupStyle(token),
]);
