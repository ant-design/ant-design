import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

interface ProgressToken extends DerivativeToken {
  progressCls: string;
  iconPrefixCls: string;
  fontSizeBase: number;
  stepsItemBg: string;
  defaultColor: string;
  remainingColor: string;
  radius: string;
  infoTextColor: string;
  circleTextFontSize: string;
  textFontSize: string;
  duration: string;
}

const genBaseStyle: GenerateStyle<ProgressToken> = (
  token: ProgressToken,
  hashId: string,
): CSSObject => {
  const { progressCls, iconPrefixCls } = token;

  const antProgressActive = new Keyframes('antProgressActive', {
    '0%': {
      transform: 'translateX(-100%) scaleX(0)',
      opacity: 0.1, // FIXME: hard code in v4
    },
    '20%': {
      transform: 'translateX(-100%) scaleX(0)',
      opacity: 0.5, // FIXME: hard code in v4
    },
    to: {
      transform: 'translateX(0) scaleX(1)',
      opacity: 0, // FIXME: hard code in v4
    },
  });

  return {
    [progressCls]: {
      ...resetComponent(token),

      display: 'inline-block',

      '&-line': {
        position: 'relative',
        width: '100%',
        fontSize: token.fontSizeBase,
        marginInlineEnd: '8px', // FIXME: hard code in v4
        marginBottom: '8px', // FIXME: hard code in v4
      },

      [`${progressCls}-outer`]: {
        display: 'inline-block',
        width: '100%',
      },

      [`&${progressCls}-show-info`]: {
        [`${progressCls}-outer`]: {
          marginInlineEnd: 'calc(-2em - 8px)',
          paddingInlineEnd: 'calc(2em + 8px)',
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
          stroke: token.defaultColor,
        },
      },

      [`&${progressCls}-success-bg,${progressCls}-bg`]: {
        position: 'relative',
        backgroundColor: token.defaultColor,
        borderRadius: token.radius,
        transition: `all ${token.motionDurationSlow} cubic-bezier(0.08, 0.82, 0.17, 1) 0s`,
      },

      [`${progressCls}-success-bg`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: token.colorSuccess,
      },

      [`${progressCls}-text`]: {
        display: 'inline-block',
        width: '2em', // FIXME: hardcode in v4
        marginInlineStart: '8px', // FIXME: hard code in v4
        color: token.infoTextColor,
        fontSize: token.textFontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textAlign: 'left',
        verticalAlign: 'middle',
        wordBreak: 'normal',
        [`.${iconPrefixCls}`]: {
          fontSize: token.fontSizeBase,
        },
      },

      [`&${progressCls}-status-active`]: {
        // FIXME 不生成伪元素
        [`${progressCls}-bg::before`]: {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: '#fff',
          borderRadius: '10px', // FIXME: hard code in v4
          opacity: 0,
          animation: `${antProgressActive.getName(
            hashId,
          )} 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite`,
          content: ' ',
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
  const { progressCls, iconPrefixCls } = token;

  return {
    [progressCls]: {
      ['&-circle']: {
        marginInlineEnd: '8px', // FIXME: hard code in v4
        marginBottom: '8px', // FIXME: hard code in v4
      },
      [`${progressCls}-circle-trail`]: {
        stroke: token.remainingColor,
      },
      [`${progressCls}-circle-path`]: {
        animation: `ant-progress-appear ${token.duration}`,
      },
      [`&${progressCls}-circle ${progressCls}-inner`]: {
        position: 'relative',
        lineHeight: 1,
        backgroundColor: 'transparent',
      },

      [`&${progressCls}-circle ${progressCls}-text`]: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        margin: 0,
        padding: 0,
        color: token.colorText2,
        fontSize: token.circleTextFontSize,
        lineHeight: 1,
        whiteSpace: 'normal',
        textAlign: 'center',
        transform: `translate(-50%, -50%)`,

        [`.${iconPrefixCls}`]: {
          // fixme do not work 14em/12em
          fontSize: '1.17em',
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
  const { progressCls } = token;

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
          minWidth: '2px', // FIXME: hardcode in v4
          marginInlineEnd: '2px', // FIXME: hardcode in v4
          background: token.stepsItemBg,
          transition: `all ${token.duration}`,

          '&-active': {
            background: token.defaultColor,
          },
        },
      },
    },
  };
};

const genSmallLine: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { progressCls, iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-text .${iconPrefixCls}`]:
        {
          fontSize: token.fontSizeSM,
        },
    },
  };
};

export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const progressToken: ProgressToken = {
    ...token,
    progressCls: `.${prefixCls}`,
    iconPrefixCls: 'anticon',
    fontSizeBase: 14, // FIXME: hard code in v4
    stepsItemBg: '#f3f3f3',
    defaultColor: '#1890ff',
    remainingColor: 'rgba(0, 0, 0, 0.04)',
    radius: '100px', // FIXME: hard code in v4
    // FIXME used be fade(#000, 85%)
    infoTextColor: '#000000d9',
    circleTextFontSize: '1em', // FIXME: hard code in v4
    textFontSize: '1em', // FIXME: hard code in v4
    duration: '0.3s', // FIXME: hard code in v4
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(progressToken, hashId),
      genCircleStyle(progressToken, hashId),
      genStepStyle(progressToken, hashId),
      genSmallLine(progressToken, hashId),
    ]),
    hashId,
  ];
}
