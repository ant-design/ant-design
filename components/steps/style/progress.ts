import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    calc,
    antCls,
    componentCls,
    iconSize,
    iconSizeSM,
    lineWidth,
    lineWidthBold,
    paddingXXS,
    motionDurationSlow,
  } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, 'steps');

  const progressSize = calc(iconSize).add(calc(lineWidthBold).mul(4).equal()).equal();

  const progressSizeSM = calc(iconSizeSM).add(calc(lineWidth).mul(4).equal()).equal();

  const enhanceSize = calc(lineWidthBold).add(lineWidthBold).equal();

  return {
    [`${componentCls}${componentCls}-with-progress`]: {
      [varName('item-wrapper-padding-top')]: enhanceSize,

      [`${itemCls}${itemCls}-process`]: {
        [`${itemCls}-icon`]: {
          position: 'relative',
        },
      },

      [`${itemCls}-progress-icon`]: {
        '&-svg': {
          [varName('svg-size')]: calc(enhanceSize).mul(2).add(varRef('icon-size')).equal(),
          [varName('icon-size-ptg-unitless')]: `calc(100 / tan(atan2(${varRef('svg-size')}, 1px)))`,
          fontSize: varRef('svg-size'),
          lineHeight: varRef('icon-size-ptg-unitless'),

          position: 'absolute',
          inset: calc(enhanceSize).mul(-1).equal(),
          width: 'auto',
          height: 'auto',
        },

        '&-circle': {
          lineHeight: varRef('icon-size-ptg-unitless'),
          strokeWidth: calc(varRef('icon-size-ptg-unitless')).mul(lineWidthBold).equal(),
          [varName('progress-radius')]: calc(varRef('svg-size'))
            .sub(lineWidthBold)
            .mul(varRef('icon-size-ptg-unitless'))
            .div(2)
            .equal(),
          r: varRef('progress-radius'),
          fill: 'none',
          cx: 50,
          cy: 50,
          transition: `all ${motionDurationSlow} ease-in-out`,

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
    },
  };
};

export default genStepsProgressStyle;
