import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genHorizontalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const itemCls = `${componentCls}-item`;
  const [varName, varRef] = genCssVar(antCls, 'steps');
  return {
    [`${componentCls}-horizontal`]: {
      [`> ${itemCls}`]: {
        flex: '1 1 auto',
        minWidth: token.iconSize,
        [`${itemCls}-rail`]: {
          [varName('horizontal-rail-margin')]:
            `calc(${varRef('icon-size-max')} / 2 + ${varRef('item-wrapper-padding-top')})`,
          position: 'static',
          marginTop: varRef('horizontal-rail-margin'),
          width: 'auto',
          borderBlockStartWidth: varRef('rail-size'),
          flex: 1,
          minWidth: 0,
          alignSelf: 'flex-start',
          transform: 'translate3d(0, -50%, 0)',
        },
      },
    },
  };
};

export default genHorizontalStyle;
