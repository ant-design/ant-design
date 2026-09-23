import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genPaginationStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, antCls, margin } = token;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Pagination ==========================
      [`${componentCls}-pagination${antCls}-pagination`]: {
        margin: `${unit(margin)} 0`,
      },

      [`${componentCls}-pagination`]: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: token.paddingXS,

        '> *': {
          flex: 'none',
        },
        '&-start': {
          justifyContent: 'flex-start',
        },

        '&-center': {
          justifyContent: 'center',
        },

        '&-end': {
          justifyContent: 'flex-end',
        },

        [`&-sticky${antCls}-pagination`]: {
          position: 'sticky',
          bottom: 0,
          zIndex: token.zIndexTableFixed - 1,
          background: token.colorBgContainer,
          margin: 0,
          paddingTop: unit(margin),
          paddingBottom: unit(margin),
        },
      },
    },
  };
};

export default genPaginationStyle;
