// [Legacy]
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genDotStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    calc,
    componentCls,
    iconSize,
    iconSizeSM,
    dotSize,
    dotCurrentSize,
    marginXXS,
    lineWidthBold,
  } = token;

  const itemCls = `${componentCls}-item`;

  const iconVerticalOffset = calc(iconSize).sub(dotCurrentSize).div(2).equal();
  const smallIconVerticalOffset = calc(iconSizeSM).sub(dotCurrentSize).div(2).equal();

  return {
    [`${componentCls}${componentCls}-dot`]: {
      // ========================= Shared ==========================
      // Icon
      [`${itemCls}-icon`]: {
        width: dotCurrentSize,
        height: dotCurrentSize,
        background: 'transparent',
        border: 0,
      },

      [`${itemCls}-icon-dot`]: {
        width: dotSize,
        height: dotSize,
        borderRadius: 100,
        border: `${unit(token.lineWidthBold)} ${token.lineType} transparent`,
        position: 'relative',
        transition: `all ${token.motionDurationSlow}`,

        '&:after': {
          content: '""',
          width: iconSize,
          height: iconSize,
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: {
            _skip_check_: true,
            value: '50%',
          },
          transform: 'translate(-50%, -50%)',
        },
      },

      // >>> active
      [`${itemCls}-active ${itemCls}-icon-dot`]: {
        width: dotCurrentSize,
        height: dotCurrentSize,
      },

      // ======================= Horizontal ========================
      [`&${componentCls}-horizontal`]: {
        // Rail
        [`${itemCls}-rail`]: {
          marginTop: calc(dotCurrentSize).div(2).equal(),
          height: lineWidthBold,
          width: calc('100%').sub(dotCurrentSize).sub(calc(marginXXS).mul(2).equal()).equal(),
          insetInlineStart: calc('50%')
            .add(calc(dotCurrentSize).div(2).equal())
            .add(marginXXS)
            .equal(),
        },

        // With descriptionMaxWidth
        [`&, &${componentCls}-small`]: getItemWithWidthStyle(token, dotCurrentSize, marginXXS),
      },

      // ======================== Vertical =========================

      [`&${componentCls}-vertical`]: {
        // Icon
        [`${itemCls}-icon`]: {
          marginTop: iconVerticalOffset,
        },

        // Rail
        [`${itemCls}-rail`]: {
          insetInlineStart: calc(dotCurrentSize).div(2).equal(),
          width: lineWidthBold,
          top: calc(iconVerticalOffset).add(dotCurrentSize).add(marginXXS).equal(),
          bottom: calc(iconVerticalOffset).mul(-1).add(marginXXS).equal(),
        },

        // ========================= Small ==========================
        [`&${componentCls}-small`]: {
          // Icon
          [`${itemCls}-icon`]: {
            marginTop: smallIconVerticalOffset,
          },

          // Vertical - Rail
          [`${itemCls}-rail`]: {
            top: calc(smallIconVerticalOffset).add(dotCurrentSize).add(marginXXS).equal(),
            bottom: calc(smallIconVerticalOffset).mul(-1).add(marginXXS).equal(),
          },
        },
      },
    },
  };
};

export default genDotStyle;
