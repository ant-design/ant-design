// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import { resetComponent, GenerateStyle, FullToken, genComponentStyleHook } from '../../_util/theme';

// FIXME: missing token
type AlertToken = FullToken<'Alert'> & {
  alertMessageColor: string;
  alertCloseColor: string;
  alertCloseHoverColor: string;
  alertWithDescriptionIconSize: number;
  alertWithDescriptionPaddingVertical: number;
  alertWithDescriptionNoIconPaddingVertical: number;
};

const genAlertTypeStyle = (
  bgColor: string,
  borderColor: string,
  iconColor: string,
  token: AlertToken,
  alertCls: string,
): CSSObject => ({
  backgroundColor: bgColor,
  border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColor}`,
  [`${alertCls}-icon`]: {
    color: iconColor,
  },
});

export const genBaseStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    componentCls,
    motionDurationSlow: duration,
    marginXS,
    fontSize,
    fontSizeLG,
    controlRadius: borderRadius,
    motionEaseInOutCirc,
    alertMessageColor,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
    alertWithDescriptionNoIconPaddingVertical,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '8px 15px',
      wordWrap: 'break-word',
      borderRadius,

      '&&-rtl': {
        direction: 'rtl',
      },

      [`${componentCls}-content`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: marginXS,
      },

      [`&-description`]: {
        display: 'none',
        fontSize,
        lineHeight: `${fontSize + 8}px`,
      },

      '&-message': {
        color: alertMessageColor,
      },

      '&&-motion-leave': {
        overflow: 'hidden',
        opacity: 1,
        transition: `max-height ${duration} ${motionEaseInOutCirc}, opacity ${duration} ${motionEaseInOutCirc},
        padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc},
        margin-bottom ${duration} ${motionEaseInOutCirc}`,
      },

      '&&-motion-leave-active': {
        maxHeight: 0,
        marginBottom: '0 !important',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      },
    },

    [`${componentCls}-with-description`]: {
      alignItems: 'flex-start',
      paddingInlineStart: alertWithDescriptionIconSize,
      paddingInlineEnd: alertWithDescriptionPaddingVertical,
      paddingBlock: alertWithDescriptionPaddingVertical,

      [`&${componentCls}-no-icon`]: {
        padding: `${alertWithDescriptionNoIconPaddingVertical}px 15px`,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: alertWithDescriptionPaddingVertical,
        fontSize: alertWithDescriptionIconSize,
      },

      [`${componentCls}-message`]: {
        display: 'block',
        marginBottom: '4px',
        color: alertMessageColor,
        fontSize: fontSizeLG,
      },

      [`${componentCls}-description`]: {
        display: 'block',
      },
    },

    [`${componentCls}-banner`]: {
      marginBottom: 0,
      border: '0 !important',
      borderRadius: 0,
    },
  };
};

export const genTypeStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    componentCls,

    colorSuccess,
    colorSuccessSecondary,
    colorBgSuccess,

    colorWarning,
    colorWarningSecondary,
    colorBgWarning,

    colorError,
    colorErrorSecondary,
    colorBgError,

    colorInfo,
    colorInfoSecondary,
    colorBgInfo,
  } = token;

  return {
    [componentCls]: {
      '&-success': genAlertTypeStyle(
        colorBgSuccess,
        colorSuccessSecondary,
        colorSuccess,
        token,
        componentCls,
      ),
      '&-info': genAlertTypeStyle(colorBgInfo, colorInfoSecondary, colorInfo, token, componentCls),
      '&-warning': genAlertTypeStyle(
        colorBgWarning,
        colorWarningSecondary,
        colorWarning,
        token,
        componentCls,
      ),
      '&-error': {
        ...genAlertTypeStyle(colorBgError, colorErrorSecondary, colorError, token, componentCls),
        [`${componentCls}-description > pre`]: {
          margin: 0,
          padding: 0,
        },
      },
    },
  };
};

export const genActionStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    componentCls,
    iconCls,
    motionDurationSlow: duration,
    marginXS,
    fontSizeIcon,
    alertCloseColor,
    alertCloseHoverColor,
  } = token;

  return {
    [componentCls]: {
      [`&-action`]: {
        marginInlineStart: marginXS,
      },

      [`${componentCls}-close-icon`]: {
        marginInlineStart: marginXS,
        padding: 0,
        overflow: 'hidden',
        fontSize: fontSizeIcon,
        lineHeight: `${fontSizeIcon}px`,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',

        [`${iconCls}-close`]: {
          color: alertCloseColor,
          transition: `color ${duration}`,
          '&:hover': {
            color: alertCloseHoverColor,
          },
        },
      },

      '&-close-text': {
        color: alertCloseColor,
        transition: `color ${duration}`,
        '&:hover': {
          color: alertCloseHoverColor,
        },
      },
    },
  };
};

export const genAlertStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSInterpolation => [
  genBaseStyle(token),
  genTypeStyle(token),
  genActionStyle(token),
];

export default genComponentStyleHook('Alert', token => {
  const alertMessageColor = token.colorTextHeading;
  const alertCloseColor = token.colorAction;
  const alertCloseHoverColor = token.colorActionHover;
  // FIXME
  const alertWithDescriptionIconSize = 24;
  const alertWithDescriptionPaddingVertical = token.padding - 1;
  const alertWithDescriptionNoIconPaddingVertical = token.padding - 1;

  const alertToken: AlertToken = {
    ...token,
    alertMessageColor,
    alertCloseColor,
    alertCloseHoverColor,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
    alertWithDescriptionNoIconPaddingVertical,
  };

  return [genAlertStyle(alertToken)];
});

// export default function useStyle(
//   prefixCls: string,
//   iconPrefixCls: string,
// ): UseComponentStyleResult {
//   const [theme, token, hashId] = useToken();
//
//   const alertCls = `.${prefixCls}`;
//
//   const alertMessageColor = token.colorTextHeading;
//   const alertCloseColor = token.colorAction;
//   const alertCloseHoverColor = token.colorActionHover;
//   // FIXME
//   const alertWithDescriptionIconSize = 24;
//   const alertWithDescriptionPaddingVertical = token.padding - 1;
//   const alertWithDescriptionNoIconPaddingVertical = token.padding - 1;
//
//   const alertToken: AlertToken = {
//     ...token,
//     componentCls: alertCls,
//     alertMessageColor,
//     alertCloseColor,
//     alertCloseHoverColor,
//     alertWithDescriptionIconSize,
//     alertWithDescriptionPaddingVertical,
//     alertWithDescriptionNoIconPaddingVertical,
//   };
//
//   return [
//     useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
//       genAlertStyle(alertToken),
//     ]),
//     hashId,
//   ];
// }
