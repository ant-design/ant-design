import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 可改变大小标识 元素大小
   * @descEN Height of content area
   */
  resizeSpinnerSize: number;
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
  splitTriggerSize: number;
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

const centerStyle: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const genSplitterStyle: GenerateStyle<SplitterToken> = (token: SplitterToken): CSSObject => {
  const {
    componentCls,
    colorPrimary,
    colorFill,
    colorTextTertiary,
    colorFillTertiary,
    resizeSpinnerSize,
    borderRadius,
    collapsibleIconSize,
    zIndexPopupBase,
    motionDurationFast,
    paddingXXS,
    splitBarSize,
    splitTriggerSize,
    controlItemBgHover,
    controlItemBgActive,
    controlItemBgActiveHover,
  } = token;

  const splitBarCls = `${componentCls}-bar`;

  const halfTriggerSize = token.calc(splitTriggerSize).div(2).equal();

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'stretch',

      // ======================== SplitBar ========================
      // Use `>` to avoid conflict with mix layout
      [`> ${splitBarCls}`]: {
        flex: 'none',
        position: 'relative',
        userSelect: 'none',

        // ======================= Dragger =======================
        [`${splitBarCls}-dragger`]: {
          ...centerStyle,

          // Hover background
          '&:before': {
            content: '""',
            background: controlItemBgHover,
            transition: `all ${token.motionDurationSlow}`,
            ...centerStyle,
          },

          // Spinner
          '&:after': {
            content: '""',
            background: colorFill,
            ...centerStyle,
          },
        },

        // Hover
        '&:hover': {
          [`${splitBarCls}-dragger`]: {
            '&:before': {
              background: controlItemBgActive,
            },
          },
        },

        // Active
        '&-active': {
          '&, &:hover': {
            [`${splitBarCls}-dragger`]: {
              '&:before': {
                background: controlItemBgActiveHover,
              },
            },
          },
        },

        // Disabled
        '&-disabled': {
          [`${splitBarCls}-dragger`]: {
            pointerEvents: 'none',

            '&:after': {
              display: 'none',
            },
          },
        },

        // ======================= Collapse =======================
        [`${splitBarCls}-collapse-bar`]: {
          ...centerStyle,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        },
        // [`${splitBarCls}-collapse-icon`]: {
        //   position: 'absolute',
        //   top: '50%',
        //   fontSize: collapsibleIconSize,
        //   right: 0,
        //   transform: 'translateY(-50%)',
        // },
      },

      // // split bar
      // '&-bar': {
      //   flexGrow: 0,
      //   flexShrink: 0,
      //   position: 'relative',
      //   userSelect: 'none',

      //   '&:hover': {
      //     [`> ${componentCls}-bar-bg`]: {
      //       background: colorFill,
      //     },

      //     [`> ${componentCls}-bar-collapse-icon`]: {
      //       display: 'block',
      //     },
      //   },

      //   [`> ${componentCls}-bar-bg,
      //     > ${componentCls}-bar-area,
      //     > ${componentCls}-bar-resizable`]: {
      //     position: 'absolute',
      //     top: '50%',
      //     insetInlineStart: '50%',
      //     transform: 'translate(-50%, -50%)',
      //   },

      //   // 背景色
      //   [`> ${componentCls}-bar-bg`]: {
      //     background: colorFillTertiary,
      //     transition: `background-color ${motionDurationFast}`,
      //   },

      //   [`> ${componentCls}-bar-resizable`]: {
      //     borderRadius,
      //     pointerEvents: 'none',
      //     background: colorFill,
      //   },

      //   // 快捷折叠
      //   [`${componentCls}-bar-collapse-icon`]: {
      //     display: 'none',
      //     position: 'absolute',
      //     fontSize: collapsibleIconSize,
      //     zIndex: zIndexPopupBase,
      //     color: colorTextTertiary,
      //     padding: paddingXXS,

      //     '&:hover': {
      //       color: colorPrimary,
      //     },
      //   },
      // },
      // [`&-bar${componentCls}-bar-active`]: {
      //   [`> ${componentCls}-bar-bg`]: {
      //     background: colorFill,
      //   },

      //   [`> ${componentCls}-bar-collapse-icon`]: {
      //     display: 'block',
      //   },
      // },
      // '&-bar-disabled': {
      //   '&:hover': {
      //     [`> ${componentCls}-bar-bg`]: {
      //       background: colorFillTertiary,
      //     },
      //   },
      // },

      // ========================= Layout =========================
      '&-horizontal': {
        flexDirection: 'row',

        [`> ${splitBarCls}`]: {
          width: 0,

          // ======================= Dragger =======================
          [`${splitBarCls}-dragger`]: {
            cursor: 'col-resize',
            height: '100%',
            width: splitTriggerSize,

            '&:before': {
              height: '100%',
              width: splitBarSize,
            },

            '&:after': {
              height: resizeSpinnerSize,
              width: splitBarSize,
            },
          },

          // ======================= Collapse =======================
          [`${splitBarCls}-collapse-bar`]: {
            '&-start': {
              left: {
                _skip_check_: true,
                value: 'auto',
              },
              right: {
                _skip_check_: true,
                value: halfTriggerSize,
              },
              transform: 'translateY(-50%)',
            },

            '&-end': {
              left: {
                _skip_check_: true,
                value: halfTriggerSize,
              },
              right: {
                _skip_check_: true,
                value: 'auto',
              },
              transform: 'translateY(-50%)',
            },
          },
        },

        // [`> ${componentCls}-bar`]: {
        //   width: 0,
        //   height: '100%',
        //   cursor: 'col-resize',

        //   [`> ${componentCls}-bar-bg`]: {
        //     width: splitBarSize,
        //     height: '100%',
        //   },

        //   [`${componentCls}-bar-area`]: {
        //     width: splitTriggerSize,
        //     height: '100%',
        //   },

        //   [`${componentCls}-bar-resizable`]: {
        //     width: splitBarSize,
        //     height: resizeSpinnerSize,
        //   },

        //   [`${componentCls}-bar-collapse-previous`]: {
        //     top: '50%',
        //     insetInlineEnd: 'unset',
        //     insetInlineStart: 0,
        //     transform: 'translate(-115%, -50%)',
        //   },

        //   [`${componentCls}-bar-collapse-next`]: {
        //     top: '50%',
        //     insetInlineEnd: 0,
        //     insetInlineStart: 'unset',
        //     transform: 'translate(115%, -50%)',
        //   },
        // },

        // [`> ${componentCls}-bar-disabled`]: {
        //   cursor: 'default',
        // },
      },

      '&-vertical': {
        flexDirection: 'column',

        [`> ${splitBarCls}`]: {
          height: 0,

          // Dragger
          [`${splitBarCls}-dragger`]: {
            cursor: 'row-resize',
            width: '100%',
            height: splitTriggerSize,

            '&:before': {
              width: '100%',
              height: splitBarSize,
            },

            '&:after': {
              width: resizeSpinnerSize,
              height: splitBarSize,
            },
          },
        },

        // [`> ${componentCls}-bar`]: {
        //   width: '100%',
        //   height: 0,
        //   cursor: 'row-resize',

        //   [`> ${componentCls}-bar-bg`]: {
        //     width: '100%',
        //     height: splitBarSize,
        //   },

        //   [`${componentCls}-bar-area`]: {
        //     width: '100%',
        //     height: splitTriggerSize,
        //   },

        //   [`${componentCls}-bar-resizable`]: {
        //     width: resizeSpinnerSize,
        //     height: splitBarSize,
        //   },

        //   [`${componentCls}-bar-collapse-previous`]: {
        //     top: 0,
        //     insetInlineStart: '50%',
        //     transform: 'translate(-50%, -115%) rotate(90deg)',
        //   },

        //   [`${componentCls}-bar-collapse-next`]: {
        //     bottom: 0,
        //     insetInlineStart: '50%',
        //     transform: 'translate(-50%, 115%) rotate(90deg)',
        //   },
        // },

        // [`> ${componentCls}-bar-disabled`]: {
        //   cursor: 'default',
        // },
      },

      // transition
      '&-transition': {
        [`${componentCls}-panel`]: {
          transition: `flex-basis ${motionDurationFast}`,
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

      // ========================= Panels =========================
      '&-panel': {
        overflow: 'auto',
        padding: '0 1px',
        scrollbarWidth: 'thin',
        boxSizing: 'border-box',
      },
      '&-panel-hidden': {
        padding: 0,
      },

      ...genRtlStyle(token),
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Splitter'> = (token) => {
  const splitBarSize = token.splitBarSize || 2;
  const splitTriggerSize = token.splitTriggerSize || 8;

  const resizeSpinnerSize = token.resizeSpinnerSize || 10;

  const collapsibleIconSize = token.resizeSpinnerSize || token.fontSize;

  return {
    splitBarSize,
    splitTriggerSize,
    resizeSpinnerSize,
    collapsibleIconSize,
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  'Splitter',
  (token) => [genSplitterStyle(token)],
  prepareComponentToken,
);
