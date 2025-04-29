import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSize, lineHeight, iconSizeSM } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-label-horizontal`]: {
      [itemCls]: {
        columnGap: token.marginXS,
        marginInlineStart: token.margin,

        [`&${itemCls}:first-child`]: {
          marginInlineStart: 0,
        },

        '&:last-child': {
          flex: '0 1 auto',
        },
      },

      [`${itemCls}-section`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${itemCls}-title`]: {
        flex: '0 1 auto',
      },

      [`${itemCls}-subtitle`]: {
        flex: '0 9999 auto',
      },

      [`${itemCls}-rail`]: {
        flex: 1,
        marginInlineStart: token.margin,
      },
    },
  };
};
export default genLabelPlacementStyle;
