import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genLegacyNavStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    fontSizeIcon,
    navContentMaxWidth,
    navArrowColor,
    colorPrimary,
    motionDurationSlow,
    antCls,
    calc,
  } = token;

  const itemCls = `${componentCls}-item`;

  const stepsNavActiveColor = colorPrimary;

  const [varName, varRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  return {
    [`${componentCls}${componentCls}-navigation`]: {
      // ==========================================================
      // ==                        Shared                        ==
      // ==========================================================
      // ========================== Item ==========================
      [itemCls.repeat(4)]: {
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

        // Reset active item style to same as default
        [`&${itemCls}-active`]: {
          [varName('item-content-active-color')]: varRef('item-content-color'),
          [varName('item-icon-active-bg-color')]: varRef('item-icon-bg-color'),
          [varName('item-icon-active-border-color')]: varRef('item-icon-border-color'),
          [varName('item-icon-active-text-color')]: varRef('item-icon-text-color'),
        },
      },

      // ==========================================================
      // ==                       Horizontal                     ==
      // ==========================================================
      [`&${componentCls}-horizontal`]: {
        [itemCls]: {
          '&:before': {
            bottom: 0,
            insetInlineStart: '50%',
            width: 0,
            height: token.lineWidthBold,
          },

          [`&${itemCls}-active:before`]: {
            insetInlineStart: 0,
            width: '100%',
          },

          '&:not(:last-child):after': {
            top: `50%`,
            insetInlineStart: calc(fontSizeIcon).div(2).mul(-1).add('100%').equal(),
            width: fontSizeIcon,
            height: fontSizeIcon,
            transform: 'translateY(-50%) rotate(45deg)',
          },
        },
      },

      // ==========================================================
      // ==                        Vertical                      ==
      // ==========================================================
      [`&${componentCls}-vertical`]: {
        [itemCls.repeat(4)]: {
          [`${itemCls}-content`]: {
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
