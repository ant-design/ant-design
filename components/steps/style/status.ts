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
): CSSInterpolation => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${itemCls}-${status}`]: {
      [`&${itemCls}-custom ${itemCls}-icon`]: {
        // color: token[dotColorKey],
        color: solidLineColor,
      },

      [`${itemCls}-title`]: {
        // color: token[titleColorKey],
        color: titleColor,
      },

      [`${itemCls}-description`]: {
        // color: token[descriptionColorKey],
        color: descriptionColor,
      },

      [`&${itemCls}-active ${itemCls}-description`]: {
        color: activeDescriptionColor,
      },
    },

    [`${itemCls}-rail-${status}`]: {
      // background: token[tailColorKey],
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
): CSSInterpolation => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  // const iconColorKey: keyof StepsToken = `${status}IconColor`;
  // const iconBgColorKey: keyof StepsToken = `${status}IconBgColor`;
  // const iconBorderColorKey: keyof StepsToken = `${status}IconBorderColor`;
  // const dotColorKey: keyof StepsToken = `${status}DotColor`;
  // const tailColorKey: keyof StepsToken = `${status}TailColor`;
  // const titleColorKey: keyof StepsToken = `${status}TitleColor`;
  // const descriptionColorKey: keyof StepsToken = `${status}DescriptionColor`;

  return {
    // Not dot
    [`&:not(${componentCls}-dot)`]: {
      [`${itemCls}-${status}`]: {
        [`&:not(${itemCls}-custom) ${itemCls}-icon`]: {
          // background: token[iconBgColorKey],
          background: iconBgColor,
          // borderColor: token[iconBorderColorKey],
          borderColor: iconBorderColor,
          // color: token[iconColorKey],
          color: iconTextColor,
        },
      },
    },

    // Dot
    [`&${componentCls}-dot`]: {
      [`${itemCls}-${status}`]: {
        [`${itemCls}-icon-dot`]: {
          // background: token[dotColorKey],
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
      ),
      getStatusTextStyle(
        token,
        STATUS_ERROR,
        // Rail
        colorError,
        // Text
        colorText,
        colorTextDescription,
        colorText,
      ),
    ],

    // =========================== Solid ==========================
    [`${componentCls}-solid`]: [
      // Wait
      getStatusStyle(
        token,
        STATUS_WAIT,
        // Icon
        colorFillContent,
        'transparent',
        colorTextLabel,
        // Dot
        colorTextDisabled,
        'transparent',
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
        controlItemBgActive,
        'transparent',
        colorPrimary,
        // Dot
        colorPrimary,
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
      ),
    ],
  };
};

export default genStatusStyle;
