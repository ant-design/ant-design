import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import { textEllipsis } from '../../style';
import type { GenerateStyle } from '../../theme/internal';

const genStepsNavStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    navContentMaxWidth,
    navArrowColor,
    stepsNavActiveColor,
    motionDurationSlow,
  } = token;

  return {
    [`&${componentCls}-navigation`]: {
      paddingTop: token.paddingSM,

      [`&${componentCls}-small`]: {
        [`${componentCls}-item`]: {
          '&-container': {
            marginInlineStart: token.calc(token.marginSM).mul(-1).equal(),
          },
        },
      },

      [`${componentCls}-item`]: {
        overflow: 'visible',
        textAlign: 'center',

        '&-container': {
          display: 'inline-block',
          height: '100%',
          marginInlineStart: token.calc(token.margin).mul(-1).equal(),
          paddingBottom: token.paddingSM,
          textAlign: 'start',
          transition: `opacity ${motionDurationSlow}`,

          [`${componentCls}-item-content`]: {
            maxWidth: navContentMaxWidth,
          },

          [`${componentCls}-item-title`]: {
            maxWidth: '100%',
            paddingInlineEnd: 0,
            ...textEllipsis,

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
          top: `calc(50% - ${unit(token.calc(token.paddingSM).div(2).equal())})`,
          insetInlineStart: '100%',
          display: 'inline-block',
          width: token.fontSizeIcon,
          height: token.fontSizeIcon,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          borderBottom: 'none',
          borderInlineStart: 'none',
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          transform: 'translateY(-50%) translateX(-50%) rotate(45deg)',
          content: '""',
        },

        '&::before': {
          position: 'absolute',
          bottom: 0,
          insetInlineStart: '50%',
          display: 'inline-block',
          width: 0,
          height: token.lineWidthBold,
          backgroundColor: stepsNavActiveColor,
          transition: `width ${motionDurationSlow}, inset-inline-start ${motionDurationSlow}`,
          transitionTimingFunction: 'ease-out',
          content: '""',
        },
      },

      [`${componentCls}-item${componentCls}-item-active::before`]: {
        insetInlineStart: 0,
        width: '100%',
      },
    },

    [`&${componentCls}-navigation${componentCls}-vertical`]: {
      [`> ${componentCls}-item`]: {
        marginInlineEnd: 0,

        '&::before': {
          display: 'none',
        },
        [`&${componentCls}-item-active::before`]: {
          top: 0,
          insetInlineEnd: 0,
          insetInlineStart: 'unset',
          display: 'block',
          width: token.calc(token.lineWidth).mul(3).equal(),
          height: `calc(100% - ${unit(token.marginLG)})`,
        },

        '&::after': {
          position: 'relative',
          insetInlineStart: '50%',
          display: 'block',
          width: token.calc(token.controlHeight).mul(0.25).equal(),
          height: token.calc(token.controlHeight).mul(0.25).equal(),
          marginBottom: token.marginXS,
          textAlign: 'center',
          transform: 'translateY(-50%) translateX(-50%) rotate(135deg)',
        },

        '&:last-child': {
          '&::after': {
            display: 'none',
          },
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
