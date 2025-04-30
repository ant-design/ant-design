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

// const getVariantStyle = (
//   token: StepsToken,
//   variant: 'solid' | 'outlined',
//   status: StepItemStatus,
//   backgroundColor: string,
//   borderColor: string,
//   color: string,
//   customIconColor: string,
// ): CSSObject => {
//   const { componentCls } = token;
//   const itemCls = `${componentCls}-item`;

//   return {
//     // Not dot
//     [`&${componentCls}-${variant}:not(${componentCls}-dot)`]: {
//       [`${itemCls}-${status}`]: {
//         [`&:not(${itemCls}-custom) ${itemCls}-icon`]: {
//           background: backgroundColor,
//           borderColor,
//           color,
//         },

//         [`&${itemCls}-custom ${itemCls}-icon`]: {
//           color: customIconColor,
//         },
//       },
//     },

//     // Dot
//     [`&${componentCls}-${variant}${componentCls}-dot`]: {
//       [`${itemCls}-${status}`]: {
//         [`${itemCls}-icon-dot`]: {
//           background: backgroundColor,
//           borderColor,
//         },
//       },
//     },
//   };
// };

const getStatusStyle = (
  token: StepsToken,
  status: StepItemStatus,

  iconBgColor: string,
  iconBorderColor: string,
  iconTextColor: string,

  dotIconBgColor: string,
  dotIconBorderColor: string,

  solidLineColor: string,

  titleColor: string,
  descriptionColor: string,
  activeDescriptionColor: string,
): CSSInterpolation => {
  const { componentCls, colorTextLightSolid, colorPrimary } = token;
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

        [`&${itemCls}-custom ${itemCls}-icon`]: {
          // color: token[dotColorKey],
          color: solidLineColor,
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

    [`${itemCls}-${status}`]: {
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
  } = token;

  // Wait Colors
  const waitSolidColor = token.colorFillContent;

  // Process Colors
  const processSolidColor = token.colorPrimary;

  // Finish Colors
  const finishSolidColor = token.controlItemBgActive;

  // Error Colors
  const errorSolidColor = token.colorError;

  return {
    [`${componentCls}-solid`]: [
      // Wait
      getStatusStyle(
        token,
        STATUS_WAIT,
        // Icon
        waitSolidColor,
        'transparent',
        colorTextLabel,
        // Dot
        colorTextDisabled,
        'transparent',
        // Rail
        colorTextDisabled,
        // Text
        colorText,
        colorTextDescription,
        colorText,
      ),

      // Process
      getStatusStyle(
        token,
        STATUS_PROCESS,
        // Icon
        processSolidColor,
        'transparent',
        colorTextLightSolid,
        // Dot
        colorPrimary,
        'transparent',
        // Rail
        colorPrimary,
        // Text
        colorText,
        colorTextDescription,
        colorText,
      ),

      // Finish
      getStatusStyle(
        token,
        STATUS_FINISH,
        // Icon
        finishSolidColor,
        'transparent',
        colorPrimary,
        // Dot
        colorPrimary,
        'transparent',
        // Rail
        colorPrimary,
        // Text
        colorText,
        colorTextDescription,
        colorText,
      ),

      // Error
      getStatusStyle(
        token,
        STATUS_ERROR,
        // Icon
        errorSolidColor,
        'transparent',
        colorTextLightSolid,
        // Dot
        colorError,
        'transparent',
        // Rail
        colorError,
        // Text
        colorText,
        colorTextDescription,
        colorText,
      ),
    ],
  };
};

export default genStatusStyle;
