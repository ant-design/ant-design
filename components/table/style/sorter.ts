import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genSorterStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const { componentCls, marginXXS, fontSizeIcon, headerIconColor, headerIconHoverColor } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
        outline: 'none',
        cursor: 'pointer',
        // why left 0s? Avoid column header move with transition when left is changed
        // https://github.com/ant-design/ant-design/issues/50588
        transition: `all ${token.motionDurationSlow}, left 0s`,

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

      [`${componentCls}-thead th${componentCls}-column-sort`]: {
        background: token.tableHeaderSortBg,

        '&::before': {
          backgroundColor: 'transparent !important',
        },
      },

      [`td${componentCls}-column-sort`]: {
        background: token.tableBodySortBg,
      },

      [`${componentCls}-column-title`]: {
        position: 'relative',
        zIndex: 1,
        flex: 1,
      },

      [`${componentCls}-column-sorters`]: {
        display: 'flex',
        flex: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',

        '&::after': {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          content: '""',
        },
      },

      [`${componentCls}-column-sorters-tooltip-target-sorter`]: {
        '&::after': {
          content: 'none',
        },
      },

      [`${componentCls}-column-sorter`]: {
        marginInlineStart: marginXXS,
        color: headerIconColor,
        fontSize: 0,
        transition: `color ${token.motionDurationSlow}`,

        '&-inner': {
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
        },

        '&-up, &-down': {
          fontSize: fontSizeIcon,

          '&.active': {
            color: token.colorPrimary,
          },
        },

        [`${componentCls}-column-sorter-up + ${componentCls}-column-sorter-down`]: {
          marginTop: '-0.3em',
        },
      },

      [`${componentCls}-column-sorters:hover ${componentCls}-column-sorter`]: {
        color: headerIconHoverColor,
      },
    },
  };
};

export default genSorterStyle;
