import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsNavStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsNavContentMaxWidth,
    stepsNavArrowColor,
    stepsNavActiveColor,
    motionDurationSlow,
  } = token;

  return {
    [`&${componentCls}-navigation`]: {
      paddingTop: 12,

      [`&${componentCls}-small`]: {
        [`${componentCls}-item`]: {
          '&-container': {
            marginLeft: -12,
          },
        },
      },

      [`${componentCls}-item`]: {
        overflow: 'visible',
        textAlign: 'center',

        '&-container': {
          display: 'inline-block',
          height: '100%',
          marginLeft: -16,
          paddingBottom: 12,
          textAlign: 'left',
          transition: `opacity ${motionDurationSlow}`,

          [`${componentCls}-item-content`]: {
            maxWidth: stepsNavContentMaxWidth,
          },

          [`${componentCls}-item-title`]: {
            maxWidth: '100%',
            paddingRight: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',

            '&::after': {
              display: 'none',
            },
          },
        },

        [`&:not(${componentCls}-item-active)`]: {
          [`${componentCls}-item-container[role='button']`]: {
            cursor: 'pointer',

            '&:hover': {
              opacity: 0.85,
            },
          },
        },

        '&:last-child': {
          flex: 1,

          '&::after': {
            display: 'none',
          },
        },

        '&::after': {
          position: 'absolute',
          top: '50%',
          left: '100%',
          display: 'inline-block',
          width: 12,
          height: 12,
          marginTop: -14,
          marginLeft: -2,
          border: `1px solid ${stepsNavArrowColor}`,
          borderBottom: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)',
          content: '""',
        },

        '&::before': {
          position: 'absolute',
          bottom: 0,
          left: '50%',
          display: 'inline-block',
          width: 0,
          height: 2,
          backgroundColor: stepsNavActiveColor,
          transition: `width ${motionDurationSlow}, left ${motionDurationSlow}`,
          transitionTimingFunction: 'ease-out',
          content: '""',
        },
      },

      [`${componentCls}-item${componentCls}-item-active::before`]: {
        left: 0,
        width: '100%',
      },
    },

    [`&${componentCls}-navigation${componentCls}-vertical`]: {
      [`> ${componentCls}-item`]: {
        marginRight: '0 !important',

        '&::before': {
          display: 'none',
        },
        [`&${componentCls}-item-active::before`]: {
          top: 0,
          right: 0,
          left: 'unset',
          display: 'block',
          width: 3,
          height: 'calc(100% - 24px)',
        },

        '&::after': {
          position: 'relative',
          top: -2,
          left: '50%',
          display: 'block',
          width: 8,
          height: 8,
          marginBottom: 8,
          textAlign: 'center',
          transform: 'rotate(135deg)',
        },
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          visibility: 'hidden',
        },
      },
    },

    [`&${componentCls}-navigation${componentCls}-horizontal`]: {
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        visibility: 'hidden',
      },
    },
  };
};
export default genStepsNavStyle;
