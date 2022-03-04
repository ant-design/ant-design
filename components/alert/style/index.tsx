// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import { generate } from '@ant-design/colors';
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  UseComponentStyleResult,
} from '../../_util/theme';

// FIXME: missing token
type AlertToken = DerivativeToken & {
  alertMessageColor: string,
  alertCloseColor: string,
  alertCloseHoverColor: string,

  alertInfoBgColor: string,
  alertInfoIconColor: string,
  alertInfoBorderColor: string,

  alertSuccessBgColor: string,
  alertSuccessIconColor: string,
  alertSuccessBorderColor: string,

  alertWarningBgColor: string,
  alertWarningIconColor: string,
  alertWarningBorderColor: string,

  alertErrorBgColor: string,
  alertErrorIconColor: string,
  alertErrorBorderColor: string,

  alertWithDescriptionIconSize: number,
  alertWithDescriptionPadding: string,
  alertWithDescriptionPaddingVertical: number,
  alertWithDescriptionNoIconPaddingVertical: number,
}

const genAlertTypeStyle = (bgColor: string, borderColor: string, iconColor: string, token: AlertToken, alertCls: string): CSSObject => ({
  backgroundColor: bgColor,
  border: `${token.borderWidth}px ${token.borderStyle} ${borderColor}`,
  [`${alertCls}-icon`]: {
    color: iconColor,
  },
});

export const genBaseStyle = (alertCls: string, token: AlertToken): CSSObject => {
  const {
    duration,
    marginXS,
    fontSize,
    fontSizeLG,
    borderRadius,
    easeInOutCirc,
    alertMessageColor,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
    alertWithDescriptionNoIconPaddingVertical,
    alertWithDescriptionPadding,
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
        transition: `max-height ${duration} ${easeInOutCirc}, opacity ${duration} ${easeInOutCirc},
        padding-top ${duration} ${easeInOutCirc}, padding-bottom ${duration} ${easeInOutCirc},
        margin-bottom ${duration} ${easeInOutCirc}`,
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
      padding: alertWithDescriptionPadding,

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

export const genTypeStyle = (alertCls: string, token: AlertToken): CSSObject => {
  const {
    alertInfoBgColor,
    alertInfoIconColor,
    alertInfoBorderColor,

    alertSuccessBgColor,
    alertSuccessIconColor,
    alertSuccessBorderColor,

    alertWarningBgColor,
    alertWarningIconColor,
    alertWarningBorderColor,

    alertErrorBgColor,
    alertErrorIconColor,
    alertErrorBorderColor,
  } = token;

  return {
    [alertCls]: {
      '&-success': genAlertTypeStyle(alertSuccessBgColor, alertSuccessBorderColor, alertSuccessIconColor, token, alertCls),
      '&-info': genAlertTypeStyle(alertInfoBgColor, alertInfoBorderColor, alertInfoIconColor, token, alertCls),
      '&-warning': genAlertTypeStyle(alertWarningBgColor, alertWarningBorderColor, alertWarningIconColor, token, alertCls),
      '&-error': {
        ...genAlertTypeStyle(alertErrorBgColor, alertErrorBorderColor, alertErrorIconColor, token, alertCls),
        [`${alertCls}-description > pre`]: {
          margin: 0,
          padding: 0,
        },
      },
    },
  };
};

export const genActionStyle = (alertCls: string, iconPrefixCls: string, token: AlertToken): CSSObject => {
  const {
    duration,
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

export const genRTLStyle = (alertCls: string, token: AlertToken): CSSObject => {
  const {
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
  } = token;

  return {
    [alertCls]: {
      '&&-rtl': {
        direction: 'rtl',
      },

      '&-with-description': {
        [`${alertCls}-rtl&`]: {
          paddingRight: alertWithDescriptionIconSize,
          paddingLeft: alertWithDescriptionPaddingVertical,
        },
      },
    },
  };
};

export const genAlertStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const alertCls = `.${prefixCls}`;

  const alertMessageColor = token.headingColor;
  const alertCloseColor = token.textColorSecondary;
  const alertCloseHoverColor = token.iconColorHover;
  // FIXME
  const alertWithDescriptionIconSize = 24;
  const alertWithDescriptionPaddingVertical = token.padding - 1;
  const alertWithDescriptionNoIconPaddingVertical = token.padding - 1;
  const alertWithDescriptionPadding = `${alertWithDescriptionPaddingVertical}px 15px ${alertWithDescriptionNoIconPaddingVertical}px ${alertWithDescriptionIconSize}px`;

  // FIXME
  const infoColors = generate(token.infoColor);
  const alertInfoBgColor = infoColors[0];
  const alertInfoIconColor = token.infoColor;
  const alertInfoBorderColor = infoColors[2];

  const successColors = generate(token.successColor);
  const alertSuccessBgColor = successColors[0];
  const alertSuccessIconColor = token.successColor;
  const alertSuccessBorderColor = successColors[2];

  const warningColors = generate(token.warningColor);
  const alertWarningBgColor = warningColors[0];
  const alertWarningIconColor = token.warningColor;
  const alertWarningBorderColor = warningColors[2];

  const errorColors = generate(token.errorColor);
  const alertErrorBgColor = errorColors[0];
  const alertErrorIconColor = token.errorColor;
  const alertErrorBorderColor = errorColors[2];

  const alertToken = {
    ...token,
    alertInfoBgColor,
    alertInfoIconColor,
    alertInfoBorderColor,
    alertSuccessBgColor,
    alertSuccessIconColor,
    alertSuccessBorderColor,
    alertWarningBgColor,
    alertWarningIconColor,
    alertWarningBorderColor,
    alertErrorBgColor,
    alertErrorIconColor,
    alertErrorBorderColor,
    alertMessageColor,
    alertCloseColor,
    alertCloseHoverColor,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
    alertWithDescriptionNoIconPaddingVertical,
    alertWithDescriptionPadding,
  };

  return [
    genBaseStyle(alertCls, alertToken),
    genTypeStyle(alertCls, alertToken),
    genActionStyle(alertCls, iconPrefixCls, alertToken),
    genRTLStyle(alertCls, alertToken),
  ];
};

export default function useStyle(prefixCls: string, iconPrefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genAlertStyle(prefixCls, iconPrefixCls, token),
    ]),
    hashId,
  ];
}
