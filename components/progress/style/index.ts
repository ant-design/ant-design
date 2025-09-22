import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 进度条默认颜色
   * @descEN Default color of progress bar
   */
  defaultColor: string;
  /**
   * @desc 进度条剩余部分颜色
   * @descEN Color of remaining part of progress bar
   */
  remainingColor: string;
  /**
   * @desc 圆形进度条文字颜色
   * @descEN Text color of circular progress bar
   */
  circleTextColor: string;
  /**
   * @desc 条状进度条圆角
   * @descEN Border radius of line progress bar
   */
  lineBorderRadius: number;
  /**
   * @desc 圆形进度条文本大小
   * @descEN Text size of circular progress bar
   */
  circleTextFontSize: string;
  /**
   * @desc 圆形进度条图标大小
   * @descEN Icon size of circular progress bar
   */
  circleIconFontSize: string;
}

export const LineStrokeColorVar = '--progress-line-stroke-color';

/**
 * @desc Progress 组件的 Token
 * @descEN Token for Progress component
 */
interface ProgressToken extends FullToken<'Progress'> {
  /**
   * @desc 进度步骤最小宽度
   * @descEN Minimum width of progress step
   */
  progressStepMinWidth: number | string;
  /**
   * @desc 进度步骤右间距
   * @descEN Right margin of progress step
   */
  progressStepMarginInlineEnd: number | string;
  /**
   * @desc 进度条动画持续时间
   * @descEN Duration of progress bar animation
   */
  progressActiveMotionDuration: string;
}

const genAntProgressActive = (isRtl?: boolean) => {
  const direction = isRtl ? '100%' : '-100%';
  return new Keyframes(`antProgress${isRtl ? 'RTL' : 'LTR'}Active`, {
    '0%': {
      transform: `translateX(${direction}) scaleX(0)`,
      opacity: 0.1,
    },
    '20%': {
      transform: `translateX(${direction}) scaleX(0)`,
      opacity: 0.5,
    },
    to: {
      transform: 'translateX(0) scaleX(1)',
      opacity: 0,
    },
  });
};

// ====================================================================
// ==                              Base                              ==
// ====================================================================
const genBaseStyle: GenerateStyle<ProgressToken> = (token) => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      ...resetComponent(token),

      display: 'inline-flex',

      '&-rtl': {
        direction: 'rtl',
      },

      [`${progressCls}-indicator`]: {
        color: token.colorText,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        wordBreak: 'normal',
        [iconPrefixCls]: {
          fontSize: token.fontSize,
        },
      },

      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-indicator`]: {
          color: token.colorError,
        },
      },

      [`&${progressCls}-status-success`]: {
        [`${progressCls}-indicator`]: {
          color: token.colorSuccess,
        },
      },
    },
  };
};

// ====================================================================
// ==                              Line                              ==
// ====================================================================
const genLineStyle: GenerateStyle<ProgressToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-line`]: {
      position: 'relative',
      width: '100%',
      fontSize: token.fontSize,

      [`${componentCls}-body`]: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        gap: token.marginXS,
      },

      [`${componentCls}-rail`]: {
        flex: 'auto',
        background: token.remainingColor,
        borderRadius: token.lineBorderRadius,
        position: 'relative',
        width: '100%',
      },

      [`&${componentCls}-status-active`]: {
        [`${componentCls}-track:after`]: {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: token.colorBgContainer,
          borderRadius: 'inherit',
          opacity: 0,
          animationName: genAntProgressActive(),
          animationDuration: token.progressActiveMotionDuration,
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: 'infinite',
        },
      },

      [`${componentCls}-track`]: {
        position: 'absolute',
        insetInlineStart: 0,
        insetBlock: 0,
        borderRadius: 'inherit',
        background: token.defaultColor,
        transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
        minWidth: 'max-content',
        display: 'flex',
        alignItems: 'center',

        '&-success': {
          background: token.colorSuccess,
        },
      },

      [`&${componentCls}-status-exception`]: {
        [`${componentCls}-track`]: {
          background: token.colorError,
        },
      },

      [`&${componentCls}-status-success`]: {
        [`${componentCls}-track`]: {
          background: token.colorSuccess,
        },
      },

      // >>>>> indicator
      // >>> Outer
      [`${componentCls}-indicator-outer`]: {
        [`&${componentCls}-indicator-start`]: {
          order: -1,
        },
      },

      [`${componentCls}-body-layout-bottom`]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: token.marginXXS,
      },

      // >>> Inner
      [`${componentCls}-indicator${componentCls}-indicator-inner`]: {
        color: token.colorWhite,
        paddingInline: token.paddingXXS,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

        [`&${componentCls}-indicator-end`]: {
          justifyContent: 'end',
        },

        [`&${componentCls}-indicator-start`]: {
          justifyContent: 'start',
        },

        [`&${componentCls}-indicator-bright`]: {
          color: 'rgba(0, 0, 0, 0.45)',
        },
      },
    },
  };
};

