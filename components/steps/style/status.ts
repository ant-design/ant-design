import type { CSSObject } from '@ant-design/cssinjs';

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

const getStatusStyle = (status: StepItemStatus, token: StepsToken): CSSObject => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  const iconColorKey: keyof StepsToken = `${status}IconColor`;
  const iconBgColorKey: keyof StepsToken = `${status}IconBgColor`;
  const iconBorderColorKey: keyof StepsToken = `${status}IconBorderColor`;
  const dotColorKey: keyof StepsToken = `${status}DotColor`;
  const tailColorKey: keyof StepsToken = `${status}TailColor`;
  const titleColorKey: keyof StepsToken = `${status}TitleColor`;
  const descriptionColorKey: keyof StepsToken = `${status}DescriptionColor`;

  return {
    // Not dot
    [`&:not(${componentCls}-dot)`]: {
      [`${itemCls}-${status}`]: {
        [`&:not(${itemCls}-custom) ${itemCls}-icon`]: {
          background: token[iconBgColorKey],
          borderColor: token[iconBorderColorKey],
          color: token[iconColorKey],
        },

        [`&${itemCls}-custom ${itemCls}-icon`]: {
          color: token[dotColorKey],
        },
      },
    },

    // Dot
    [`&${componentCls}-dot`]: {
      [`${itemCls}-${status}`]: {
        [`${itemCls}-icon-dot`]: {
          background: token[dotColorKey],
        },
      },
    },

    [`${itemCls}-${status}`]: {
      [`${itemCls}-title`]: {
        color: token[titleColorKey],
      },

      [`${itemCls}-description`]: {
        color: token[descriptionColorKey],
      },
    },

    [`${itemCls}-rail-${status}`]: {
      background: token[tailColorKey],
    },
  };
};

const genStatusStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: [
      getStatusStyle(STATUS_WAIT, token),
      getStatusStyle(STATUS_PROCESS, token),
      getStatusStyle(STATUS_FINISH, token),
      getStatusStyle(STATUS_ERROR, token),
    ],
  };
};

export default genStatusStyle;
