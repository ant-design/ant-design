import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSplitPanelStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      display: 'flex',
      flexShrink: 0,
      flexGrow: 0,
    },
  };
};

const genSplitPanelGroupStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}-group`]: {
      display: 'flex',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',

      '&-bar': {
        flexShrink: 0,
        flexGrow: 0,
        background: '#f5f5f5',
      },

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
