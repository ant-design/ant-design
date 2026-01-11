import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { calc, antCls, componentCls, lineWidthBold, motionDurationSlow } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

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
  };
};

export default genStepsProgressStyle;
