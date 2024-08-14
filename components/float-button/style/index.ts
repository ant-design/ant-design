import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes, unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import { initFadeMotion } from '../../style/motion/fade';
import { initMotion } from '../../style/motion/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import getOffset from '../util';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * Offset of the badge dot in a circular button
   * @internal
   */
  dotOffsetInCircle: number;
  /**
   * Offset of the badge dot in a square button
   * @internal
   */
  dotOffsetInSquare: number;
}

/**
 * @desc FloatButton 组件的 Token
 * @descEN Token for FloatButton component
 */
type FloatButtonToken = FullToken<'FloatButton'> & {
  /**
   * @desc FloatButton 颜色
   * @descEN Color of FloatButton
   */
  floatButtonColor: string;
  /**
   * @desc FloatButton 背景颜色
   * @descEN Background color of FloatButton
   */
  floatButtonBackgroundColor: string;
  /**
   * @desc FloatButton 悬停背景颜色
   * @descEN Hover background color of FloatButton
   */
  floatButtonHoverBackgroundColor: string;
  /**
   * @desc FloatButton 字体大小
   * @descEN Font size of FloatButton
   */
  floatButtonFontSize: number;
  /**
   * @desc FloatButton 尺寸
   * @descEN Size of FloatButton
   */
  floatButtonSize: number;
  /**
   * @desc FloatButton 图标尺寸
   * @descEN Icon size of FloatButton
   */
  floatButtonIconSize: number | string;
  /**
   * @desc FloatButton 主体尺寸
   * @descEN Body size of FloatButton
   */
  floatButtonBodySize: number | string;
  /**
   * @desc FloatButton 主体内间距
   * @descEN Body padding of FloatButton
   */
  floatButtonBodyPadding: number;
  /**
   * @desc 徽标偏移量
   * @descEN Offset of badge
   */
  badgeOffset: number | string;

  // Position
  /**
   * @desc FloatButton 底部内边距
   * @descEN Bottom inset of FloatButton
   */
  floatButtonInsetBlockEnd: number;
  /**
   * @desc FloatButton 右侧内边距
   * @descEN Right inset of FloatButton
   */
  floatButtonInsetInlineEnd: number;
};

