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
  /**
   * @desc 拖拽标识元素大小
   * @descEN Drag the element size
   */
  splitBarSize: number;
  /**
   * @desc 拖拽触发区域大小
   * @descEN Drag and drop trigger area size
   */
  splitTriggerArea: number;
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
    splitBarSize,
    splitTriggerArea,
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
        position: 'relative',

        '&:hover': {
          [`> ${componentCls}-bar-bg`]: {
            background: colorFill,
          },

          [`> ${componentCls}-bar-collapse-icon`]: {
            display: 'block',
          },
        },

        [`> ${componentCls}-bar-bg,
          > ${componentCls}-bar-area,
          > ${componentCls}-bar-resizable`]: {
          position: 'absolute',
          top: '50%',
          insetInlineStart: '50%',
          transform: 'translate(-50%, -50%)',
        },

        // 背景色
        [`> ${componentCls}-bar-bg`]: {
          background: colorFillTertiary,
          transition: `background-color ${motionDurationFast}`,
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

        [`> ${componentCls}-bar-collapse-icon`]: {
          display: 'block',
        },
      },
      '&-bar-disabled': {
        '&:hover': {
          [`> ${componentCls}-bar-bg`]: {
            background: colorFillTertiary,
          },
        },
      },

      // Layout
      '&-horizontal': {
        flexDirection: 'row',

        [`> ${componentCls}-bar`]: {
          width: 0,
          height: '100%',
          cursor: 'col-resize',

          [`> ${componentCls}-bar-bg`]: {
            width: splitBarSize,
            height: '100%',
          },

          [`${componentCls}-bar-area`]: {
            width: splitTriggerArea,
            height: '100%',
          },

          [`${componentCls}-bar-resizable`]: {
            width: splitBarSize,
            height: resizableSize,
          },

          [`${componentCls}-bar-collapse-previous`]: {
            top: '50%',
            insetInlineEnd: 'unset',
            insetInlineStart: 0,
            transform: 'translate(-115%, -50%)',
          },

          [`${componentCls}-bar-collapse-next`]: {
            top: '50%',
            insetInlineEnd: 0,
            insetInlineStart: 'unset',
            transform: 'translate(115%, -50%)',
          },
        },

        [`> ${componentCls}-bar-disabled`]: {
          cursor: 'default',
        },
      },
      '&-vertical': {
        flexDirection: 'column',

        [`> ${componentCls}-bar`]: {
          width: '100%',
          height: 0,
          cursor: 'row-resize',

          [`> ${componentCls}-bar-bg`]: {
            width: '100%',
            height: splitBarSize,
          },

          [`${componentCls}-bar-area`]: {
            width: '100%',
            height: splitTriggerArea,
          },

          [`${componentCls}-bar-resizable`]: {
            width: resizableSize,
            height: splitBarSize,
          },

          [`${componentCls}-bar-collapse-previous`]: {
            top: 0,
            insetInlineStart: '50%',
            transform: 'translate(-50%, -115%) rotate(90deg)',
          },

          [`${componentCls}-bar-collapse-next`]: {
            bottom: 0,
            insetInlineStart: '50%',
            transform: 'translate(-50%, 115%) rotate(90deg)',
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
        padding: '0 1px',
        scrollbarWidth: 'thin',
        boxSizing: 'border-box',
        transition: `flex-basis ${motionDurationFast}`,
      },

      ...genRtlStyle(token),
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Splitter'> = (token) => {
  const splitBarSize = token.splitBarSize || 2;
  const resizableSize = token.resizableSize || 10;
  const collapsibleIconSize = token.resizableSize || token.fontSize;
  const splitTriggerArea = splitBarSize * 6;

  return {
    splitBarSize,
    splitTriggerArea,
    resizableSize,
    collapsibleIconSize,
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  'Splitter',
  (token) => [genSplitterStyle(token)],
  prepareComponentToken,
);
