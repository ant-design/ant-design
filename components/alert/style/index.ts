import type { CSSProperties } from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

export interface ComponentToken {
  // Component token here
  /**
   * @desc 默认内间距
   * @descEN Default padding
   */
  defaultPadding: CSSProperties['padding'];
  /**
   * @desc 带有描述的内间距
   * @descEN Padding with description
   */
  withDescriptionPadding: CSSProperties['padding'];
  /**
   * @desc 带有描述时的图标尺寸
   * @descEN Icon size with description
   */
  withDescriptionIconSize: number;
}

type AlertToken = FullToken<'Alert'> & {
  // Custom token here
};

const genAlertTypeStyle = (
  bgColor: string,
  borderColor: string,
  iconColor: string,
  token: AlertToken,
  alertCls: string,
): CSSObject => ({
  backgroundColor: bgColor,
  border: `${unit(token.lineWidth)} ${token.lineType} ${borderColor}`,
  [`${alertCls}-icon`]: {
    color: iconColor,
  },
});

export const genBaseStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const {
    componentCls,
    motionDurationSlow: duration,
    marginXS,
    marginSM,
    fontSize,
    fontSizeLG,
    lineHeight,
    borderRadiusLG: borderRadius,
    motionEaseInOutCirc,
    withDescriptionIconSize,
    colorText,
    colorTextHeading,
    withDescriptionPadding,
    defaultPadding,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: unit(defaultPadding ?? 0),
      wordWrap: 'break-word',
      borderRadius: unit(borderRadius),

      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-content`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: unit(marginXS),
        lineHeight: 0,
      },

      [`&-description`]: {
        display: 'none',
        fontSize: unit(fontSize),
        lineHeight,
      },

      '&-message': {
        color: colorTextHeading,
      },

      [`&${componentCls}-motion-leave`]: {
        overflow: 'hidden',
        opacity: 1,
        transition: `max-height ${duration} ${motionEaseInOutCirc}, opacity ${duration} ${motionEaseInOutCirc},
        padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc},
        margin-bottom ${duration} ${motionEaseInOutCirc}`,
      },

      [`&${componentCls}-motion-leave-active`]: {
        maxHeight: 0,
        marginBottom: '0 !important',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      },
    },

    [`${componentCls}-with-description`]: {
      alignItems: 'flex-start',
      padding: unit(withDescriptionPadding ?? 0),
      [`${componentCls}-icon`]: {
        marginInlineEnd: unit(marginSM),
        fontSize: unit(withDescriptionIconSize),
        lineHeight: 0,
      },

      [`${componentCls}-message`]: {
        display: 'block',
        marginBottom: unit(marginXS),
        color: colorTextHeading,
        fontSize: unit(fontSizeLG),
      },

      [`${componentCls}-description`]: {
        display: 'block',
        color: colorText,
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
    colorSuccessBorder,
    colorSuccessBg,

    colorWarning,
    colorWarningBorder,
    colorWarningBg,

    colorError,
    colorErrorBorder,
    colorErrorBg,

    colorInfo,
    colorInfoBorder,
    colorInfoBg,
  } = token;

  return {
    [componentCls]: {
      '&-success': genAlertTypeStyle(
        colorSuccessBg,
        colorSuccessBorder,
        colorSuccess,
        token,
        componentCls,
      ),
      '&-info': genAlertTypeStyle(colorInfoBg, colorInfoBorder, colorInfo, token, componentCls),
      '&-warning': genAlertTypeStyle(
        colorWarningBg,
        colorWarningBorder,
        colorWarning,
        token,
        componentCls,
      ),
      '&-error': {
        ...genAlertTypeStyle(colorErrorBg, colorErrorBorder, colorError, token, componentCls),
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
    motionDurationMid,
    marginXS,
    fontSizeIcon,
    colorIcon,
    colorIconHover,
  } = token;

  return {
    [componentCls]: {
      [`&-action`]: {
        marginInlineStart: unit(marginXS),
      },

      [`${componentCls}-close-icon`]: {
        marginInlineStart: unit(marginXS),
        padding: 0,
        overflow: 'hidden',
        fontSize: unit(fontSizeIcon),
        lineHeight: unit(fontSizeIcon),
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',

        [`${iconCls}-close`]: {
          color: colorIcon,
          transition: `color ${motionDurationMid}`,
          '&:hover': {
            color: colorIconHover,
          },
        },
      },

      '&-close-text': {
        color: colorIcon,
        transition: `color ${motionDurationMid}`,
        '&:hover': {
          color: colorIconHover,
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Alert'> = (token) => {
  const paddingHorizontal = 12; // Fixed value here.
  return {
    withDescriptionIconSize: token.fontSizeHeading3,
    defaultPadding: `${token.paddingContentVerticalSM}px ${paddingHorizontal}px`,
    withDescriptionPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
  };
};

export default genComponentStyleHook<'Alert'>(
  'Alert',
  (token) => [genBaseStyle(token), genTypeStyle(token), genActionStyle(token)],
  prepareComponentToken,
);
