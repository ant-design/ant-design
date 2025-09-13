import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

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
  background: bgColor,
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
      padding: defaultPadding,
      wordWrap: 'break-word',
      borderRadius,

      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-content`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: marginXS,
        lineHeight: 0,
      },

      '&-description': {
        display: 'none',
        fontSize,
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
      padding: withDescriptionPadding,
      [`${componentCls}-icon`]: {
        marginInlineEnd: marginSM,
        fontSize: withDescriptionIconSize,
        lineHeight: 0,
      },

      [`${componentCls}-message`]: {
        display: 'block',
        marginBottom: marginXS,
        color: colorTextHeading,
        fontSize: fontSizeLG,
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

    // 语义化图标类名样式
    [`${componentCls}-icon-success`]: {
      color: colorSuccess,
    },
    [`${componentCls}-icon-info`]: {
      color: colorInfo,
    },
    [`${componentCls}-icon-warning`]: {
      color: colorWarning,
    },
    [`${componentCls}-icon-error`]: {
      color: colorError,
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
      '&-action': {
        marginInlineStart: marginXS,
      },

      [`${componentCls}-close-icon`]: {
        marginInlineStart: marginXS,
        padding: 0,
        overflow: 'hidden',
        fontSize: fontSizeIcon,
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

export const genSemanticStyle: GenerateStyle<AlertToken> = (token: AlertToken): CSSObject => {
  const { componentCls } = token;

  return {
    // 状态相关的消息样式
    [`${componentCls}-message-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-message-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-message-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-message-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },

    // 状态相关的描述样式
    [`${componentCls}-description-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-description-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-description-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-description-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },

    // 状态相关的内容区域样式
    [`${componentCls}-content-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-content-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-content-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-content-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },

    // 状态相关的操作区域样式
    [`${componentCls}-action-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-action-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-action-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-action-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },
  };
};

export default genStyleHooks(
  'Alert',
  (token) => [
    genBaseStyle(token),
    genTypeStyle(token),
    genActionStyle(token),
    genSemanticStyle(token),
  ],
  prepareComponentToken,
);
