import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { SelectToken } from '.';
import { mergeToken } from '../../theme/internal';

function genSizeStyle(token: SelectToken, suffix?: string): CSSObject {
  const { componentCls, inputPaddingHorizontalBase, borderRadius } = token;

  const selectHeightWithoutBorder = token.controlHeight - token.lineWidth * 2;

  const selectionItemPadding = Math.ceil(token.fontSize * 1.25);

  const suffixCls = suffix ? `${componentCls}-${suffix}` : '';

  return {
    [`${componentCls}-single${suffixCls}`]: {
      fontSize: token.fontSize,
      height: token.controlHeight,

      // ========================= Selector =========================
      [`${componentCls}-selector`]: {
        ...resetComponent(token, true),

        display: 'flex',
        borderRadius,

        [`${componentCls}-selection-search`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: inputPaddingHorizontalBase,
          insetInlineEnd: inputPaddingHorizontalBase,
          bottom: 0,

          '&-input': {
            width: '100%',
          },
        },

        [`
          ${componentCls}-selection-item,
          ${componentCls}-selection-placeholder
        `]: {
          padding: 0,
          lineHeight: `${selectHeightWithoutBorder}px`,
          transition: `all ${token.motionDurationSlow}, visibility 0s`,
          alignSelf: 'center',
        },

        [`${componentCls}-selection-placeholder`]: {
          transition: 'none',
          pointerEvents: 'none',
        },

        // For common baseline align
        [[
          '&:after',
          /* For '' value baseline align */
          `${componentCls}-selection-item:empty:after`,
          /* For undefined value baseline align */
          `${componentCls}-selection-placeholder:empty:after`,
        ].join(',')]: {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"',
        },
      },

      [`
        &${componentCls}-show-arrow ${componentCls}-selection-item,
        &${componentCls}-show-arrow ${componentCls}-selection-placeholder
      `]: {
        paddingInlineEnd: selectionItemPadding,
      },

      // Opacity selection if open
      [`&${componentCls}-open ${componentCls}-selection-item`]: {
        color: token.colorTextPlaceholder,
      },

      // ========================== Input ==========================
      // We only change the style of non-customize input which is only support by `combobox` mode.
      // Not customize
      [`&:not(${componentCls}-customize-input)`]: {
        [`${componentCls}-selector`]: {
          width: '100%',
          height: '100%',
          padding: `0 ${inputPaddingHorizontalBase}px`,

          [`${componentCls}-selection-search-input`]: {
            height: selectHeightWithoutBorder,
          },

          '&:after': {
            lineHeight: `${selectHeightWithoutBorder}px`,
          },
        },
      },

      [`&${componentCls}-customize-input`]: {
        [`${componentCls}-selector`]: {
          '&:after': {
            display: 'none',
          },

          [`${componentCls}-selection-search`]: {
            position: 'static',
            width: '100%',
          },

          [`${componentCls}-selection-placeholder`]: {
            position: 'absolute',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            padding: `0 ${inputPaddingHorizontalBase}px`,

            '&:after': {
              display: 'none',
            },
          },
        },
      },
    },
  };
}

export default function genSingleStyle(token: SelectToken): CSSInterpolation {
  const { componentCls } = token;

  const inputPaddingHorizontalSM = token.controlPaddingHorizontalSM - token.lineWidth;

  return [
    genSizeStyle(token),

    // ======================== Small ========================
    // Shared
    genSizeStyle(
      mergeToken<any>(token, {
        controlHeight: token.controlHeightSM,
        borderRadius: token.borderRadiusSM,
      }),
      'sm',
    ),

    // padding
    {
      [`${componentCls}-single${componentCls}-sm`]: {
        [`&:not(${componentCls}-customize-input)`]: {
          [`${componentCls}-selection-search`]: {
            insetInlineStart: inputPaddingHorizontalSM,
            insetInlineEnd: inputPaddingHorizontalSM,
          },

          [`${componentCls}-selector`]: {
            padding: `0 ${inputPaddingHorizontalSM}px`,
          },

          // With arrow should provides `padding-right` to show the arrow
          [`&${componentCls}-show-arrow ${componentCls}-selection-search`]: {
            insetInlineEnd: inputPaddingHorizontalSM + token.fontSize * 1.5,
          },

          [`
            &${componentCls}-show-arrow ${componentCls}-selection-item,
            &${componentCls}-show-arrow ${componentCls}-selection-placeholder
          `]: {
            paddingInlineEnd: token.fontSize * 1.5,
          },
        },
      },
    },

    // ======================== Large ========================
    // Shared
    genSizeStyle(
      mergeToken<any>(token, {
        controlHeight: token.singleItemHeightLG,
        fontSize: token.fontSizeLG,
        borderRadius: token.borderRadiusLG,
      }),
      'lg',
    ),
  ];
}
