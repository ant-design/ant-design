import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import { mergeToken } from '../../theme/internal';
import type { SelectToken } from './token';

function genSizeStyle(token: SelectToken, suffix?: string): CSSObject {
  const { componentCls, inputPaddingHorizontalBase, borderRadius } = token;

  const selectHeightWithoutBorder = token
    .calc(token.controlHeight)
    .sub(token.calc(token.lineWidth).mul(2))
    .equal();

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
        flex: '1 1 auto',

        [`${componentCls}-selection-search`]: {
          position: 'absolute',
          inset: 0,
          width: '100%',

          '&-input': {
            width: '100%',
            WebkitAppearance: 'textfield',
          },
        },

        [`
          ${componentCls}-selection-item,
          ${componentCls}-selection-placeholder
        `]: {
          display: 'block',
          padding: 0,
          lineHeight: unit(selectHeightWithoutBorder),
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
        &${componentCls}-show-arrow ${componentCls}-selection-search,
        &${componentCls}-show-arrow ${componentCls}-selection-placeholder
      `]: {
        paddingInlineEnd: token.showArrowPaddingInlineEnd,
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
          alignItems: 'center',
          padding: `0 ${unit(inputPaddingHorizontalBase)}`,

          [`${componentCls}-selection-search-input`]: {
            height: selectHeightWithoutBorder,
          },

          '&:after': {
            lineHeight: unit(selectHeightWithoutBorder),
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
            padding: `0 ${unit(inputPaddingHorizontalBase)}`,

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

  const inputPaddingHorizontalSM = token
    .calc(token.controlPaddingHorizontalSM)
    .sub(token.lineWidth)
    .equal();

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
          [`${componentCls}-selector`]: {
            padding: `0 ${unit(inputPaddingHorizontalSM)}`,
          },

          // With arrow should provides `padding-right` to show the arrow
          [`&${componentCls}-show-arrow ${componentCls}-selection-search`]: {
            insetInlineEnd: token
              .calc(inputPaddingHorizontalSM)
              .add(token.calc(token.fontSize).mul(1.5))
              .equal(),
          },

          [`
            &${componentCls}-show-arrow ${componentCls}-selection-item,
            &${componentCls}-show-arrow ${componentCls}-selection-placeholder
          `]: {
            paddingInlineEnd: token.calc(token.fontSize).mul(1.5).equal(),
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
