import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsRTLStyle: GenerateStyle<StepsToken, CSSObject> = token => {
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
          insetInlineEnd: 0,
          insetInlineStart: 'auto',
        },
        '&-title': {
          paddingRight: 0,
          paddingLeft: 16,

          '&::after': {
            insetInlineEnd: '100%',
            insetInlineStart: 'auto',
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
            insetInlineEnd: 0.5,
            insetInlineStart: 'auto',
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
          insetInlineEnd: '100%',
          insetInlineStart: 'auto',
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
            insetInlineEnd: stepsVerticalTailWidth,
            insetInlineStart: 'auto',
          },
        },

        [`&${componentCls}-small`]: {
          [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
            insetInlineEnd: stepsVerticalTailWidthSm,
            insetInlineStart: 'auto',
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
          margin: `0 ${stepsDescriptionMaxWidth / 2}px 0 0`,
          '&::after': {
            marginRight: 12,
            marginLeft: 0,
          },
        },

        [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          insetInlineEnd: 2,
          insetInlineStart: 'auto',
        },

        [`&${componentCls}-small ${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          insetInlineEnd: 2,
          insetInlineStart: 'auto',
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
            insetInlineEnd: -26,
            insetInlineStart: 'auto',
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
            insetInlineEnd: -9,
            insetInlineStart: 'auto',
          },
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineEnd: 0,
            insetInlineStart: 'auto',
          },
        },
        [`${componentCls}-item-process`]: {
          [`${componentCls}-icon-dot`]: {
            insetInlineEnd: -2,
            insetInlineStart: 'auto',
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
};
export default genStepsRTLStyle;
