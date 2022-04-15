import { CSSObject } from '@ant-design/cssinjs';

import { StepsToken, withPx } from '.';

export default function genStepsRTLStyle(token: StepsToken): CSSObject {
  const {
    componentCls,
    stepsVerticalIconWidth,
    stepsVerticalTailWidth,
    stepsVerticalTailWidthSm,
    stepsDescriptionMaxWidth,
  } = token;

  return {
    [`&${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-item`]: {
        '&-icon': {
          marginRight: 0,
          marginLeft: 8,
        },
        '&-tail': {
          right: 0,
          left: 'auto',
        },
        '&-title': {
          paddingRight: 0,
          paddingLeft: 16,

          '&::after': {
            right: '100%',
            left: 'auto',
          },
        },
      },

      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
        [`${componentCls}-item`]: {
          paddingRight: 16,
          paddingLeft: 0,

          '&:first-child': {
            paddingRight: 0,
          },

          [`&:last-child ${componentCls}-item-title`]: {
            paddingLeft: 0,
          },
        },
      },

      // custom-icon
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          [`> ${componentCls}-icon`]: {
            right: 0.5,
            left: 'auto',
          },
        },
      },

      // nav
      [`&${componentCls}-navigation`]: {
        [`&${componentCls}-small`]: {
          [`${componentCls}-item-container`]: {
            marginRight: -12,
            marginLeft: 0,
          },
        },

        [`${componentCls}-item-container`]: {
          marginRight: -16,
          marginLeft: 0,
          textAlign: 'right',

          [`${componentCls}-item-title`]: {
            paddingLeft: 0,
          },
        },

        [`${componentCls}-item::after`]: {
          right: '100%',
          left: 'auto',
          marginRight: -2,
          marginLeft: 0,
          transform: 'rotate(225deg)',
        },
      },

      // small
      [`&${componentCls}-small`]: {
        [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
          paddingRight: 12,
          paddingLeft: 0,

          '&:first-child': {
            paddingRight: 0,
          },
        },

        [`${componentCls}-item-title`]: {
          paddingRight: 0,
          paddingLeft: 12,
        },
      },

      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          [`${componentCls}-item-icon`]: {
            float: 'right',
            marginRight: 0,
            marginLeft: stepsVerticalIconWidth,
          },
          [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
            right: stepsVerticalTailWidth,
            left: 'auto',
          },
        },

        [`&${componentCls}-small`]: {
          [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
            right: stepsVerticalTailWidthSm,
            left: 'auto',
          },
        },
      },

      // label
      [`&${componentCls}-label-vertical`]: {
        [`${componentCls}-item-title`]: {
          paddingLeft: 0,
        },
      },

      // progress-dot
      [`&${componentCls}-dot`]: {
        [`${componentCls}-item-tail, &${componentCls}-small ${componentCls}-item-tail`]: {
          margin: `0 ${withPx(stepsDescriptionMaxWidth / 2)} 0 0`,
          '&::after': {
            marginRight: 12,
            marginLeft: 0,
          },
        },

        [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          right: 2,
          left: 'auto',
        },

        [`&${componentCls}-small ${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          right: 2,
          left: 'auto',
        },

        [`${componentCls}-item-icon, &${componentCls}-small ${componentCls}-item-icon`]: {
          marginRight: 67,
          marginLeft: 0,
        },

        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]:
          {
            float: 'right',
          },

        /* expand hover area */
        [`${componentCls}-item-icon ${componentCls}-icon-dot::after, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot::after`]:
          {
            right: -26,
            left: 'auto',
          },
      },

      [`&${componentCls}-vertical${componentCls}-dot`]: {
        [`${componentCls}-item-icon`]: {
          marginRight: 0,
          marginLeft: 16,
        },
        [`${componentCls}-item`]: {
          // https://github.com/ant-design/ant-design/issues/18354
          [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
            right: -9,
            left: 'auto',
          },
          [`&:first-child ${componentCls}-icon-dot`]: {
            right: 0,
            left: 'auto',
          },
        },
        [`${componentCls}-item-process`]: {
          [`${componentCls}-icon-dot`]: {
            right: -2,
            left: 'auto',
          },
        },
      },

      // RTL Steps with progress
      [`&${componentCls}-with-progress${componentCls}-horizontal${componentCls}-label-horizontal`]:
        {
          [`${componentCls}-item:first-child${componentCls}-item-active`]: {
            paddingRight: 4,
          },
        },
    },
  };
}
