import { unit } from '@ant-design/cssinjs';

import { genBasicInputStyle, genPlaceholderStyle, initComponentToken, initInputToken } from '../../input/style';
import type { SharedComponentToken, SharedInputToken } from '../../input/style/token';
import {
  genBorderlessStyle,
  genDisabledStyle,
  genFilledStyle,
  genOutlinedStyle,
  genUnderlinedStyle,
} from '../../input/style/variants';
import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 弹层 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number;
  /**
   * @desc 弹层高度
   * @descEN Height of popup
   */
  dropdownHeight: number | string;
  /**
   * @desc 菜单项高度
   * @descEN Height of menu item
   */
  controlItemWidth: number | string;
}

/**
 * @desc Mentions 组件的 Token
 * @descEN Token for Mentions component
 */
type MentionsToken = FullToken<'Mentions'> &
  SharedInputToken & {
    /**
     * @desc 菜单项内边距
     * @descEN Padding of menu item
     */
    itemPaddingVertical: string | number;
  };

const genMentionsStyle: GenerateStyle<MentionsToken> = (token) => {
  const {
    componentCls,
    colorTextDisabled,
    controlItemBgHover,
    controlPaddingHorizontal,
    colorText,
    motionDurationSlow,
    lineHeight,
    controlHeight,
    paddingInline,
    paddingBlock,
    fontSize,
    fontSizeIcon,
    colorTextTertiary,
    colorTextQuaternary,
    colorBgElevated,
    paddingXXS,
    paddingLG,
    borderRadius,
    borderRadiusLG,
    boxShadowSecondary,
    itemPaddingVertical,
    calc,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),

      position: 'relative',
      display: 'inline-block',
      height: 'auto',
      padding: 0,
      overflow: 'hidden',
      lineHeight,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'bottom',

      // Variants
      ...genOutlinedStyle(token),
      ...genFilledStyle(token),
      ...genBorderlessStyle(token),

      '&-affix-wrapper': {
        ...genBasicInputStyle(token),
        display: 'inline-flex',
        padding: 0,

        '&::before': {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"',
        },

        [`${componentCls}-suffix`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: paddingInline,
          bottom: 0,
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          margin: 'auto',
        },

        [`&:has(${componentCls}-suffix) > ${componentCls} > textarea`]: {
          paddingInlineEnd: paddingLG,
        },

        [`${componentCls}-clear-icon`]: {
          position: 'absolute',
          insetInlineEnd: 0,
          insetBlockStart: calc(fontSize).mul(lineHeight).mul(0.5).add(paddingBlock).equal(),
          transform: `translateY(-50%)`,
          margin: 0,
          padding: 0,
          color: colorTextQuaternary,
          fontSize: fontSizeIcon,
          verticalAlign: -1,
          // https://github.com/ant-design/ant-design/pull/18151
          // https://codesandbox.io/s/wizardly-sun-u10br
          cursor: 'pointer',
          transition: `color ${motionDurationSlow}`,

          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',

          '&:hover': {
            color: colorTextTertiary,
          },

          '&:active': {
            color: colorText,
          },

          '&-hidden': {
            visibility: 'hidden',
          },
        },
      },

      // 覆盖 affix-wrapper borderRadius！
      ...genUnderlinedStyle(token),

      '&-disabled': {
        '> textarea': {
          ...genDisabledStyle(token),
        },
      },

      // ================= Input Area =================
      [`&, &-affix-wrapper > ${componentCls}`]: {
        [`> textarea, ${componentCls}-measure`]: {
          color: colorText,
          boxSizing: 'border-box',
          minHeight: token.calc(controlHeight).sub(2),
          margin: 0,
          padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
          overflow: 'inherit',
          overflowX: 'hidden',
          overflowY: 'auto',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontStyle: 'inherit',
          fontVariant: 'inherit',
          fontSizeAdjust: 'inherit',
          fontStretch: 'inherit',
          lineHeight: 'inherit',
          direction: 'inherit',
          letterSpacing: 'inherit',
          whiteSpace: 'inherit',
          textAlign: 'inherit',
          verticalAlign: 'top',
          wordWrap: 'break-word',
          wordBreak: 'inherit',
          tabSize: 'inherit',
        },

        '> textarea': {
          width: '100%',
          border: 'none',
          outline: 'none',
          resize: 'none',
          backgroundColor: 'transparent',
          ...genPlaceholderStyle(token.colorTextPlaceholder),
        },

        [`${componentCls}-measure`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          zIndex: -1,
          color: 'transparent',
          pointerEvents: 'none',

          '> span': {
            display: 'inline-block',
            minHeight: '1em',
          },
        },
      },

      // ================== Dropdown ==================
      '&-dropdown': {
        // Ref select dropdown style
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        insetInlineStart: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: 'border-box',
        fontSize,
        fontVariant: 'initial',
        padding: paddingXXS,
        backgroundColor: colorBgElevated,
        borderRadius: borderRadiusLG,
        outline: 'none',
        boxShadow: boxShadowSecondary,

        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-dropdown-menu`]: {
          maxHeight: token.dropdownHeight,
          margin: 0,
          paddingInlineStart: 0, // Override default ul/ol
          overflow: 'auto',
          listStyle: 'none',
          outline: 'none',

          '&-item': {
            ...textEllipsis,
            position: 'relative',
            display: 'block',
            minWidth: token.controlItemWidth,
            padding: `${unit(itemPaddingVertical)} ${unit(controlPaddingHorizontal)}`,
            color: colorText,
            borderRadius,
            fontWeight: 'normal',
            lineHeight,
            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&:hover': {
              backgroundColor: controlItemBgHover,
            },

            '&-disabled': {
              color: colorTextDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: colorTextDisabled,
                backgroundColor: controlItemBgHover,
                cursor: 'not-allowed',
              },
            },

            '&-selected': {
              color: colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: controlItemBgHover,
            },

            '&-active': {
              backgroundColor: controlItemBgHover,
            },
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Mentions'> = (token) => ({
  ...initComponentToken(token),
  dropdownHeight: 250,
  controlItemWidth: 100,
  zIndexPopup: token.zIndexPopupBase + 50,
  itemPaddingVertical: (token.controlHeight - token.fontHeight) / 2,
});

// ============================== Export ==============================
export default genStyleHooks(
  'Mentions',
  (token) => {
    const mentionsToken = mergeToken<MentionsToken>(token, initInputToken(token));
    return [genMentionsStyle(mentionsToken)];
  },
  prepareComponentToken,
);
