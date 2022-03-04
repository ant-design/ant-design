import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  resetIcon,
  withPrefix,
  UseComponentStyleResult,
} from '../../_util/theme';
import type { SelectToken } from '.';

export default function genSingleStyle(
  prefixCls: string,
  iconPrefixCls: string,
  token: SelectToken,
  hashId: string,
): CSSObject {
  const { selectCls, inputPaddingHorizontalBase, selectHeightWithoutBorder } = token;

  const selectionItemPadding = Math.ceil(token.fontSize * 1.25);

  return {
    [`${selectCls}-single`]: {
      // ========================= Selector =========================
      [`${selectCls}-selector`]: {
        display: 'flex',
        [`${selectCls}-selection-search`]: {
          position: 'absolute',
          top: 0,
          right: inputPaddingHorizontalBase,
          bottom: 0,
          left: inputPaddingHorizontalBase,

          '&-input': {
            width: '100%',
          },
        },

        [`
          ${selectCls}-selection-item,
          ${selectCls}-selection-placeholder
        `]: {
          padding: 0,
          lineHeight: `${selectHeightWithoutBorder}px`,
          transition: `all ${token.duration}`,

          // Firefox inline-block position calculation is not same as Chrome & Safari. Patch this:
          '@supports (-moz-appearance: meterbar) &': {
            lineHeight: `${selectHeightWithoutBorder}px`,
          },
        },

        [`${selectCls}-selection-item`]: {
          position: 'relative',
          userSelect: 'none',
        },

        [`${selectCls}-selection-placeholder`]: {
          transition: 'none',
          pointerEvents: 'none',
        },

        // For common baseline align
        [[
          '&:after',
          /* For '' value baseline align */
          `${selectCls}-selection-item:after`,
          /* For undefined value baseline align */
          `${selectCls}-selection-placeholder:after`,
        ].join(',')]: {
          display: 'inline-block',
          width: 0,
          visibility: 'hidden',
          content: '"\\a0"',
        },
      },

      // With arrow should provides `padding-right` to show the arrow
      [`&${selectCls}-show-arrow ${selectCls}-selection-search`]: {
        right: inputPaddingHorizontalBase + token.fontSize,
      },

      [`
        &${selectCls}-show-arrow ${selectCls}-selection-item,
        &${selectCls}-show-arrow ${selectCls}-selection-placeholder
      `]: {
        paddingRight: selectionItemPadding,
      },

      // Opacity selection if open
      [`&${selectCls}-open ${selectCls}-selection-item`]: {
        color: token.placeholderColor,
      },

      // ========================== Input ==========================
      // We only change the style of non-customize input which is only support by `combobox` mode.
      // Not customize
      [`&:not(${selectCls}-customize-input)`]: {
        [`${selectCls}-selector`]: {
          width: '100%',
          height: token.height,
          padding: `0 ${inputPaddingHorizontalBase}px`,

          [`${selectCls}-selection-search-input`]: {
            height: selectHeightWithoutBorder,
          },

          '&:after': {
            lineHeight: `${selectHeightWithoutBorder}px`,
          },
        },
      },

      [`&${selectCls}-customize-input`]: {
        [`${selectCls}-selector`]: {
          '&:after': {
            display: 'none',
          },

          [`${selectCls}-selection-search`]: {
            position: 'static',
            width: '100%',
          },

          [`${selectCls}-selection-placeholder`]: {
            position: 'absolute',
            right: 0,
            left: 0,
            padding: `0 ${inputPaddingHorizontalBase}px`,

            '&:after': {
              display: 'none',
            },
          },
        },
      },

      // // ============================================================
      // // ==                          Size                          ==
      // // ============================================================
      // .select-size(@suffix, @input-height) {
      //   @merged-cls: ~'@{select-prefix-cls}-@{suffix}';
      //   &.@{merged-cls}:not(${selectCls}-customize-input) {
      //     ${selectCls}-selector {
      //       height: @input-height;
      //       &::after,
      //       ${selectCls}-selection-item,
      //       ${selectCls}-selection-placeholder {
      //         line-height: @input-height - 2 * @border-width-base;
      //       }
      //     }
      //     // Not customize
      //     &:not(${selectCls}-customize-input) {
      //       ${selectCls}-selection-search-input {
      //         height: @input-height - 2 * @border-width-base;
      //       }
      //     }
      //   }
      // }
      // .select-size('lg', @select-single-item-height-lg);
      // .select-size('sm', @input-height-sm);
      // // Size small need additional set padding
      // &${selectCls}-sm {
      //   &:not(${selectCls}-customize-input) {
      //     ${selectCls}-selection-search {
      //       right: @input-padding-horizontal-sm;
      //       left: @input-padding-horizontal-sm;
      //     }
      //     ${selectCls}-selector {
      //       padding: 0 @input-padding-horizontal-sm;
      //     }
      //     // With arrow should provides `padding-right` to show the arrow
      //     &${selectCls}-show-arrow ${selectCls}-selection-search {
      //       right: @input-padding-horizontal-sm + @font-size-base * 1.5;
      //     }
      //     &${selectCls}-show-arrow ${selectCls}-selection-item,
      //     &${selectCls}-show-arrow ${selectCls}-selection-placeholder {
      //       padding-right: @font-size-base * 1.5;
      //     }
      //   }
      // }
      // &${selectCls}-lg {
      //   &:not(${selectCls}-customize-input) {
      //     ${selectCls}-selector {
      //       padding: 0 @input-padding-horizontal-lg;
      //     }
      //   }
      // }
    },
  };
}
