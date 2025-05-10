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

  return {
    [`${componentCls}${componentCls}-dot`]: {
      '--steps-icon-size': dotCurrentSize,
      '--steps-rail-size': lineWidthBold,

      // ========================= Shared ==========================
      // Icon
      [`${itemCls}-icon`]: {
        background: 'transparent',
        border: 0,
      },

      [`${itemCls}-icon-dot`]: {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize,
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
        // With descriptionMaxWidth
        [`&, &${componentCls}-small`]: getItemWithWidthStyle(token, marginXXS),
      },
    },
  };
};

export default genDotStyle;
