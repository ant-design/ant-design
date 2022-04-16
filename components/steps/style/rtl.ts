import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsRTLStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsVerticalIconWidth,
    // stepsVerticalTailWidth,
    // stepsVerticalTailWidthSm,
    stepsDescriptionMaxWidth,
  } = token;

  return {
    [`&${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-item`]: {
        '&-icon': {
          marginRight: 0, // FIXME: hardcode in v4
          marginLeft: 8, // FIXME: hardcode in v4
        },
        '&-tail': {
          // insetInlineEnd: 0,
          insetInlineStart: 'auto',
        },
        '&-title': {
          paddingRight: 0, // FIXME: hardcode in v4
          paddingLeft: 16, // FIXME: hardcode in v4

          '&::after': {
            // insetInlineEnd: '100%',
            // insetInlineStart: 'auto',
          },
        },
      },

      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
        [`${componentCls}-item`]: {
          paddingRight: 16, // FIXME: hardcode in v4
          paddingLeft: 0, // FIXME: hardcode in v4

          '&:first-child': {
            paddingRight: 0, // FIXME: hardcode in v4
          },

          [`&:last-child ${componentCls}-item-title`]: {
            paddingLeft: 0, // FIXME: hardcode in v4
          },
        },
      },

      // custom-icon
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          [`> ${componentCls}-icon`]: {
            insetInlineEnd: 0.5, // FIXME: hardcode in v4
            insetInlineStart: 'auto',
          },
        },
      },

      // nav
      [`&${componentCls}-navigation`]: {
        [`&${componentCls}-small`]: {
          [`${componentCls}-item-container`]: {
            marginRight: -12, // FIXME: hardcode in v4
            marginLeft: 0, // FIXME: hardcode in v4
          },
        },

        [`${componentCls}-item-container`]: {
          marginRight: -16, // FIXME: hardcode in v4
          marginLeft: 0, // FIXME: hardcode in v4
          textAlign: 'right',

          [`${componentCls}-item-title`]: {
            paddingLeft: 0, // FIXME: hardcode in v4
          },
        },

        [`${componentCls}-item::after`]: {
          // insetInlineEnd: '100%',
          // insetInlineStart: 'auto',
          marginRight: -2, // FIXME: hardcode in v4
          marginLeft: 0, // FIXME: hardcode in v4
          transform: 'rotate(225deg)',
        },
      },

      // small
      [`&${componentCls}-small`]: {
        [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
          paddingRight: 12, // FIXME: hardcode in v4
          paddingLeft: 0, // FIXME: hardcode in v4

          '&:first-child': {
            paddingRight: 0, // FIXME: hardcode in v4
          },
        },

        [`${componentCls}-item-title`]: {
          paddingRight: 0, // FIXME: hardcode in v4
          paddingLeft: 12, // FIXME: hardcode in v4
        },
      },

      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          [`${componentCls}-item-icon`]: {
            float: 'right',
            marginRight: 0, // FIXME: hardcode in v4
            marginLeft: stepsVerticalIconWidth,
          },
          [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
            // insetInlineEnd: stepsVerticalTailWidth,
            // insetInlineStart: 'auto',
          },
        },

        [`&${componentCls}-small`]: {
          [`${componentCls}-item-container > ${componentCls}-item-tail`]: {
            // insetInlineEnd: stepsVerticalTailWidthSm,
            // insetInlineStart: 'auto',
          },
        },
      },

      // label
      [`&${componentCls}-label-vertical`]: {
        [`${componentCls}-item-title`]: {
          paddingLeft: 0, // FIXME: hardcode in v4
        },
      },

      // progress-dot
      [`&${componentCls}-dot`]: {
        [`${componentCls}-item-tail, &${componentCls}-small ${componentCls}-item-tail`]: {
          margin: `0 ${stepsDescriptionMaxWidth / 2}px 0 0`,
          '&::after': {
            marginRight: 12, // FIXME: hardcode in v4
            marginLeft: 0, // FIXME: hardcode in v4
          },
        },

        [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          insetInlineEnd: 2, // FIXME: hardcode in v4
          insetInlineStart: 'auto',
        },

        [`&${componentCls}-small ${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
          insetInlineEnd: 2, // FIXME: hardcode in v4
          insetInlineStart: 'auto',
        },

        [`${componentCls}-item-icon, &${componentCls}-small ${componentCls}-item-icon`]: {
          marginRight: 67, // FIXME: hardcode in v4
          marginLeft: 0, // FIXME: hardcode in v4
        },

        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]:
          {
            float: 'right',
          },

        /* expand hover area */
        [`${componentCls}-item-icon ${componentCls}-icon-dot::after, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot::after`]:
          {
            insetInlineEnd: -26, // FIXME: hardcode in v4
            insetInlineStart: 'auto',
          },
      },

      [`&${componentCls}-vertical${componentCls}-dot`]: {
        [`${componentCls}-item-icon`]: {
          marginRight: 0, // FIXME: hardcode in v4
          marginLeft: 16, // FIXME: hardcode in v4
        },
        [`${componentCls}-item`]: {
          // https://github.com/ant-design/ant-design/issues/18354
          [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
            // insetInlineEnd: -9,
            // insetInlineStart: 'auto',
          },
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineEnd: 0, // FIXME: hardcode in v4
            insetInlineStart: 'auto',
          },
        },
        [`${componentCls}-item-process`]: {
          [`${componentCls}-icon-dot`]: {
            insetInlineEnd: -2, // FIXME: hardcode in v4
            insetInlineStart: 'auto',
          },
        },
      },

      // RTL Steps with progress
      [`&${componentCls}-with-progress${componentCls}-horizontal${componentCls}-label-horizontal`]:
        {
          [`${componentCls}-item:first-child${componentCls}-item-active`]: {
            paddingRight: 4, // FIXME: hardcode in v4
          },
        },
    },
  };
};
export default genStepsRTLStyle;
