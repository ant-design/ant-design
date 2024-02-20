import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes, unit } from '@ant-design/cssinjs';

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
export const Percent = '--progress-percent';

interface ProgressToken extends FullToken<'Progress'> {
  progressStepMinWidth: number | string;
  progressStepMarginInlineEnd: number | string;
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

const genBaseStyle: GenerateStyle<ProgressToken> = (token) => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      ...resetComponent(token),

      display: 'inline-block',

      '&-rtl': {
        direction: 'rtl',
      },

      '&-line': {
        position: 'relative',
        width: '100%',
        fontSize: token.fontSize,
      },

      [`${progressCls}-outer`]: {
        display: 'inline-block',
        width: '100%',
      },

      [`&${progressCls}-show-info`]: {
        [`${progressCls}-outer`]: {
          marginInlineEnd: `calc(-2em - ${unit(token.marginXS)})`,
          paddingInlineEnd: `calc(2em + ${unit(token.paddingXS)})`,
        },
      },

      [`${progressCls}-inner`]: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        verticalAlign: 'middle',
        backgroundColor: token.remainingColor,
        borderRadius: token.lineBorderRadius,
      },

      [`${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.defaultColor,
        },
      },

      [`${progressCls}-success-bg, ${progressCls}-bg`]: {
        position: 'relative',
        background: token.defaultColor,
        borderRadius: token.lineBorderRadius,
        transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
      },

      [`${progressCls}-bg`]: {
        overflow: 'hidden',

        '&::after': {
          content: '""',
          background: {
            _multi_value_: true,
            value: ['inherit', `var(${LineStrokeColorVar})`],
          },
          height: '100%',
          width: `calc(1 / var(${Percent}) * 100%)`,
          display: 'block',
        },
      },

      [`${progressCls}-success-bg`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        backgroundColor: token.colorSuccess,
      },

      [`${progressCls}-text`]: {
        display: 'inline-block',
        width: '2em',
        marginInlineStart: token.marginXS,
        color: token.colorText,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textAlign: 'start',
        verticalAlign: 'middle',
        wordBreak: 'normal',
        [iconPrefixCls]: {
          fontSize: token.fontSize,
        },
      },

      [`&${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          position: 'absolute',
          inset: 0,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.lineBorderRadius,
          opacity: 0,
          animationName: genAntProgressActive(),
          animationDuration: token.progressActiveMotionDuration,
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: 'infinite',
          content: '""',
        },
      },

      [`&${progressCls}-rtl${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          animationName: genAntProgressActive(true),
        },
      },

      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorError,
        },
        [`${progressCls}-text`]: {
          color: token.colorError,
        },
      },

      [`&${progressCls}-status-exception ${progressCls}-inner:not(${progressCls}-circle-gradient)`]:
        {
          [`${progressCls}-circle-path`]: {
            stroke: token.colorError,
          },
        },

      [`&${progressCls}-status-success`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorSuccess,
        },
        [`${progressCls}-text`]: {
          color: token.colorSuccess,
        },
      },

      [`&${progressCls}-status-success ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorSuccess,
        },
      },
    },
  };
};

const genCircleStyle: GenerateStyle<ProgressToken> = (token) => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-circle-trail`]: {
        stroke: token.remainingColor,
      },

      [`&${progressCls}-circle ${progressCls}-inner`]: {
        position: 'relative',
        lineHeight: 1,
        backgroundColor: 'transparent',
      },

      [`&${progressCls}-circle ${progressCls}-text`]: {
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

      [`${progressCls}-circle&-status-exception`]: {
        [`${progressCls}-text`]: {
          color: token.colorError,
        },
      },

      [`${progressCls}-circle&-status-success`]: {
        [`${progressCls}-text`]: {
          color: token.colorSuccess,
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

const genStepStyle: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-steps`]: {
        display: 'inline-block',
        '&-outer': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        '&-item': {
          flexShrink: 0,
          minWidth: token.progressStepMinWidth,
          marginInlineEnd: token.progressStepMarginInlineEnd,
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

const genSmallLine: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-text ${iconPrefixCls}`]:
        {
          fontSize: token.fontSizeSM,
        },
    },
  };
};

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
      genCircleStyle(progressToken),
      genStepStyle(progressToken),
      genSmallLine(progressToken),
    ];
  },
  prepareComponentToken,
);
