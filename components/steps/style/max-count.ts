import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genMaxCountStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-max-count`]: {
      [`${itemCls}-ellipsis`]: {
        [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
          color: token.colorTextDescription,
        },
      },
    },
  };
};

export default genMaxCountStyle;
