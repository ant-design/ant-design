// [Legacy]
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genDotStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    descriptionMaxWidth,
    lineHeight,
    dotCurrentSize,
    dotSize,
    motionDurationSlow,
  } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-dot`]: {
      // Icon
      [`${itemCls}-icon`]: {
        width: dotSize,
        height: dotSize,
        background: 'transparent',
        border: 0,
      },
    },
  };
};

export default genDotStyle;
