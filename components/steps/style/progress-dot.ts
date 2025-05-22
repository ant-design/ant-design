// [Legacy]
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genDotStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize, dotSize, dotCurrentSize, marginXXS, lineWidthBold, fontSizeSM } =
    token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-dot`]: {
      '--steps-icon-size': dotCurrentSize,
      '--steps-dot-icon-size': dotSize,
      '--steps-dot-icon-border-width': token.lineWidthBold,
      '--steps-rail-size': lineWidthBold,

      // ========================= Shared ==========================
      // Icon
      [`${itemCls}-icon`]: {
        background: 'transparent',
        border: 0,
      },

      [`${itemCls}-icon-dot`]: {
        width: 'var(--steps-dot-icon-size)',
        height: 'var(--steps-dot-icon-size)',
        borderRadius: '100%',
        border: `var(--steps-dot-icon-border-width) ${token.lineType} transparent`,
        position: 'relative',
        transition: `all ${token.motionDurationSlow}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: fontSizeSM,

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
        '--steps-dot-icon-size': 'var(--steps-icon-size)',
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
