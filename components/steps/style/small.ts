import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genSmallStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSizeSM, fontSize, lineHeight, marginXS } = token;

  return {
    [`${componentCls}${componentCls}-small`]: {
      '--steps-icon-size': iconSizeSM,
      '--steps-title-horizontal-item-margin': token.marginSM,
      '--steps-title-vertical-row-gap': token.paddingXS,
      '--steps-title-font-size': fontSize,
      '--steps-title-line-height': lineHeight,
      '--steps-title-horizontal-rail-margin': token.marginXS,
      '--steps-title-horizontal-title-height': token.fontHeight,

      // Horizontal: label vertical
      [`&${componentCls}-horizontal${componentCls}-title-vertical`]: getItemWithWidthStyle(
        token,
        marginXS,
      ),
    },
  };
};
export default genSmallStyle;
