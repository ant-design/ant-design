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
      width: '100%',
      height: '100%',

      '&-bar': {
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.05)',

        '&:hover': {
          background: 'black',
        },

        [`> ${componentCls}-bar-resize`]: {
          background: 'rgba(0, 0, 0, 0.10)',
          borderRadius: '4px',
          pointerEvents: 'none',
        },

        [`> ${componentCls}-bar-collapse`]: {
          position: 'absolute',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },

      '&-bar-active': {
        background: 'black',
      },

      '&-bar-disabled': {
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.05)',
        },
      },

      '&-horizontal': {
        flexDirection: 'row',

        [`> ${componentCls}-bar`]: {
          cursor: 'col-resize',

          [`> ${componentCls}-bar-resize`]: {
            width: '100%',
            height: 10,
          },

          [`> ${componentCls}-bar-collapse`]: {
            padding: 4,
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },

      '&-vertical': {
        flexDirection: 'column',

        [`> ${componentCls}-bar`]: {
          cursor: 'row-resize',

          [`> ${componentCls}-bar-resize`]: {
            width: 10,
            height: '100%',
          },

          [`> ${componentCls}-bar-collapse`]: {
            padding: 4,
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },

      '&-resizing': {
        userSelect: 'none',

        [`>${componentCls}-item`]: {
          transition: 'none',
        },
      },

      [`&-resizing${componentCls}-horizontal`]: {
        cursor: 'col-resize',
      },

      [`&-resizing${componentCls}-vertical`]: {
        cursor: 'row-resize',
      },

      '&-item': {
        overflow: 'auto',
        transition: '200ms',
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('Splitter', (token) => [genSplitterStyle(token)]);
