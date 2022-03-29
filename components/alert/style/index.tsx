// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';

// FIXME: missing token
type AlertToken = DerivativeToken & {
  alertCls: string;
  iconPrefixCls: string;

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
    alertCls,
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
    [alertCls]: {
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

      [`${alertCls}-content`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${alertCls}-icon`]: {
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

    [`${alertCls}-with-description`]: {
      alignItems: 'flex-start',
      paddingInlineStart: alertWithDescriptionIconSize,
      paddingInlineEnd: alertWithDescriptionPaddingVertical,
      paddingBlock: alertWithDescriptionPaddingVertical,

      [`&${alertCls}-no-icon`]: {
        padding: `${alertWithDescriptionNoIconPaddingVertical}px 15px`,
      },

      [`${alertCls}-icon`]: {
        marginInlineEnd: alertWithDescriptionPaddingVertical,
        fontSize: alertWithDescriptionIconSize,
      },

      [`${alertCls}-message`]: {
        display: 'block',
        marginBottom: '4px',
        color: alertMessageColor,
        fontSize: fontSizeLG,
      },

      [`${alertCls}-description`]: {
        display: 'block',
      },
    },

    [`${alertCls}-banner`]: {
      marginBottom: 0,
      border: '0 !important',
      borderRadius: 0,
    },
  };
};

export const genTypeStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    alertCls,

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
    [alertCls]: {
      '&-success': genAlertTypeStyle(
        colorBgSuccess,
        colorSuccessSecondary,
        colorSuccess,
        token,
        alertCls,
      ),
      '&-info': genAlertTypeStyle(colorBgInfo, colorInfoSecondary, colorInfo, token, alertCls),
      '&-warning': genAlertTypeStyle(
        colorBgWarning,
        colorWarningSecondary,
        colorWarning,
        token,
        alertCls,
      ),
      '&-error': {
        ...genAlertTypeStyle(colorBgError, colorErrorSecondary, colorError, token, alertCls),
        [`${alertCls}-description > pre`]: {
          margin: 0,
          padding: 0,
        },
      },
    },
  };
};

export const genActionStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    alertCls,
    iconPrefixCls,
    motionDurationSlow: duration,
    marginXS,
    fontSizeSM,
    alertCloseColor,
    alertCloseHoverColor,
  } = token;

  return {
    [alertCls]: {
      [`&-action`]: {
        marginInlineStart: marginXS,
      },

      [`${alertCls}-close-icon`]: {
        marginInlineStart: marginXS,
        padding: 0,
        overflow: 'hidden',
        fontSize: fontSizeSM,
        lineHeight: `${fontSizeSM}px`,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',

        [`.${iconPrefixCls}-close`]: {
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

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const alertCls = `.${prefixCls}`;

  const alertMessageColor = token.colorTextHeading;
  const alertCloseColor = token.colorAction;
  const alertCloseHoverColor = token.colorActionHover;
  // FIXME
  const alertWithDescriptionIconSize = 24;
  const alertWithDescriptionPaddingVertical = token.padding - 1;
  const alertWithDescriptionNoIconPaddingVertical = token.padding - 1;

  const alertToken: AlertToken = {
    ...token,
    alertCls,
    iconPrefixCls,
    alertMessageColor,
    alertCloseColor,
    alertCloseHoverColor,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
    alertWithDescriptionNoIconPaddingVertical,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genAlertStyle(alertToken),
    ]),
    hashId,
  ];
}
