import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSplitterStyle: GenerateStyle<any> = (token: any): CSSObject => {
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

        [`> ${componentCls}-bar-resize`]: {
          background: 'gray',
          borderRadius: '4px',
          pointerEvents: 'none',
        },

        [`> ${componentCls}-bar-collapse`]: {
          position: 'absolute',
          background: 'red',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',
        width: '100%',
        height: '100%',


        [`> ${componentCls}-bar`]: {
          cursor: 'col-resize',

          [`> ${componentCls}-bar-resize`]: {
            width: '100%',
            height: 20,
          },

          [`> ${componentCls}-bar-collapse`]: {
            width: 16,
            height: 10,
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },

      '&-vertical': {
        flexDirection: 'column',
        width: '100%',
        height: '100%',


        [`> ${componentCls}-bar`]: {
          cursor: 'row-resize',

          [`> ${componentCls}-bar-resize`]: {
            width: 20,
            height: '100%',
          },

          [`> ${componentCls}-bar-collapse`]: {
            width: 10,
            height: 16,
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
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
export default genStyleHooks('Splitter', (token) => [genSplitterStyle(token)]);
