import { CSSObject } from '@ant-design/cssinjs';
import {
  FullToken,
  genComponentStyleHook,
  GenerateStyle,
  mergeToken,
  resetComponent,
  roundedArrow,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../_util/theme';
import {
  genActiveStyle,
  genBasicInputStyle,
  genHoverStyle,
  initInputToken,
  InputToken,
} from '../../input/style';

export interface ComponentToken {
  zIndexDropdown: number;
  pickerTextHeight: number;
}

type PickerToken = InputToken<FullToken<'DatePicker'>> & {
  arrowWidth: number;
  hashId?: string;
};

const genPikerPadding = (
  token: PickerToken,
  inputHeight: number,
  fontSize: number,
  paddingHorizontal: number,
): CSSObject => {
  const fontHeight = Math.floor(fontSize * token.lineHeight) + 2;
  const paddingTop = Math.max((inputHeight - fontHeight) / 2, 0);
  const paddingBottom = Math.max(inputHeight - fontHeight - paddingTop, 0);

  return {
    padding: `${paddingTop}px ${paddingHorizontal}px ${paddingBottom}px`,
  };
};

const genPickerStyle: GenerateStyle<PickerToken> = token => {
  const { componentCls, antCls } = token;

  // @ts-ignore
  // @ts-ignore
  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genPikerPadding(token, token.controlHeight, token.fontSize, token.inputPaddingHorizontal),
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      background: token.colorBgComponent,
      border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
      borderRadius: token.radiusBase,
      transition: `border ${token.motionDurationSlow}, box-shadow ${token.motionDurationSlow}`,

      '&:hover, &-focused': {
        ...genHoverStyle(token),
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      '&&-disabled': {
        background: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        [`${componentCls}-suffix`]: {
          color: token.colorTextDisabled,
        },
      },

      '&&-borderless': {
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        boxShadow: 'none !important',
      },

      // ======================== Input =========================
      [`${componentCls}-input`]: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',

        '> input': {
          ...genBasicInputStyle(token),
          flex: 'auto',

          // Fix Firefox flex not correct:
          // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
          minWidth: 1,
          height: 'auto',
          padding: 0,
          background: 'transparent',
          border: 0,

          '&:focus': {
            boxShadow: 'none',
          },

          '&[disabled]': {
            background: 'transparent',
          },
        },

        '&:hover': {
          [`${componentCls}-clear`]: {
            opacity: 1,
          },
        },

        '&-placeholder': {
          '> input': {
            color: token.colorPlaceholder,
          },
        },
      },

      // Size
      '&-large': {
        ...genPikerPadding(
          token,
          token.controlHeightLG,
          token.fontSizeLG,
          token.inputPaddingHorizontal,
        ),

        [`${componentCls}-input > input`]: {
          fontSize: token.fontSizeLG,
        },
      },

      '&-small': {
        ...genPikerPadding(
          token,
          token.controlHeightSM,
          token.fontSize,
          token.inputPaddingHorizontalSM,
        ),
      },

      [`${componentCls}-suffix`]: {
        display: 'flex',
        flex: 'none',
        alignSelf: 'center',
        marginLeft: token.paddingXS / 2,
        color: token.colorTextDisabled,
        lineHeight: 1,
        pointerEvents: 'none',

        '> *': {
          verticalAlign: 'top',

          '&:not(:last-child)': {
            marginInlineEnd: token.marginXS,
          },
        },
      },

      [`${componentCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        insetInlineEnd: 0,
        color: token.colorTextDisabled,
        lineHeight: 1,
        background: token.colorBgComponent,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        opacity: 0,
        transition: `opacity ${token.motionDurationSlow}, color ${token.motionDurationSlow}`,

        '> *': {
          verticalAlign: 'top',
        },

        '&:hover': {
          color: token.colorTextSecondary,
        },
      },

      [`${componentCls}-separator`]: {
        position: 'relative',
        display: 'inline-block',
        width: '1em',
        height: token.fontSizeLG,
        color: token.colorTextDisabled,
        fontSize: token.fontSizeLG,
        verticalAlign: 'top',
        cursor: 'default',

        [`${componentCls}-focused &`]: {
          color: token.colorTextSecondary,
        },

        [`${componentCls}-range-separator &`]: {
          [`${componentCls}-disabled &`]: {
            cursor: 'not-allowed',
          },
        },
      },

      // ======================== Range =========================
      '&-range': {
        position: 'relative',
        display: 'inline-flex',

        // Clear
        [`${componentCls}-clear`]: {
          insetInlineEnd: token.inputPaddingHorizontal,
        },

        '&:hover': {
          [`${componentCls}-clear`]: {
            opacity: 1,
          },
        },

        // Active bar
        [`${componentCls}-active-bar`]: {
          bottom: -token.controlLineWidth,
          height: 2, // FIXME: v4 magic number
          marginInlineStart: token.inputPaddingHorizontal,
          background: token.colorPrimary,
          opacity: 0,
          transition: `all ${token.motionDurationSlow} ease-out`,
          pointerEvents: 'none',
        },

        [`&${componentCls}-focused`]: {
          [`${componentCls}-active-bar`]: {
            opacity: 1,
          },
        },

        [`${componentCls}-range-separator`]: {
          alignItems: 'center',
          padding: `0 ${token.paddingXS}`,
          lineHeight: 1,
        },

        [`&${componentCls}-small`]: {
          [`${componentCls}-clear`]: {
            insetInlineEnd: token.inputPaddingHorizontalSM,
          },

          [`${componentCls}-active-bar`]: {
            marginInlineStart: token.inputPaddingHorizontalSM,
          },
        },
      },

      // ======================= Dropdown =======================
      '&-dropdown': {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: token.zIndexDropdown,

        '&-hidden': {
          display: 'none',
        },

        '&-placement-bottomLeft': {
          [`${componentCls}-range-arrow`]: {
            top: `${token.arrowWidth / 2 - token.arrowWidth / 3 + 0.7}px`,
            display: 'block',
            transform: 'rotate(-135deg) translateY(1px)',
          },
        },

        '&-placement-topLeft': {
          [`${componentCls}-range-arrow`]: {
            bottom: `${token.arrowWidth / 2 - token.arrowWidth / 3 + 0.7}px`,
            display: 'block',
            transform: 'rotate(45deg)',
          },
        },

        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topLeft,
   &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topRight,
   &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topLeft,
   &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topRight`]: {
          animationName: slideDownIn.getName(token.hashId),
        },

        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomLeft,
   &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomRight,
   &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomLeft,
   &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomRight`]: {
          animationName: slideUpIn.getName(token.hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topLeft,
     &${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topRight`]: {
          animationName: slideDownOut.getName(token.hashId),
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomLeft,
     &${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomRight`]: {
          animationName: slideUpOut.getName(token.hashId),
        },

        // Time picker with additional style
        [`${componentCls}-panel > ${componentCls}-time-panel`]: {
          paddingTop: token.paddingXS / 2,
        },
      },

      '&-dropdown-range': {
        padding: `${(token.arrowWidth * 2) / 3}px 0`,

        '&-hidden': {
          display: 'none',
        },
      },

      // ======================== Ranges ========================
      // '&-ranges': {
      //   marginBottom: 0,
      //   padding: `${token.paddingXS / 2}px ${token.paddingSM}`,
      //   overflow: 'hidden',
      //   lineHeight: token.pickerTextHeight - 2 * token.controlLineWidth - token.paddingXS / 2,
      //   textAlign: 'start',
      //   listStyle: 'none',
      //
      //   '> li': {
      //     display: 'inline-block',
      //   },
      //
      //   // https://github.com/ant-design/ant-design/issues/23687
      //   [`${componentCls}-preset > ${antCls}-tag-blue`]: {
      //     color: token.colorPrimary,
      //     background: @primary-1,
      //     border-color: @primary-3,
      //     cursor: pointer,
      //   }
      //
      //   ${componentCls}-ok {
      //     float: right,
      //     margin-left: @padding-xs,
      //   }
      // }

      [`${componentCls}-range-wrapper`]: {
        display: 'flex',
      },

      [`${componentCls}-range-arrow`]: {
        position: 'absolute',
        zIndex: 1,
        display: 'none',
        width: token.arrowWidth,
        height: token.arrowWidth,
        marginInlineStart: token.inputPaddingHorizontal * 1.5,
        background: `linear-gradient(
     135deg,
     transparent 40%,
     ${token.colorBgComponent} 40%
   )`, // Use linear-gradient to prevent arrow from covering text
        boxShadow: `2px 2px 6px -2px fade('#000, 10%)`, // use spread radius to hide shadow over popover, FIXME: v4 magic
        transition: `left ${token.motionDurationSlow} ease-out`,
        ...roundedArrow(token.arrowWidth, 5, token.colorBgComponent),
      },

      [`${componentCls}-panel-containe`]: {
        overflow: 'hidden',
        verticalAlign: 'top',
        background: token.colorBgComponent,
        borderRadius: token.radiusBase,
        boxShadow: token.boxShadow,
        transition: `margin ${token.motionDurationSlow}`,

        [`${componentCls}-panels`]: {
          display: 'inline-flex',
          flexWrap: 'nowrap',
          direction: 'ltr',
        },

        [`${componentCls}-panel`]: {
          verticalAlign: 'top',
          background: 'transparent',
          borderWidth: `0 0 ${token.controlLineWidth}px`,
          borderRadius: 0,

          [`${componentCls}-content,
       table`]: {
            textAlign: 'center',
          },

          '&-focused': {
            borderColor: token.colorBorder,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'DatePicker',
  (token, { hashId }) => {
    const pickerToken = mergeToken<PickerToken>(initInputToken<FullToken<'DatePicker'>>(token), {
      arrowWidth: 8 * Math.sqrt(2),
      hashId,
    });
    return [genPickerStyle(pickerToken)];
  },
  token => ({
    zIndexDropdown: token.zIndexPopup + 50,
    pickerTextHeight: 40,
  }),
);