const initFloatButtonGroupMotion = (token: FloatButtonToken) => {
  const { componentCls, floatButtonSize, motionDurationSlow, motionEaseInOutCirc, calc } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const top = {
    moveOutKeyframes: new Keyframes('antFloatButtonMoveTopOut', {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
      '100%': {
        transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
    }),
    moveInKeyframes: new Keyframes('antFloatButtonMoveTopIn', {
      '0%': {
        transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
      '100%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
    }),
  };
  const bottom = {
    moveOutKeyframes: new Keyframes('antFloatButtonMoveBottomOut', {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
      '100%': {
        transform: `translate3d(0, ${calc(floatButtonSize).mul(-1).equal()}, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
    }),
    moveInKeyframes: new Keyframes('antFloatButtonMoveBottomIn', {
      '0%': {
        transform: `translate3d(0, ${calc(floatButtonSize).mul(-1).equal()}, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
      '100%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
    }),
  };
  const left = {
    moveOutKeyframes: new Keyframes('antFloatButtonMoveLeftOut', {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
      '100%': {
        transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
    }),
    moveInKeyframes: new Keyframes('antFloatButtonMoveLeftIn', {
      '0%': {
        transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
      '100%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
    }),
  };
  const right = {
    moveOutKeyframes: new Keyframes('antFloatButtonMoveRightOut', {
      '0%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
      '100%': {
        transform: `translate3d(${calc(floatButtonSize).mul(-1).equal()}, 0, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
    }),
    moveInKeyframes: new Keyframes('antFloatButtonMoveRightIn', {
      '0%': {
        transform: `translate3d(${calc(floatButtonSize).mul(-1).equal()}, 0, 0)`,
        transformOrigin: '0 0',
        opacity: 0,
      },
      '100%': {
        transform: 'translate3d(0, 0, 0)',
        transformOrigin: '0 0',
        opacity: 1,
      },
    }),
  };
  return [
    {
      [`${groupPrefixCls}-wrap`]: {
        '&-top': initMotion(
          `${groupPrefixCls}-wrap`,
          top.moveInKeyframes,
          top.moveOutKeyframes,
          motionDurationSlow,
          true,
        ),
        '&-bottom': initMotion(
          `${groupPrefixCls}-wrap`,
          bottom.moveInKeyframes,
          bottom.moveOutKeyframes,
          motionDurationSlow,
          true,
        ),
        '&-left': initMotion(
          `${groupPrefixCls}-wrap`,
          left.moveInKeyframes,
          left.moveOutKeyframes,
          motionDurationSlow,
          true,
        ),
        '&-right': initMotion(
          `${groupPrefixCls}-wrap`,
          right.moveInKeyframes,
          right.moveOutKeyframes,
          motionDurationSlow,
          true,
        ),
      },
    },
    {
      [`${groupPrefixCls}-wrap`]: {
        [`
          &${groupPrefixCls}-wrap-enter,
          &${groupPrefixCls}-wrap-appear
        `]: {
          opacity: 0,
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`&${groupPrefixCls}-wrap-leave`]: {
          animationTimingFunction: motionEaseInOutCirc,
        },
      },
    },
  ];
};

// ============================== Group ==============================
const floatButtonGroupStyle: GenerateStyle<FloatButtonToken, CSSObject> = (token) => {
  const {
    antCls,
    componentCls,
    floatButtonSize,
    margin,
    borderRadiusLG,
    borderRadiusSM,
    badgeOffset,
    floatButtonBodyPadding,
    zIndexPopupBase,
    calc,
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      zIndex: zIndexPopupBase,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      position: 'fixed',
      height: 'auto',
      boxShadow: 'none',
      minWidth: floatButtonSize,
      minHeight: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      bottom: token.floatButtonInsetBlockEnd,
      borderRadius: borderRadiusLG,
      '&-wrap': {
        zIndex: -1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        '&-top': {
          flexDirection: 'column',
          bottom: calc(floatButtonSize).add(margin).equal(),
        },
        '&-bottom': {
          flexDirection: 'column',
          top: calc(floatButtonSize).add(margin).equal(),
        },
        '&-right': {
          flexDirection: 'row',
          insetInlineStart: calc(floatButtonSize).add(margin).equal(),
        },
        '&-left': {
          flexDirection: 'row',
          insetInlineEnd: calc(floatButtonSize).add(margin).equal(),
        },
      },
      [`&${groupPrefixCls}-rtl`]: {
        direction: 'rtl',
      },
      [componentCls]: {
        position: 'static',
      },
      '&-circle': {
        gap: margin,
        [`${groupPrefixCls}-wrap`]: {
          gap: margin,
        },
      },
      '&-square': {
        [`${componentCls}-square`]: {
          borderRadius: 0,
          '&:first-child': {
            borderStartStartRadius: borderRadiusLG,
            borderStartEndRadius: borderRadiusLG,
          },
          '&:last-child': {
            borderEndStartRadius: borderRadiusLG,
            borderEndEndRadius: borderRadiusLG,
          },
          '&:not(:last-child)': {
            borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          },
        },
        [`${groupPrefixCls}-trigger`]: {
          borderRadius: borderRadiusLG,
        },
        [`${groupPrefixCls}-wrap`]: {
          borderRadius: borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          '&-top, &-bottom': {
            [`${componentCls}-square`]: {
              '&:first-child': {
                borderStartStartRadius: borderRadiusLG,
                borderStartEndRadius: borderRadiusLG,
              },
              '&:last-child': {
                borderEndStartRadius: borderRadiusLG,
                borderEndEndRadius: borderRadiusLG,
              },
              '&:not(:last-child)': {
                borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
              },
            },
          },
          '&-left, &-right': {
            [`${componentCls}-square`]: {
              '&:first-child': {
                borderStartStartRadius: borderRadiusLG,
                borderEndStartRadius: borderRadiusLG,
              },
              '&:last-child': {
                borderStartEndRadius: borderRadiusLG,
                borderEndEndRadius: borderRadiusLG,
              },
              '&:not(:last-child)': {
                borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
              },
            },
          },
          [`${componentCls}-square`]: {
            boxShadow: 'none',
            borderRadius: 0,
            padding: floatButtonBodyPadding,
            [`${antCls}-badge`]: {
              [`${antCls}-badge-count`]: {
                top: calc(calc(floatButtonBodyPadding).add(badgeOffset)).mul(-1).equal(),
                insetInlineEnd: calc(calc(floatButtonBodyPadding).add(badgeOffset)).mul(-1).equal(),
              },
            },
            [`${componentCls}-body`]: {
              width: token.floatButtonBodySize,
              height: token.floatButtonBodySize,
            },
          },
        },
      },
      '&-circle-shadow': {
        boxShadow: 'none',
      },
      '&-square-shadow': {
        boxShadow: token.boxShadowSecondary,
        [`${componentCls}-square`]: {
          boxShadow: 'none',
          padding: floatButtonBodyPadding,
          [`${componentCls}-body`]: {
            width: token.floatButtonBodySize,
            height: token.floatButtonBodySize,
            borderRadius: borderRadiusSM,
          },
        },
      },
    },
  };
};

// ============================== Shared ==============================
const sharedFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = (token) => {
  const {
    antCls,
    componentCls,
    floatButtonBodyPadding,
    floatButtonIconSize,
    floatButtonSize,
    borderRadiusLG,
    badgeOffset,
    dotOffsetInSquare,
    dotOffsetInCircle,
    zIndexPopupBase,
    calc,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      border: 'none',
      position: 'fixed',
      cursor: 'pointer',
      zIndex: zIndexPopupBase,
      // Do not remove the 'display: block' here.
      // Deleting it will cause marginBottom to become ineffective.
      // Ref: https://github.com/ant-design/ant-design/issues/44700
      display: 'block',
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      bottom: token.floatButtonInsetBlockEnd,
      boxShadow: token.boxShadowSecondary,
      // Pure Panel
      '&-pure': {
        position: 'relative',
        inset: 'auto',
      },
      '&:empty': {
        display: 'none',
      },
      [`${antCls}-badge`]: {
        width: '100%',
        height: '100%',
        [`${antCls}-badge-count`]: {
          transform: 'translate(0, 0)',
          transformOrigin: 'center',
          top: calc(badgeOffset).mul(-1).equal(),
          insetInlineEnd: calc(badgeOffset).mul(-1).equal(),
        },
      },
      [`${componentCls}-body`]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: `all ${token.motionDurationMid}`,
        [`${componentCls}-content`]: {
          overflow: 'hidden',
          textAlign: 'center',
          minHeight: floatButtonSize,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: `${unit(calc(floatButtonBodyPadding).div(2).equal())} ${unit(
            floatButtonBodyPadding,
          )}`,
          [`${componentCls}-icon`]: {
            textAlign: 'center',
            margin: 'auto',
            width: floatButtonIconSize,
            fontSize: floatButtonIconSize,
            lineHeight: 1,
          },
        },
      },
    },

    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: '50%',
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInCircle,
          insetInlineEnd: dotOffsetInCircle,
        },
      },
      [`${componentCls}-body`]: {
        borderRadius: '50%',
      },
    },
    [`${componentCls}-square`]: {
      height: 'auto',
      minHeight: floatButtonSize,
      borderRadius: borderRadiusLG,
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInSquare,
          insetInlineEnd: dotOffsetInSquare,
        },
      },
      [`${componentCls}-body`]: {
        height: 'auto',
        borderRadius: borderRadiusLG,
      },
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.floatButtonBackgroundColor,
      transition: `background-color ${token.motionDurationMid}`,
      [`${componentCls}-body`]: {
        backgroundColor: token.floatButtonBackgroundColor,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorFillContent,
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorText,
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: unit(token.fontSizeLG),
            color: token.colorText,
            fontSize: token.fontSizeSM,
          },
        },
      },
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorPrimary,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorPrimaryHover,
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorTextLightSolid,
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: unit(token.fontSizeLG),
            color: token.colorTextLightSolid,
            fontSize: token.fontSizeSM,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'FloatButton'> = (token) => ({
  dotOffsetInCircle: getOffset(token.controlHeightLG / 2),
  dotOffsetInSquare: getOffset(token.borderRadiusLG),
});

export default genStyleHooks(
  'FloatButton',
  (token) => {
    const {
      colorTextLightSolid,
      colorBgElevated,
      controlHeightLG,
      marginXXL,
      marginLG,
      fontSize,
      fontSizeIcon,
      controlItemBgHover,
      paddingXXS,
      calc,
    } = token;

    const floatButtonToken = mergeToken<FloatButtonToken>(token, {
      floatButtonBackgroundColor: colorBgElevated,
      floatButtonColor: colorTextLightSolid,
      floatButtonHoverBackgroundColor: controlItemBgHover,
      floatButtonFontSize: fontSize,
      floatButtonIconSize: calc(fontSizeIcon).mul(1.5).equal(),
      floatButtonSize: controlHeightLG,
      floatButtonInsetBlockEnd: marginXXL,
      floatButtonInsetInlineEnd: marginLG,
      floatButtonBodySize: calc(controlHeightLG).sub(calc(paddingXXS).mul(2)).equal(),
      // 这里的 paddingXXS 是简写，完整逻辑是 (controlHeightLG - (controlHeightLG - paddingXXS * 2)) / 2,
      floatButtonBodyPadding: paddingXXS,
      badgeOffset: calc(paddingXXS).mul(1.5).equal(),
    });

    return [
      floatButtonGroupStyle(floatButtonToken),
      sharedFloatButtonStyle(floatButtonToken),
      initFadeMotion(token),
      initFloatButtonGroupMotion(floatButtonToken),
    ];
  },
  prepareComponentToken,
);
