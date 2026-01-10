import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import { getItemWithWidthStyle } from './util';

const genSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    iconSizeSM,
    fontSize,
    lineHeight,
    marginXS,
    fontHeight,
    marginSM,
    paddingXS,
    antCls,
  } = token;

  const [varName] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  return {
    [`${componentCls}${componentCls}-small`]: {
      [varName('icon-size')]: iconSizeSM,
      [varName('title-horizontal-item-margin')]: marginSM,
      [varName('title-vertical-row-gap')]: paddingXS,
      [varName('title-font-size')]: fontSize,
      [varName('title-line-height')]: lineHeight,
      [varName('title-horizontal-rail-margin')]: marginXS,
      [varName('title-horizontal-title-height')]: fontHeight,
      // Horizontal: label vertical
      [`&${componentCls}-horizontal${componentCls}-title-vertical`]: getItemWithWidthStyle(
        token,
        marginXS,
      ),
    },
  };
};
export default genSmallStyle;
