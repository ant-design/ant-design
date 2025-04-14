import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusOutline, genFocusStyle, resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 选项文本颜色
   * @descEN Text color of item
   */
  itemColor: string;
  /**
   * @desc 选项悬浮态文本颜色
   * @descEN Text color of item when hover
   */
  itemHoverColor: string;
  /**
   * @desc 选项悬浮态背景颜色
   * @descEN Background color of item when hover
   */
  itemHoverBg: string;
  /**
   * @desc 选项激活态背景颜色
   * @descEN Background color of item when active
   */
  itemActiveBg: string;
  /**
   * @desc 选项选中时背景颜色
   * @descEN Background color of item when selected
   */
  itemSelectedBg: string;
  /**
   * @desc 选项选中时文字颜色
   * @descEN Text color of item when selected
   */
  itemSelectedColor: string;
  /**
   * @desc Segmented 控件容器的 padding
   * @descEN Padding of Segmented container
   */
  trackPadding: string | number;
  /**
   * @desc Segmented 控件容器背景色
   * @descEN Background of Segmented container
   */
  trackBg: string;
}

interface SegmentedToken extends FullToken<'Segmented'> {
  segmentedPaddingHorizontal: number | string;
  segmentedPaddingHorizontalSM: number | string;
}

// ============================== Mixins ==============================
function getItemDisabledStyle(cls: string, token: SegmentedToken): CSSObject {
  return {
    [`${cls}, ${cls}:hover, ${cls}:focus`]: {
      color: token.colorTextDisabled,
      cursor: 'not-allowed',
    },
  };
}

function getItemSelectedStyle(token: SegmentedToken): CSSObject {
  return {
    backgroundColor: token.itemSelectedBg,
    boxShadow: token.boxShadowTertiary,
  };
}

const segmentedTextEllipsisCss: CSSObject = {
  overflow: 'hidden',
  // handle text ellipsis
  ...textEllipsis,
};

// ============================== Styles ==============================
const genSegmentedStyle: GenerateStyle<SegmentedToken> = (token: SegmentedToken) => {
  const { componentCls } = token;

  const labelHeight = token
    .calc(token.controlHeight)
    .sub(token.calc(token.trackPadding).mul(2))
    .equal();
  const labelHeightLG = token
    .calc(token.controlHeightLG)
    .sub(token.calc(token.trackPadding).mul(2))
    .equal();
  const labelHeightSM = token
    .calc(token.controlHeightSM)
    .sub(token.calc(token.trackPadding).mul(2))
    .equal();

  return {
    [componentCls]: {
      ...resetComponent(token),

      display: 'inline-block',
      padding: token.trackPadding,
      color: token.itemColor,
      background: token.trackBg,
      borderRadius: token.borderRadius,
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      ...genFocusStyle(token),

      [`${componentCls}-group`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        justifyItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
      },

      // RTL styles
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`&${componentCls}-vertical`]: {
        [`${componentCls}-group`]: {
          flexDirection: 'column',
        },

        [`${componentCls}-thumb`]: {
          width: '100%',
          height: 0,
          padding: `0 ${unit(token.paddingXXS)}`,
        },
      },

      // block styles
      [`&${componentCls}-block`]: {
        display: 'flex',
      },

      [`&${componentCls}-block ${componentCls}-item`]: {
        flex: 1,
        minWidth: 0,
      },

      // item styles
      [`${componentCls}-item`]: {
        position: 'relative',
        textAlign: 'center',
        cursor: 'pointer',
        transition: `color ${token.motionDurationMid} ${token.motionEaseInOut}`,
        borderRadius: token.borderRadiusSM,
        // Fix Safari render bug
        // https://github.com/ant-design/ant-design/issues/45250
        transform: 'translateZ(0)',

        '&-selected': {
          ...getItemSelectedStyle(token),
          color: token.itemSelectedColor,
        },

        '&-focused': {
          ...genFocusOutline(token),
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: '100%',
          top: 0,
          insetInlineStart: 0,
          borderRadius: 'inherit',
          opacity: 0,
          transition: `opacity ${token.motionDurationMid}`,
          // This is mandatory to make it not clickable or hoverable
          // Ref: https://github.com/ant-design/ant-design/issues/40888
          pointerEvents: 'none',
        },

        [`&:hover:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)`]: {
          color: token.itemHoverColor,
          '&::after': {
            opacity: 1,
            backgroundColor: token.itemHoverBg,
          },
        },
        [`&:active:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)`]: {
          color: token.itemHoverColor,
          '&::after': {
            opacity: 1,
            backgroundColor: token.itemActiveBg,
          },
        },

        '&-label': {
          minHeight: labelHeight,
          lineHeight: unit(labelHeight),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
          ...segmentedTextEllipsisCss,
        },

        // syntactic sugar to add `icon` for Segmented Item
        '&-icon + *': {
          marginInlineStart: token.calc(token.marginSM).div(2).equal(),
        },

        '&-input': {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
        },
      },

      // thumb styles
      [`${componentCls}-thumb`]: {
        ...getItemSelectedStyle(token),

        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: 0,
        height: '100%',
        padding: `${unit(token.paddingXXS)} 0`,
        borderRadius: token.borderRadiusSM,
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, height ${token.motionDurationSlow} ${token.motionEaseInOut}`,

        [`& ~ ${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)::after`]:
          {
            backgroundColor: 'transparent',
          },
      },

      // size styles
      [`&${componentCls}-lg`]: {
        borderRadius: token.borderRadiusLG,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightLG,
          lineHeight: unit(labelHeightLG),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
          fontSize: token.fontSizeLG,
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadius,
        },
      },

      [`&${componentCls}-sm`]: {
        borderRadius: token.borderRadiusSM,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightSM,
          lineHeight: unit(labelHeightSM),
          padding: `0 ${unit(token.segmentedPaddingHorizontalSM)}`,
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadiusXS,
        },
      },

      // disabled styles
      ...getItemDisabledStyle(`&-disabled ${componentCls}-item`, token),
      ...getItemDisabledStyle(`${componentCls}-item-disabled`, token),

      // transition effect when `appear-active`
      [`${componentCls}-thumb-motion-appear-active`]: {
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        willChange: 'transform, width',
      },

      [`&${componentCls}-shape-round`]: {
        borderRadius: 9999,
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: 9999,
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Segmented'> = (token) => {
  const {
    colorTextLabel,
    colorText,
    colorFillSecondary,
    colorBgElevated,
    colorFill,
    lineWidthBold,
    colorBgLayout,
  } = token;
  return {
    trackPadding: lineWidthBold,
    trackBg: colorBgLayout,
    itemColor: colorTextLabel,
    itemHoverColor: colorText,
    itemHoverBg: colorFillSecondary,
    itemSelectedBg: colorBgElevated,
    itemActiveBg: colorFill,
    itemSelectedColor: colorText,
  };
};

export default genStyleHooks(
  'Segmented',
  (token) => {
    const { lineWidth, calc } = token;
    const segmentedToken = mergeToken<SegmentedToken>(token, {
      segmentedPaddingHorizontal: calc(token.controlPaddingHorizontal).sub(lineWidth).equal(),
      segmentedPaddingHorizontalSM: calc(token.controlPaddingHorizontalSM).sub(lineWidth).equal(),
    });
    return [genSegmentedStyle(segmentedToken)];
  },
  prepareComponentToken,
);
