import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    calc,
    antCls,
    componentCls,
    iconSize,
    iconSizeSM,
    marginXXS,
    lineWidthBold,
    lineWidth,
    paddingXXS,
  } = token;

  const itemCls = `${componentCls}-item`;

  const progressSize = token.calc(iconSize).add(token.calc(lineWidthBold).mul(4).equal()).equal();
  const progressSizeSM = token
    .calc(iconSizeSM)
    .add(token.calc(token.lineWidth).mul(4).equal())
    .equal();

  return {
    [`${componentCls}${componentCls}-with-progress`]: {
      [`${itemCls}${itemCls}-process`]: {
        [`${itemCls}-icon`]: {
          position: 'relative',
          background: 'transparent',
          border: 0,
        },
      },

      [`${itemCls}-progress-icon`]: {
        '&-svg': {
          position: 'absolute',
          inset: 0,
        },

        '&-circle': {
          '--icon-size-ptg-unitless': `calc(100 / tan(atan2(${iconSize},1px)))`,
          strokeWidth: calc(`var(--icon-size-ptg-unitless)`).mul(lineWidthBold).equal(),
          '--progress-r': calc(iconSize)
            .sub(lineWidthBold)
            .mul(`var(--icon-size-ptg-unitless)`)
            .div(2)
            .equal(),
          r: `var(--progress-r)`,
          fill: 'none',
          cx: 50,
          cy: 50,
          transition: `all ${token.motionDurationSlow} ease-in-out`,

          '&-rail': {
            stroke: token.colorSplit,
          },

          '&-ptg': {
            stroke: token.colorPrimary,
          },
        },
      },
    },

    [`&${componentCls}-with-progress11`]: {
      // ==========================================================
      // ==                        Shared                        ==
      // ==========================================================
      [itemCls]: {
        paddingTop: paddingXXS,
        paddingInlineStart: paddingXXS,
      },

      [`${itemCls}-icon`]: {
        position: 'relative',

        [`${antCls}-progress`]: {
          position: 'absolute',
          left: {
            _skip_check_: true,
            value: '50%',
          },
          top: '50%',
          transform: 'translate(-50%, -50%)',

          '&-body': {
            width: `${unit(progressSize)} !important`,
            height: `${unit(progressSize)} !important`,
          },
        },
      },

      [`&${componentCls}-small`]: {
        [`${itemCls}-icon ${antCls}-progress-body`]: {
          width: `${unit(progressSizeSM)} !important`,
          height: `${unit(progressSizeSM)} !important`,
        },
      },

      // ==========================================================
      // ==                       Horizontal                     ==
      // ==========================================================

      // ==========================================================
      // ==                        Vertical                      ==
      // ==========================================================

      // [`&${componentCls}-vertical > ${itemCls} `]: {
      //   paddingInlineStart: paddingXXS,
      //   [`> ${itemCls}-wrapper > ${itemCls}-tail`]: {
      //     top: marginXXS,
      //     insetInlineStart: token.calc(iconSize).div(2).sub(lineWidth).add(paddingXXS).equal(),
      //   },
      // },

      // [`&, &${componentCls}-small`]: {
      //   [`&${componentCls}-horizontal ${itemCls}:first-child`]: {
      //     paddingBottom: paddingXXS,
      //     paddingInlineStart: paddingXXS,
      //   },
      // },

      // [`&${componentCls}-small${componentCls}-vertical > ${itemCls} > ${itemCls}-wrapper > ${itemCls}-tail`]:
      //   {
      //     insetInlineStart: token.calc(iconSizeSM).div(2).sub(lineWidth).add(paddingXXS).equal(),
      //   },

      // [`&${componentCls}-label-vertical ${itemCls} ${itemCls}-tail`]: {
      //   top: token.calc(iconSize).div(2).add(paddingXXS).equal(),
      // },

      // // ============================== Small size ==============================
      // [`&${componentCls}-small`]: {
      //   [`&${componentCls}-label-vertical ${itemCls} ${itemCls}-tail`]: {
      //     top: token.calc(iconSizeSM).div(2).add(paddingXXS).equal(),
      //   },

      //   [`${itemCls}-icon ${antCls}-progress-body`]: {
      //     width: `${unit(progressSizeSM)} !important`,
      //     height: `${unit(progressSizeSM)} !important`,
      //   },
      // },
    },
  };
};

export default genStepsProgressStyle;
