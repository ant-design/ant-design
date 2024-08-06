import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 可改变大小标识 元素大小
   * @descEN Height of content area
   */
  resizableSize: number;
  /**
   * @desc 快速折叠 图标大小
   * @descEN Height of content area
   */
  collapsibleIconSize: number;
}

interface SplitterToken extends FullToken<'Splitter'> {}

const genRtlStyle = (token: SplitterToken): CSSObject => {
  const { componentCls } = token;
  return {
    [`&-rtl${componentCls}-horizontal`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: 0,
          insetInlineStart: 'unset',
        },

        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: 'unset',
          insetInlineStart: 0,
        },
      },
    },

    [`&-rtl${componentCls}-vertical`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: '50%',
          insetInlineStart: 'unset',
        },

        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: '50%',
          insetInlineStart: 'unset',
        },
      },
    },
  };
};

const genSplitterStyle: GenerateStyle<SplitterToken> = (token: SplitterToken): CSSObject => {
  const {
    componentCls,
    colorPrimary,
    colorFill,
    colorTextTertiary,
    colorFillTertiary,
    resizableSize,
    borderRadius,
    collapsibleIconSize,
    zIndexPopupBase,
    motionDurationFast,
    paddingXXS,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      height: '100%',

      // split bar
      '&-bar': {
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: colorFillTertiary,
        transition: `background-color ${motionDurationFast}`,

        '&:hover': {
          background: colorFill,

          [`> ${componentCls}-bar-collapse-icon`]: {
            display: 'block',
          },
        },

        // 扩大触发区域
        [`> ${componentCls}-bar-area`]: {
          position: 'absolute',
        },

        [`> ${componentCls}-bar-resizable`]: {
          borderRadius,
          pointerEvents: 'none',
          background: colorFill,
        },

        // 快捷折叠
        [`${componentCls}-bar-collapse-icon`]: {
          display: 'none',
          position: 'absolute',
          fontSize: collapsibleIconSize,
          zIndex: zIndexPopupBase,
          color: colorTextTertiary,
          padding: paddingXXS,

          '&:hover': {
            color: colorPrimary,
          },
        },
      },

      [`&-bar${componentCls}-bar-active`]: {
        background: colorTextTertiary,
      },

      '&-bar-disabled': {
        '&:hover': {
          background: colorFillTertiary,
        },
      },

      // Layout
      '&-horizontal': {
        flexDirection: 'row',

        [`> ${componentCls}-bar`]: {
          cursor: 'col-resize',

          [`${componentCls}-bar-area`]: {
            width: '600%',
            height: '100%',
          },

          [`${componentCls}-bar-resizable`]: {
            width: '100%',
            height: resizableSize,
          },

          [`${componentCls}-bar-collapse-previous`]: {
            top: '50%',
            insetInlineEnd: 'unset',
            insetInlineStart: 0,
            transform: 'translate(-100%, -50%)',
          },

          [`${componentCls}-bar-collapse-next`]: {
            top: '50%',
            insetInlineEnd: 0,
            insetInlineStart: 'unset',
            transform: 'translate(100%, -50%)',
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

          [`${componentCls}-bar-area`]: {
            width: '100%',
            height: '600%',
          },

          [`${componentCls}-bar-resizable`]: {
            width: resizableSize,
            height: '100%',
          },

          [`${componentCls}-bar-collapse-previous`]: {
            top: 0,
            insetInlineStart: '50%',
            transform: 'translate(-50%, -100%) rotate(90deg)',
          },

          [`${componentCls}-bar-collapse-next`]: {
            bottom: 0,
            insetInlineStart: '50%',
            transform: 'translate(-50%, 100%) rotate(90deg)',
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },

      // moving
      '&-resizing': {
        userSelect: 'none',

        [`>${componentCls}-panel`]: {
          transition: 'none',
        },

        [`> ${componentCls}-bar`]: {
          [`${componentCls}-bar-collapse-icon`]: {
            display: 'block',
          },
        },
      },

      [`&-resizing${componentCls}-horizontal`]: {
        cursor: 'col-resize',
      },

      [`&-resizing${componentCls}-vertical`]: {
        cursor: 'row-resize',
      },

      // panel
      '&-panel': {
        overflow: 'auto',
        transition: `flex-basis ${motionDurationFast}`,
        scrollbarWidth: 'thin',
      },

      ...genRtlStyle(token),
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Splitter'> = (token) => ({
  resizableSize: 10,
  collapsibleIconSize: token.fontSize,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Splitter',
  (token) => [genSplitterStyle(token)],
  prepareComponentToken,
);
