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
  alertWithDescriptionPaddingVertical: string,
  alertWithDescriptionNoIconPaddingVertical: string,
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
      borderRadius: `${borderRadius}px`,

      '&-content': {
        flex: 1,
        minWidth: 0,
      },

      '&-icon': {
        marginRight: `${marginXS}px`,
      },

      '&-description': {
        display: 'none',
        fontSize,
        lineHeight: `${fontSize + 8}px`,
      },

      '&-with-description': {
        alignItems: 'flex-start',
        padding: alertWithDescriptionPadding,
      },

      '&-with-description&-no-icon': {
        padding: `${alertWithDescriptionNoIconPaddingVertical} 15px`,
      },

      '&-with-description &-icon': {
        marginRight: alertWithDescriptionPaddingVertical,
        fontSize: `${alertWithDescriptionIconSize}px`,
      },

      '&-with-description &-message': {
        display: 'block',
        marginTop: '4px',
        color: alertMessageColor,
        fontSize: fontSizeLG,
      },

      '&-message': {
        color: alertMessageColor,
      },

      '&-with-description &-description': {
        display: 'block',
      },

      '&&-motion-leave': {
        overflow: 'hidden',
        opacity: 1,
        transition: `max-height 0.3s ${easeInOutCirc}, opacity 0.3s ${easeInOutCirc},
        padding-top 0.3s ${easeInOutCirc}, padding-bottom 0.3s ${easeInOutCirc},
        margin-bottom 0.3s ${easeInOutCirc}`,
      },

      '&&-motion-leave-active': {
        maxHeight: 0,
        marginBottom: '0 !important',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      },

      '&-banner': {
        marginBottom: 0,
        border: 0,
        borderRadius: 0,
      },
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
    marginXS,
    fontSizeSM,
    alertCloseColor,
    alertCloseHoverColor,
  } = token;
  return {
    [alertCls]: {
      '&-action': {
        marginLeft: marginXS,
      },

      '&-close-icon': {
        marginLeft: marginXS,
        padding: 0,
        overflow: 'hidden',
        fontSize: `${fontSizeSM}px`,
        lineHeight: `${fontSizeSM}px`,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',

        [`.${iconPrefixCls}-close`]: {
          color: alertCloseColor,
          transition: 'color 0.3s',
          '&:hover': {
            color: alertCloseHoverColor,
          },
        },
      },

      '&-close-text': {
        color: alertCloseColor,
        transition: 'color 0.3s',
        '&:hover': {
          color: alertCloseHoverColor,
        },
      },
    },
  };
};

export const genRTLStyle = (alertCls: string, token: AlertToken): CSSObject => {
  const {
    marginXS,
    alertWithDescriptionIconSize,
    alertWithDescriptionPaddingVertical,
  } = token;

  return {
    [alertCls]: {
      '&&-rtl': {
        direction: 'rtl',
      },

      '&-icon': {
        [`${alertCls}-rtl &`]: {
          marginRight: 'auto',
          marginLeft: marginXS,
        },
      },

      '&-action': {
        [`${alertCls}-rtl &`]: {
          marginRight: marginXS,
          marginLeft: 'auto',
        },
      },

      '&-close-icon': {
        [`${alertCls}-rtl &`]: {
          marginRight: marginXS,
          marginLeft: 'auto',
        },
      },

      '&-with-description': {
        [`${alertCls}-rtl&`]: {
          paddingRight: alertWithDescriptionIconSize,
          paddingLeft: alertWithDescriptionPaddingVertical,
        },

        [`${alertCls}-icon`]: {
          [`${alertCls}-rtl&`]: {
            marginRight: 'auto',
            marginLeft: alertWithDescriptionPaddingVertical,
          },
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
  const alertWithDescriptionIconSize = 24;
  const alertWithDescriptionPaddingVertical = `${token.padding - 1}px`;
  const alertWithDescriptionNoIconPaddingVertical = `${token.padding - 1}px`;
  const alertWithDescriptionPadding = `${alertWithDescriptionPaddingVertical} 15px ${alertWithDescriptionNoIconPaddingVertical} ${alertWithDescriptionIconSize}px`;

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
