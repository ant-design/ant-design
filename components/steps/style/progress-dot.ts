// [Legacy]
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import { getItemWithWidthStyle } from './util';

const genDotStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    iconSize,
    dotSize,
    dotCurrentSize,
    marginXXS,
    lineWidthBold,
    fontSizeSM,
    antCls,
  } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  return {
    [`${componentCls}${componentCls}-dot`]: {
      [varName('icon-size-active')]: dotCurrentSize,
      [varName('icon-size')]: dotSize,
      [varName('dot-icon-size')]: dotSize,
      [varName('dot-icon-border-width')]: lineWidthBold,
      [varName('rail-size')]: lineWidthBold,
      [varName('icon-border-width')]: lineWidthBold,

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
        [varName('icon-size')]: varRef('icon-size-active'),
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
