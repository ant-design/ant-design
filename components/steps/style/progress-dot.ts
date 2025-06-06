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
      '--steps-icon-size-active': dotCurrentSize,
      '--steps-icon-size': dotSize,
      '--steps-dot-icon-size': dotSize,
      '--steps-dot-icon-border-width': token.lineWidthBold,
      '--steps-rail-size': lineWidthBold,
      '--steps-icon-border-width': lineWidthBold,

      // ========================= Shared ==========================
      // Icon
      [`${itemCls}-custom ${itemCls}-icon`]: {
        fontSize: fontSizeSM,
      },

      [`${itemCls}-icon`]: {
        position: 'relative',

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

      // // >>> active
      [`${itemCls}-active ${itemCls}-icon`]: {
        '--steps-icon-size': 'var(--steps-icon-size-active)',
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
