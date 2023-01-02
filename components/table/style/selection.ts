import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genSelectionStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    fontSizeIcon,
    paddingXS,
    tableHeaderIconColor,
    tableHeaderIconColorHover,
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Selections ==========================
      [`${componentCls}-selection-col`]: {
        width: token.tableSelectionColumnWidth,
      },

      [`${componentCls}-bordered ${componentCls}-selection-col`]: {
        width: token.tableSelectionColumnWidth + paddingXS * 2,
      },

      [`
        table tr th${componentCls}-selection-column,
        table tr td${componentCls}-selection-column
      `]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS,
        textAlign: 'center',

        [`${antCls}-radio-wrapper`]: {
          marginInlineEnd: 0,
        },
      },

      [`table tr th${componentCls}-selection-column${componentCls}-cell-fix-left`]: {
        zIndex: token.zIndexTableFixed + 1,
      },

      [`table tr th${componentCls}-selection-column::after`]: {
        backgroundColor: 'transparent !important',
      },

      [`${componentCls}-selection`]: {
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
      },

      [`${componentCls}-selection-extra`]: {
        position: 'absolute',
        top: 0,
        zIndex: 1,
        cursor: 'pointer',
        transition: `all ${token.motionDurationSlow}`,
        marginInlineStart: '100%',
        paddingInlineStart: `${token.tablePaddingHorizontal / 4}px`,

        [iconCls]: {
          color: tableHeaderIconColor,
          fontSize: fontSizeIcon,
          verticalAlign: 'baseline',

          '&:hover': {
            color: tableHeaderIconColorHover,
          },
        },
      },
    },
  };
};

export default genSelectionStyle;
