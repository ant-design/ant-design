// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';

export interface ComponentToken {
  remainingColor: string;
  defaultColor: string;
  stepsItemBg: string;
  infoTextColor: string;
}

interface ProgressToken extends FullToken<'Progress'> {
  radius: string;
  infoTextColor: string;
  circleTextFontSize: string;
  textFontSize: string;
}

const antProgressActive = new Keyframes('antProgressActive', {
  '0%': {
    transform: 'translateX(-100%) scaleX(0)',
    opacity: 0.1,
  },
  '20%': {
    transform: 'translateX(-100%) scaleX(0)',
    opacity: 0.5,
  },
  to: {
    transform: 'translateX(0) scaleX(1)',
    opacity: 0,
  },
});

const genBaseStyle: GenerateStyle<ProgressToken> = (token: ProgressToken) => {
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
        fontSize: token.fontSizeBase,
        marginInlineEnd: token.marginXS,
        marginBottom: token.marginXS,
      },

      [`${progressCls}-outer`]: {
        display: 'inline-block',
        width: '100%',
      },

      [`&${progressCls}-show-info`]: {
        [`${progressCls}-outer`]: {
          marginInlineEnd: `calc(-2em - ${token.marginXS}px)`,
          paddingInlineEnd: `calc(2em + ${token.paddingXS}px)`,
        },
      },

      [`${progressCls}-inner`]: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        verticalAlign: 'middle',
        backgroundColor: token.remainingColor,
        borderRadius: token.radius,
      },

      [`${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.blue,
        },
      },

      [`&${progressCls}-success-bg, ${progressCls}-bg`]: {
        position: 'relative',
        backgroundColor: token.blue,
        borderRadius: token.radius,
        transition: `all ${token.motionDurationSlow} cubic-bezier(0.08, 0.82, 0.17, 1) 0s`, // FIXME: hard code in v4
      },

      [`${progressCls}-success-bg`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        backgroundColor: token.colorSuccess,
      },

      [`${progressCls}-text`]: {
        display: 'inline-block',
        width: '2em', // FIXME: hardcode in v4
        marginInlineStart: token.marginXS, // FIXME: hard code in v4
        color: token.infoTextColor,
        fontSize: token.textFontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textAlign: 'start',
        verticalAlign: 'middle',
        wordBreak: 'normal',
        [iconPrefixCls]: {
          fontSize: token.fontSizeBase,
        },
      },

      [`&${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          position: 'absolute',
          inset: 0,
          background: token.colorBgComponent,
          borderRadius: 10, // FIXME: hard code in v4
          opacity: 0,
          animationName: antProgressActive,
          animationDuration: '2.4s', // FIXME: hard code in v4
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: 'infinite',
          content: '""',
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

const genCircleStyle: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      '&-circle': {
        marginInlineEnd: token.marginXS,
        marginBottom: token.marginXS,
      },

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
        insetInlineStart: '50%',
        width: '100%',
        margin: 0,
        padding: 0,
        color: token.colorText,
        fontSize: token.circleTextFontSize,
        lineHeight: 1,
        whiteSpace: 'normal',
        textAlign: 'center',
        transform: `translate(-50%, -50%)`,

        [iconPrefixCls]: {
          fontSize: `${14 / 12}em`, // FIXME: hard code in v4
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
          minWidth: 2, // FIXME: hardcode in v4
          marginInlineEnd: 2, // FIXME: hardcode in v4
          background: token.stepsItemBg,
          transition: `all ${token.motionDurationSlow}`,

          '&-active': {
            background: token.blue,
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

export default genComponentStyleHook(
  'Progress',
  token => {
    const progressToken = mergeToken<ProgressToken>(token, {
      radius: '100px',
      circleTextFontSize: '1em', // FIXME: hard code in v4
      textFontSize: '1em', // FIXME: hard code in v4
    });
    return [
      genBaseStyle(progressToken),
      genCircleStyle(progressToken),
      genStepStyle(progressToken),
      genSmallLine(progressToken),
    ];
  },
  token => ({
    defaultColor: token.blue,
    remainingColor: 'rgba(0, 0, 0, 0.04)',
    stepsItemBg: '#f3f3f3',
    infoTextColor: '#000000d9',
  }),
);
