import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genLegacyNavStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    fontSizeIcon,
    calc,
    navContentMaxWidth,
    navArrowColor,
    colorPrimary,
    motionDurationSlow,
  } = token;

  const itemCls = `${componentCls}-item`;

  const stepsNavActiveColor = colorPrimary;

  return {
    [`${componentCls}${componentCls}-navigation`]: {
      // ==========================================================
      // ==                        Shared                        ==
      // ==========================================================
      // ========================== Item ==========================
      [`${itemCls.repeat(4)}`]: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        flex: 1,
        marginInlineStart: 0,

        [`${itemCls}-wrapper`]: {
          paddingBlock: token.paddingSM,
        },

        // Section
        [`${itemCls}-section`]: {
          maxWidth: navContentMaxWidth,
        },

        // Rail
        [`${itemCls}-rail`]: {
          display: 'none',
        },

        // ======================== Active ========================
        '&:before': {
          position: 'absolute',
          display: 'block',
          backgroundColor: stepsNavActiveColor,
          transition: `all ${motionDurationSlow}`,
          transitionTimingFunction: 'ease-out',
          content: '""',
        },

        '&:not(:last-child):after': {
          position: 'absolute',
          display: 'block',
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          borderBottom: 'none',
          borderInlineStart: 'none',
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          content: '""',
        },
      },

      // ==========================================================
      // ==                       Horizontal                     ==
      // ==========================================================
      [`&${componentCls}-horizontal`]: {
        [`${itemCls.repeat(4)}`]: {
          '&:before': {
            bottom: 0,
            insetInlineStart: '50%',
            width: 0,
            height: token.lineWidthBold,
          },

          [`&${itemCls}-active::before`]: {
            insetInlineStart: 0,
            width: '100%',
          },

          '&:not(:last-child):after': {
            top: `50%`,
            insetInlineStart: '100%',
            width: fontSizeIcon,
            height: fontSizeIcon,
            transform: 'translateY(-50%) translateX(-50%) rotate(45deg)',
          },
        },
      },

      // ==========================================================
      // ==                        Vertical                      ==
      // ==========================================================
      [`&${componentCls}-vertical`]: {
        [`${itemCls.repeat(4)}`]: {
          [`${itemCls}-description`]: {
            padding: 0,
          },

          '&:before': {
            insetInlineEnd: 0,
            top: '50%',
            width: token.lineWidthBold,
            height: 0,
          },

          [`&${itemCls}-active::before`]: {
            top: 0,
            height: '100%',
          },

          '&:not(:last-child):after': {
            left: {
              _skip_check_: true,
              value: '50%',
            },
            top: '100%',
            width: calc(fontSizeIcon).div(3).mul(2).equal(),
            height: calc(fontSizeIcon).div(3).mul(2).equal(),
            transform: 'translateY(-50%) translateX(-50%) rotate(135deg)',
          },
        },
      },

      // ========================= Legacy =========================
    },
  };
};
export default genLegacyNavStyle;
