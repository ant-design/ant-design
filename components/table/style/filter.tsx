import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { resetComponent } from '../../_util/theme';
import type { TableToken } from './index';

const genFilterStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-filter-column`]: {
        display: 'flex',
        justifyContent: 'space-between',
      },

      [`${componentCls}-filter-trigger`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        margin: `-4px (-${token.tablePaddingHorizontal}px / 2) -4px 4px`,
        padding: '0 4px',
        color: token.tableHeaderIconColor,
        fontSize: token.fontSizeSM,
        borderRadius: token.radiusBase,
        cursor: 'pointer',
        transition: 'all 0.3s',

        '&:hover': {
          color: token.colorTextSecondary,
          background: token.tableHeaderFilterActiveBg,
        },

        '&.active': {
          color: token.colorPrimary,
        },
      },

      // Dropdown
      [`${componentCls}-filter-dropdown`]: {
        ...resetComponent(token),
        minWidth: '120px',
        backgroundColor: token.tableFilterDropdownBg,
        borderRadius: token.radiusBase,
        boxShadow: token.boxShadow,
      },
    },
  };
};

export default genFilterStyle;
