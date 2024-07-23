import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSplitPanelStyle: GenerateStyle<any> = (token: any): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      display: 'flex',
      userSelect: 'auto',
      borderRadius: '4px',
      boxSizing: 'border-box',
      border: '1px solid #e5e7eb',

      '&-bar': {
        flexGrow: 0,
        flexShrink: 0,
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&-icon': {
          background: 'gray',
          borderRadius: '4px',
          pointerEvents: 'none',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',

        [`${componentCls}-bar`]: {
          cursor: 'col-resize',

          '&-icon': {
            width: '100%',
            height: 20,
          },
        },
      },

      '&-vertical': {
        flexDirection: 'column',

        [`${componentCls}-bar`]: {
          cursor: 'row-resize',

          '&-icon': {
            width: 20,
            height: '100%',
          },
        },
      },

      '&-resizing': {
        userSelect: 'none',
      },

      [`&-resizing${componentCls}-horizontal`]: {
        cursor: 'col-resize',
      },

      [`&-resizing${componentCls}-vertical`]: {
        cursor: 'row-resize',
      },

      '&-item': {
        overflow: 'auto',
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('SplitPanel', (token) => [genSplitPanelStyle(token)]);
