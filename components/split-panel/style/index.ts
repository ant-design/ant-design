import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSplitPanelStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      display: 'flex',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      boxSizing: 'border-box',

      '&-bar': {
        flexGrow: 0,
        flexShrink: 0,
        background: '#f5f5f5',
        cursor: 'col-resize',

        '-icon': {
          background: 'black',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',
      },

      '&-vertical': {
        flexDirection: 'column',
      },
    },

    [`${componentCls}-item`]: {
      flexGrow: 1,
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('SplitPanel', (token) => [genSplitPanelStyle(token)]);
