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

      '&-bar': {
        flexGrow: 0,
        flexShrink: 0,
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',

        '&-resize': {
          background: 'gray',
          borderRadius: '4px',
          pointerEvents: 'none',
        },

        '&-collapse': {
          position: 'absolute',
          background: 'red',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',

        [`${componentCls}-bar`]: {
          cursor: 'col-resize',

          '&-resize': {
            width: '100%',
            height: 20,
          },

          '&-collapse': {
            width: 16,
            height: 10,
          },
        },

        [`${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },

      '&-vertical': {
        flexDirection: 'column',

        [`${componentCls}-bar`]: {
          cursor: 'row-resize',

          '&-resize': {
            width: 20,
            height: '100%',
          },

          '&-collapse': {
            width: 10,
            height: 16,
          },
        },

        [`${componentCls}-bar-disabled`]: {
          cursor: 'default',
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
