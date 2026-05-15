import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genLabelDisplayStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-label-wrap`]: {
      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
        overflow: 'visible',
        textOverflow: 'unset',
        whiteSpace: 'normal',
      },
    },

    [`${componentCls}${componentCls}-label-scroll`]: {
      overflowX: 'auto',
      overflowY: 'hidden',

      [`> ${itemCls}`]: {
        flex: 'none',
        minWidth: 'max-content',
      },

      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
        whiteSpace: 'nowrap',
      },
    },
  };
};

export default genLabelDisplayStyle;
