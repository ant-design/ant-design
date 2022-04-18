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
      paddingTop: 12, // FIXME: hardcode in v4

      [`&${componentCls}-small`]: {
        [`${componentCls}-item`]: {
          '&-container': {
            marginInlineStart: -12, // FIXME: hardcode in v4
          },
        },
      },

      [`${componentCls}-item`]: {
        overflow: 'visible',
        textAlign: 'center',

        '&-container': {
          display: 'inline-block',
          height: '100%', // FIXME: hardcode in v4
          marginInlineStart: -16, // FIXME: hardcode in v4
          paddingBottom: 12, // FIXME: hardcode in v4
          textAlign: 'start',
          transition: `opacity ${motionDurationSlow}`,

          [`${componentCls}-item-content`]: {
            maxWidth: stepsNavContentMaxWidth,
          },

          [`${componentCls}-item-title`]: {
            maxWidth: '100%', // FIXME: hardcode in v4
            paddingInlineEnd: 0, // FIXME: hardcode in v4
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
              opacity: 0.85, // FIXME: hardcode in v4
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
          insetInlineStart: '100%',
          display: 'inline-block',
          width: 12, // FIXME: hardcode in v4
          height: 12, // FIXME: hardcode in v4
          marginTop: -14, // FIXME: hardcode in v4
          marginInlineStart: -2, // FIXME: hardcode in v4
          borderTop: `1px solid ${stepsNavArrowColor}`,
          borderBottom: 'none',
          borderInlineStart: 'none',
          borderInlineEnd: `1px solid ${stepsNavArrowColor}`,
          transform: 'rotate(45deg)',
          content: '""',
        },

        '&::before': {
          position: 'absolute',
          bottom: 0, // FIXME: hardcode in v4
          insetInlineStart: '50%',
          display: 'inline-block',
          width: 0, // FIXME: hardcode in v4
          height: 2, // FIXME: hardcode in v4
          backgroundColor: stepsNavActiveColor,
          transition: `width ${motionDurationSlow}, inset-inline-start ${motionDurationSlow}`,
          transitionTimingFunction: 'ease-out',
          content: '""',
        },
      },

      [`${componentCls}-item${componentCls}-item-active::before`]: {
        insetInlineStart: 0, // FIXME: hardcode in v4
        width: '100%', // FIXME: hardcode in v4
      },
    },

    [`&${componentCls}-navigation${componentCls}-vertical`]: {
      [`> ${componentCls}-item`]: {
        marginInlineEnd: '0 !important',

        '&::before': {
          display: 'none',
        },
        [`&${componentCls}-item-active::before`]: {
          top: 0, // FIXME: hardcode in v4
          insetInlineEnd: 0, // FIXME: hardcode in v4
          insetInlineStart: 'unset',
          display: 'block',
          width: 3, // FIXME: hardcode in v4
          height: 'calc(100% - 24px)',
        },

        '&::after': {
          position: 'relative',
          top: -2, // FIXME: hardcode in v4
          insetInlineStart: '50%',
          display: 'block',
          width: 8, // FIXME: hardcode in v4
          height: 8, // FIXME: hardcode in v4
          marginBottom: 8, // FIXME: hardcode in v4
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
