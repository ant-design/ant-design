import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSizeSM, fontSize, lineHeight, marginXS } = token;

  return {
    [`${componentCls}${componentCls}-small`]: {
      '--steps-icon-size': iconSizeSM,
      '--steps-label-horizontal-item-margin': token.marginSM,
      '--steps-label-vertical-row-gap': token.paddingXS,
      '--steps-title-font-size': fontSize,
      '--steps-title-line-height': lineHeight,
      '--steps-label-horizontal-rail-margin': token.marginXS,

      // Horizontal: label vertical
      [`&${componentCls}-horizontal${componentCls}-label-vertical`]: getItemWithWidthStyle(
        token,
        marginXS,
      ),
    },
  };
};
export default genSmallStyle;
