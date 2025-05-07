import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const STATUS_WAIT = 'wait';
const STATUS_PROCESS = 'process';
const STATUS_FINISH = 'finish';
const STATUS_ERROR = 'error';

type StepItemStatus =
  | typeof STATUS_WAIT
  | typeof STATUS_PROCESS
  | typeof STATUS_FINISH
  | typeof STATUS_ERROR;

const getStatusTextStyle = (
  token: StepsToken,
  status: StepItemStatus,

  solidLineColor: string,

  titleColor: string,
  descriptionColor: string,
  activeDescriptionColor: string,

  // Hover
  hoverTitleColor: string = titleColor,
): CSSInterpolation => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${itemCls}-${status}`]: {
      [`&${itemCls}-custom ${itemCls}-icon`]: {
        color: solidLineColor,
      },

      [`${itemCls}-title`]: {
        color: titleColor,
      },

      [`${itemCls}-description`]: {
        color: descriptionColor,
      },

      [`&${itemCls}-active ${itemCls}-description`]: {
        color: activeDescriptionColor,
      },

      // Hover
      [`&:not(${itemCls}-active) ${itemCls}-wrapper[role='button']:hover`]: {
        [`${itemCls}-title, ${itemCls}-description, &${itemCls}-active ${itemCls}-description`]: {
          color: hoverTitleColor,
        },
      },
    },

    [`${itemCls}-rail-${status}`]: {
      background: solidLineColor,
    },
  };
};

const getStatusStyle = (
  token: StepsToken,
  status: StepItemStatus,

  iconBgColor: string,
  iconBorderColor: string,
  iconTextColor: string,

  dotIconBgColor: string,
  dotIconBorderColor: string,

  hoverIconBgColor: string = iconBgColor,
  hoverIconBorderColor: string = iconBorderColor,
  hoverIconTextColor: string = iconTextColor,
): CSSInterpolation => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  return {
    // Not dot
    [`&:not(${componentCls}-dot)`]: {
      [`${itemCls}-${status}:not(${itemCls}-custom)`]: {
        [`${itemCls}-icon`]: {
          background: iconBgColor,
          borderColor: iconBorderColor,
          color: iconTextColor,
        },

        // Hover
        [`&:not(${itemCls}-active) ${itemCls}-wrapper[role='button']:hover`]: {
          [`${itemCls}-icon`]: {
            background: hoverIconBgColor,
            borderColor: hoverIconBorderColor,
            color: hoverIconTextColor,
          },
        },
      },
    },

    // Dot
    [`&${componentCls}-dot`]: {
      [`${itemCls}-${status}`]: {
        [`${itemCls}-icon-dot`]: {
          background: dotIconBgColor,
          borderColor: dotIconBorderColor,
        },
      },
    },
  };
};

const genStatusStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    colorTextDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorTextLabel,
    colorError,
    colorText,
    colorTextDescription,
    colorFillContent,
    controlItemBgActive,
    colorBgContainer,
    colorPrimaryHover,
  } = token;

  return {
    // ========================== Shared ==========================
    [componentCls]: [
      getStatusTextStyle(
        token,
        STATUS_WAIT,
        // Rail
        colorTextDisabled,
        // Text
        colorText,
        colorTextDescription,
        colorText,
        // Hover
        colorPrimaryHover,
      ),
      getStatusTextStyle(
        token,
        STATUS_PROCESS,
        // Rail
        colorPrimary,
        // Text
        colorText,
        colorTextDescription,
        colorText,
        // Hover
        colorPrimaryHover,
      ),
      getStatusTextStyle(
        token,
        STATUS_FINISH,
        // Rail
        colorPrimary,
        // Text
        colorText,
        colorTextDescription,
        colorText,
        // Hover
        colorPrimaryHover,
      ),
      getStatusTextStyle(
        token,
        STATUS_ERROR,
        // Rail
        colorError,
        // Text
        colorError,
        colorError,
        colorError,
        // Hover
        token.colorErrorHover,
      ),
    ],

    // ========================== Filled ==========================
    [`${componentCls}-filled`]: [
      // Wait
      getStatusStyle(
        token,
        STATUS_WAIT,
        // Icon
        // colorFillContent,
        token.colorFillTertiary,
        'transparent',
        colorTextLabel,
        // Dot
        colorTextDisabled,
        'transparent',
        // Hover
        token.colorPrimaryBgHover,
        'transparent',
        colorPrimary,
      ),

      // Process
      getStatusStyle(
        token,
        STATUS_PROCESS,
        // Icon
        colorPrimary,
        'transparent',
        colorTextLightSolid,
        // Dot
        colorPrimary,
        'transparent',
      ),

      // Finish
      getStatusStyle(
        token,
        STATUS_FINISH,
        // Icon
        token.colorPrimaryBg,
        'transparent',
        colorPrimary,
        // Dot
        colorPrimary,
        'transparent',
        // Hover
        token.colorPrimaryBgHover,
        'transparent',
      ),

      // Error
      getStatusStyle(
        token,
        STATUS_ERROR,
        // Icon
        colorError,
        'transparent',
        colorTextLightSolid,
        // Dot
        colorError,
        'transparent',
        // Hover
        token.colorErrorHover,
        'transparent',
      ),
    ],

    // ========================= Outlined =========================
    [`${componentCls}-outlined`]: [
      // Wait
      getStatusStyle(
        token,
        STATUS_WAIT,
        // Icon
        colorBgContainer,
        colorTextDisabled,
        colorTextDisabled,
        // Dot
        'transparent',
        colorTextDisabled,
        // Hover
        'transparent',
        colorPrimaryHover,
        colorPrimaryHover,
      ),

      // Process
      getStatusStyle(
        token,
        STATUS_PROCESS,
        // Icon
        colorBgContainer,
        colorPrimary,
        colorPrimary,
        // Dot
        'transparent',
        colorPrimary,
        // Hover
        'transparent',
        token.colorPrimaryHover,
        token.colorPrimaryHover,
      ),

      // Finish
      getStatusStyle(
        token,
        STATUS_FINISH,
        // Icon
        colorBgContainer,
        colorPrimary,
        colorPrimary,
        // Dot
        'transparent',
        colorPrimary,
        // Hover
        'transparent',
        token.colorPrimaryHover,
        token.colorPrimaryHover,
      ),

      // Error
      getStatusStyle(
        token,
        STATUS_ERROR,
        // Icon
        colorBgContainer,
        colorError,
        colorError,
        // Dot
        'transparent',
        colorError,
        // Hover
        'transparent',
        token.colorErrorHover,
        token.colorErrorHover,
      ),
    ],
  };
};

export default genStatusStyle;
