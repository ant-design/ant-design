import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsRTLStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const { componentCls } = token;

  return {
    [`&${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-item`]: {
        // '&-icon': {
        // marginInlineEnd: 0,
        // marginInlineStart: 8,
        // },
        // '&-tail': {
        // insetInlineEnd: 0,
        // insetInlineStart: 'auto',
        // },
        '&-subtitle': {
          // marginInline: '0 8px',
          float: 'left',
        },
        // '&-title': {
        // paddingInlineEnd: 0,
        // paddingInlineStart: 16,

        // '&::after': {
        // insetInlineEnd: '100%',
        // insetInlineStart: 'auto',
        // },
        // },
      },

      // [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
      // [`${componentCls}-item`]: {
      // paddingInlineEnd: 16,
      // paddingInlineStart: 0,

      // '&:first-child': {
      // paddingInlineEnd: 0,
      // },

      // [`&:last-child ${componentCls}-item-title`]: {
      // paddingInlineStart: 0,
      // },
      // },
      // },

      // custom-icon
      // [`${componentCls}-item-custom`]: {
      // [`${componentCls}-item-icon`]: {
      // [`> ${componentCls}-icon`]: {
      // insetInlineEnd: 0.5,
      // insetInlineStart: 'auto',
      // },
      // },
      // },

      // nav
      [`&${componentCls}-navigation`]: {
        //   [`&${componentCls}-small`]: {
        //     [`${componentCls}-item-container`]: {
        // marginInlineEnd: -12,
        // marginInlineStart: 0,
        //   },
        // },

        // [`${componentCls}-item-container`]: {
        // marginInlineEnd: -16,
        // marginInlineStart: 0,
        // textAlign: 'right',

        // [`${componentCls}-item-title`]: {
        // paddingInlineStart: 0,
        // },
        // },

        [`${componentCls}-item::after`]: {
          // insetInlineEnd: '100%',
          // insetInlineStart: 'auto',
          // marginInlineEnd: -2,
          // marginInlineStart: 0,
          transform: 'rotate(-45deg)',
        },
      },

      // small
      // [`&${componentCls}-small`]: {
      // [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
      // paddingInlineEnd: 12,
      // paddingInlineStart: 0,

      // '&:first-child': {
      // paddingInlineEnd: 0,
      //   },
      // },

      // [`${componentCls}-item-title`]: {
      // paddingInlineEnd: 0,
      // paddingInlineStart: 12,
      //   },
      // },

      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          '&::after': {
            transform: 'rotate(225deg)',
          },
          [`${componentCls}-item-icon`]: {
            float: 'right',
            // marginInlineEnd: 0,
            // marginInlineStart: stepsVerticalIconWidth,
          },
          // [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
          // insetInlineEnd: stepsVerticalTailWidth,
          // insetInlineStart: 'auto',
          // },
        },

        // [`&${componentCls}-small`]: {
        // [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
        // insetInlineEnd: stepsVerticalTailWidthSm,
        // insetInlineStart: 'auto',
        // },
        // },
      },

      // label
      // [`&${componentCls}-label-vertical`]: {
      // [`${componentCls}-item-title`]: {
      // paddingInlineStart: 0,
      // },
      // },

      // progress-dot
      [`&${componentCls}-dot`]: {
        // [`${componentCls}-item-tail, &${componentCls}-small ${componentCls}-item-tail`]: {
        // margin: `0 ${stepsDescriptionMaxWidth / 2}px 0 0`,
        // '&::after': {
        // marginInlineEnd: 12,
        // marginInlineStart: 0,
        // },
        // },

        // [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        // insetInlineEnd: 2,
        // insetInlineStart: 'auto',
        // },

        // [`&${componentCls}-small ${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        // insetInlineEnd: 2,
        // insetInlineStart: 'auto',
        // },

        // [`${componentCls}-item-icon, &${componentCls}-small ${componentCls}-item-icon`]: {
        // marginInlineEnd: 67,
        // marginInlineStart: 0,
        // },

        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]:
          {
            float: 'right',
          },

        /* expand hover area */
        // [`${componentCls}-item-icon ${componentCls}-icon-dot::after, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot::after`]:
        // {
        // insetInlineEnd: -26,
        // insetInlineStart: 'auto',
        // },
      },

      // [`&${componentCls}-vertical${componentCls}-dot`]: {
      // [`${componentCls}-item-icon`]: {
      // marginInlineEnd: 0,
      // marginInlineStart: 16,
      // },
      // [`${componentCls}-item`]: {
      // https://github.com/ant-design/ant-design/issues/18354
      // [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
      // insetInlineEnd: -9,
      // insetInlineStart: 'auto',
      // },
      // [`&:first-child ${componentCls}-icon-dot`]: {
      // insetInlineEnd: 0,
      // insetInlineStart: 'auto',
      // },
      // },
      // [`${componentCls}-item-process`]: {
      // [`${componentCls}-icon-dot`]: {
      // insetInlineEnd: -2,
      // insetInlineStart: 'auto',
      // },
      // },
      // },

      // RTL Steps with progress
      // [`&${componentCls}-with-progress${componentCls}-horizontal${componentCls}-label-horizontal`]:
      // {
      // [`${componentCls}-item:first-child`]: {
      // paddingInlineEnd: 4,
      // paddingInlineStart: 0,
      // },
      // [`${componentCls}-item:first-child${componentCls}-item-active`]: {
      // paddingInlineEnd: 4,
      // },
      // },
    },
  };
};
export default genStepsRTLStyle;
