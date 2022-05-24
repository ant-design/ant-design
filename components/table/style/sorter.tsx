import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genSorterStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
        outline: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',

        '&:hover': {
          background: token.tableHeaderSortHoverBg,

          '&::before': {
            backgroundColor: 'transparent !important',
          },
        },

        '&:focus-visible': {
          color: token.colorPrimary,
        },

        // https://github.com/ant-design/ant-design/issues/30969
        [`
          &${componentCls}-cell-fix-left:hover,
          &${componentCls}-cell-fix-right:hover
        `]: {
          background: token.tableFixedHeaderSortActiveBg,
        },
      },

      [`&-thead th${componentCls}-column-sort`]: {
        background: token.tableHeaderSortBg,

        '&::before': {
          backgroundColor: 'transparent !important',
        },
      },
    },
  };
};

export default genSorterStyle;
