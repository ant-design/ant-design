import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsProgressStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { antCls, componentCls, iconSize, iconSizeSM, lineWidthBold } = token;

  const progressSize = token.calc(iconSize).add(token.calc(lineWidthBold).mul(4).equal()).equal();
  const progressSizeSM = token
    .calc(iconSizeSM)
    .add(token.calc(token.lineWidth).mul(4).equal())
    .equal();

  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: token.paddingXXS,

        [`&-process ${componentCls}-item-container ${componentCls}-item-icon ${componentCls}-icon`]:
          {
            color: token.processIconColor,
          },
      },

      [`&${componentCls}-vertical > ${componentCls}-item `]: {
        paddingInlineStart: token.paddingXXS,
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: token.marginXXS,
          insetInlineStart: token
            .calc(token.iconSize)
            .div(2)
            .sub(token.lineWidth)
            .add(token.paddingXXS)
            .equal(),
        },
      },

      [`&, &${componentCls}-small`]: {
        [`&${componentCls}-horizontal ${componentCls}-item:first-child`]: {
          paddingBottom: token.paddingXXS,
          paddingInlineStart: token.paddingXXS,
        },
      },

      [`&${componentCls}-small${componentCls}-vertical > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]:
        {
          insetInlineStart: token
            .calc(token.iconSizeSM)
            .div(2)
            .sub(token.lineWidth)
            .add(token.paddingXXS)
            .equal(),
        },

      [`&${componentCls}-label-vertical`]: {
        [`${componentCls}-item ${componentCls}-item-tail`]: {
          top: token.calc(token.margin).sub(token.calc(token.lineWidth).mul(2).equal()).equal(),
        },
      },

      [`${componentCls}-item-icon`]: {
        position: 'relative',

        [`${antCls}-progress`]: {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',

          '&-inner': {
            width: `${progressSize} !important`,
            height: `${progressSize} !important`,
          },
        },
      },

      // Small size
      [`&${componentCls}-small ${componentCls}-item-icon ${antCls}-progress-inner`]: {
        width: `${progressSizeSM} !important`,
        height: `${progressSizeSM} !important`,
      },
    },
  };
};

export default genStepsProgressStyle;
