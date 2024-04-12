import { unit } from '@ant-design/cssinjs';

import type { PaginationToken } from '.';
import { prepareComponentToken, prepareToken } from '.';
import type { GenerateStyle } from '../../theme/interface';
import { genSubStyleComponent } from '../../theme/util/genComponentStyleHook';

const genBorderedStyle: GenerateStyle<PaginationToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}${componentCls}-bordered${componentCls}-disabled:not(${componentCls}-mini)`]: {
      '&, &:hover': {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder,
        },
      },

      '&:focus-visible': {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder,
        },
      },

      [`${componentCls}-item, ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,

        [`&:hover:not(${componentCls}-item-active)`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,

          a: {
            color: token.colorTextDisabled,
          },
        },

        [`&${componentCls}-item-active`]: {
          backgroundColor: token.itemActiveBgDisabled,
        },
      },

      [`${componentCls}-prev, ${componentCls}-next`]: {
        '&:hover button': {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          color: token.colorTextDisabled,
        },

        [`${componentCls}-item-link`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
        },
      },
    },

    [`${componentCls}${componentCls}-bordered:not(${componentCls}-mini)`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        '&:hover button': {
          borderColor: token.colorPrimaryHover,
          backgroundColor: token.itemBg,
        },

        [`${componentCls}-item-link`]: {
          backgroundColor: token.itemLinkBg,
          borderColor: token.colorBorder,
        },

        [`&:hover ${componentCls}-item-link`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          color: token.colorPrimary,
        },

        [`&${componentCls}-disabled`]: {
          [`${componentCls}-item-link`]: {
            borderColor: token.colorBorder,
            color: token.colorTextDisabled,
          },
        },
      },

      [`${componentCls}-item`]: {
        backgroundColor: token.itemBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,

        [`&:hover:not(${componentCls}-item-active)`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,

          a: {
            color: token.colorPrimary,
          },
        },

        '&-active': {
          borderColor: token.colorPrimary,
        },
      },
    },
  };
};

export default genSubStyleComponent(
  ['Pagination', 'bordered'],
  (token) => {
    const paginationToken = prepareToken(token);

    return [genBorderedStyle(paginationToken)];
  },
  prepareComponentToken,
);
