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
        //   .@{select-prefix-cls}-selection-item {
        //     position: relative;
        //     user-select: none;
        //   }
        //   .@{select-prefix-cls}-selection-placeholder {
        //     transition: none;
        //     pointer-events: none;
        //   }
        //   // For common baseline align
        //   &::after,
        //   /* For '' value baseline align */
        //   .@{select-prefix-cls}-selection-item::after,
        //   /* For undefined value baseline align */
        //   .@{select-prefix-cls}-selection-placeholder::after {
        //     display: inline-block;
        //     width: 0;
        //     visibility: hidden;
        //     content: '\a0';
        //   }
      },

      // // With arrow should provides `padding-right` to show the arrow
      // &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-search {
      //   right: @input-padding-horizontal-base + @font-size-base;
      // }
      // &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-item,
      // &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-placeholder {
      //   padding-right: @selection-item-padding;
      // }
      // // Opacity selection if open
      // &.@{select-prefix-cls}-open .@{select-prefix-cls}-selection-item {
      //   color: @input-placeholder-color;
      // }
      // // ========================== Input ==========================
      // // We only change the style of non-customize input which is only support by `combobox` mode.
      // // Not customize
      // &:not(.@{select-prefix-cls}-customize-input) {
      //   .@{select-prefix-cls}-selector {
      //     width: 100%;
      //     height: @input-height-base;
      //     padding: 0 @input-padding-horizontal-base;
      //     .@{select-prefix-cls}-selection-search-input {
      //       height: @select-height-without-border;
      //     }
      //     &::after {
      //       line-height: @select-height-without-border;
      //     }
      //   }
      // }
      // &.@{select-prefix-cls}-customize-input {
      //   .@{select-prefix-cls}-selector {
      //     &::after {
      //       display: none;
      //     }
      //     .@{select-prefix-cls}-selection-search {
      //       position: static;
      //       width: 100%;
      //     }
      //     .@{select-prefix-cls}-selection-placeholder {
      //       position: absolute;
      //       right: 0;
      //       left: 0;
      //       padding: 0 @input-padding-horizontal-base;
      //       &::after {
      //         display: none;
      //       }
      //     }
      //   }
      // }
      // // ============================================================
      // // ==                          Size                          ==
      // // ============================================================
      // .select-size(@suffix, @input-height) {
      //   @merged-cls: ~'@{select-prefix-cls}-@{suffix}';
      //   &.@{merged-cls}:not(.@{select-prefix-cls}-customize-input) {
      //     .@{select-prefix-cls}-selector {
      //       height: @input-height;
      //       &::after,
      //       .@{select-prefix-cls}-selection-item,
      //       .@{select-prefix-cls}-selection-placeholder {
      //         line-height: @input-height - 2 * @border-width-base;
      //       }
      //     }
      //     // Not customize
      //     &:not(.@{select-prefix-cls}-customize-input) {
      //       .@{select-prefix-cls}-selection-search-input {
      //         height: @input-height - 2 * @border-width-base;
      //       }
      //     }
      //   }
      // }
      // .select-size('lg', @select-single-item-height-lg);
      // .select-size('sm', @input-height-sm);
      // // Size small need additional set padding
      // &.@{select-prefix-cls}-sm {
      //   &:not(.@{select-prefix-cls}-customize-input) {
      //     .@{select-prefix-cls}-selection-search {
      //       right: @input-padding-horizontal-sm;
      //       left: @input-padding-horizontal-sm;
      //     }
      //     .@{select-prefix-cls}-selector {
      //       padding: 0 @input-padding-horizontal-sm;
      //     }
      //     // With arrow should provides `padding-right` to show the arrow
      //     &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-search {
      //       right: @input-padding-horizontal-sm + @font-size-base * 1.5;
      //     }
      //     &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-item,
      //     &.@{select-prefix-cls}-show-arrow .@{select-prefix-cls}-selection-placeholder {
      //       padding-right: @font-size-base * 1.5;
      //     }
      //   }
      // }
      // &.@{select-prefix-cls}-lg {
      //   &:not(.@{select-prefix-cls}-customize-input) {
      //     .@{select-prefix-cls}-selector {
      //       padding: 0 @input-padding-horizontal-lg;
      //     }
      //   }
      // }
    },
  };
}
