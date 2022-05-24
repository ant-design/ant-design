// deps-lint-skip-all
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';

export interface ComponentToken {}

type AlertToken = FullToken<'Alert'> & {
  alertIconSizeLG: number;
  alertPadding: number;
  alertPaddingLG: number;
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
    lineHeight,
    controlRadius: borderRadius,
    motionEaseInOutCirc,
    alertIconSizeLG,
    colorText,
    alertPadding,
    alertPaddingLG,
    marginXXS,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: `${alertPadding}px ${alertPaddingLG}px`,
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
        lineHeight,
      },

      '&-message': {
        color: colorText,
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
      paddingInline: alertPaddingLG,
      paddingBlock: alertPaddingLG,

      [`${componentCls}-icon`]: {
        marginInlineStart: alertPadding,
        marginInlineEnd: alertPaddingLG,
        fontSize: alertIconSizeLG,
      },

      [`${componentCls}-message`]: {
        display: 'block',
        marginBottom: marginXXS,
        color: colorText,
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
    colorAction,
    colorActionHover,
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
          color: colorAction,
          transition: `color ${duration}`,
          '&:hover': {
            color: colorActionHover,
          },
        },
      },

      '&-close-text': {
        color: colorAction,
        transition: `color ${duration}`,
        '&:hover': {
          color: colorActionHover,
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
  const { fontSizeHeading3, paddingXS, padding } = token;

  const alertToken = mergeToken<AlertToken>(token, {
    alertIconSizeLG: fontSizeHeading3,
    alertPadding: paddingXS,
    alertPaddingLG: padding,
  });

  return [genAlertStyle(alertToken)];
});