// ====================================================================
// ==                             Circle                             ==
// ====================================================================
const genCircleStyle: GenerateStyle<ProgressToken> = (token) => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [`${progressCls}-circle`]: {
      [`${progressCls}-circle-rail`]: {
        stroke: token.remainingColor,
      },

      [`${progressCls}-body:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.defaultColor,
        },
      },

      [`${progressCls}-body`]: {
        position: 'relative',
        lineHeight: 1,
        backgroundColor: 'transparent',
      },

      [`${progressCls}-indicator`]: {
        position: 'absolute',
        insetBlockStart: '50%',
        insetInlineStart: 0,
        width: '100%',
        margin: 0,
        padding: 0,
        color: token.circleTextColor,
        fontSize: token.circleTextFontSize,
        lineHeight: 1,
        whiteSpace: 'normal',
        textAlign: 'center',
        transform: 'translateY(-50%)',

        [iconPrefixCls]: {
          fontSize: token.circleIconFontSize,
        },
      },

      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-body:not(${progressCls}-circle-gradient)`]: {
          [`${progressCls}-circle-path`]: {
            stroke: token.colorError,
          },
        },
      },

      [`&${progressCls}-status-success`]: {
        [`${progressCls}-body:not(${progressCls}-circle-gradient)`]: {
          [`${progressCls}-circle-path`]: {
            stroke: token.colorSuccess,
          },
        },
      },
    },
    [`${progressCls}-inline-circle`]: {
      lineHeight: 1,
      [`${progressCls}-inner`]: {
        verticalAlign: 'bottom',
      },
    },
  };
};

// ====================================================================
// ==                              Step                              ==
// ====================================================================
const genStepStyle: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-steps`]: {
        display: 'inline-block',
        '&-body': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: token.progressStepMarginInlineEnd,

          [`${progressCls}-indicator`]: {
            marginInlineStart: token.marginXS,
          },
        },
        '&-item': {
          flexShrink: 0,
          minWidth: token.progressStepMinWidth,
          backgroundColor: token.remainingColor,
          transition: `all ${token.motionDurationSlow}`,

          '&-active': {
            backgroundColor: token.defaultColor,
          },
        },
      },
    },
  };
};

// ====================================================================
// ==                           Small Line                           ==
// ====================================================================
const genSmallLine: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-indicator ${iconPrefixCls}`]:
        {
          fontSize: token.fontSizeSM,
        },
    },
  };
};

// ====================================================================
// ==                             Export                             ==
// ====================================================================
export const prepareComponentToken: GetDefaultToken<'Progress'> = (token) => ({
  circleTextColor: token.colorText,
  defaultColor: token.colorInfo,
  remainingColor: token.colorFillSecondary,
  lineBorderRadius: 100, // magic for capsule shape, should be a very large number
  circleTextFontSize: '1em',
  circleIconFontSize: `${token.fontSize / token.fontSizeSM}em`,
});

export default genStyleHooks(
  'Progress',
  (token) => {
    const progressStepMarginInlineEnd = token.calc(token.marginXXS).div(2).equal();

    const progressToken = mergeToken<ProgressToken>(token, {
      progressStepMarginInlineEnd,
      progressStepMinWidth: progressStepMarginInlineEnd,
      progressActiveMotionDuration: '2.4s',
    });

    return [
      genBaseStyle(progressToken),
      genLineStyle(progressToken),
      genCircleStyle(progressToken),
      genStepStyle(progressToken),
      genSmallLine(progressToken),
    ];
  },
  prepareComponentToken,
);
