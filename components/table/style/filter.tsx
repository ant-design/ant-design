import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { resetComponent } from '../../_util/theme';
import type { TableToken } from './index';

const genFilterStyle: GenerateStyle<TableToken, CSSInterpolation> = token => {
  const { componentCls, antCls, iconCls } = token;
  const dropdownPrefixCls = `${antCls}-dropdown`;
  const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
  const treePrefixCls = `${antCls}-tree`;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;

  return [
    {
      [`${componentCls}-wrapper`]: {
        [`${componentCls}-filter-column`]: {
          display: 'flex',
          justifyContent: 'space-between',
        },

        [`${componentCls}-filter-trigger`]: {
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          margin: `-4px ${-token.tablePaddingHorizontal / 2}px -4px 4px`,
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
      },
    },
    {
      // Dropdown
      [tableFilterDropdownPrefixCls]: {
        ...resetComponent(token),
        minWidth: '120px',
        backgroundColor: token.tableFilterDropdownBg,
        borderRadius: token.radiusBase,
        boxShadow: token.boxShadow,

        // Reset menu
        [`${dropdownPrefixCls}-menu`]: {
          // https://github.com/ant-design/ant-design/issues/4916
          // https://github.com/ant-design/ant-design/issues/19542
          maxHeight: token.tableFilterDropdownMaxHeight,
          overflowX: 'hidden',
          border: 0,
          boxShadow: 'none',
          padding: 0,

          '&:empty::after': {
            display: 'block',
            padding: '8px 0',
            color: token.colorTextDisabled,
            fontSize: token.fontSizeSM,
            textAlign: 'center',
            content: '"Not Found"',
          },
        },

        [`${tableFilterDropdownPrefixCls}-tree`]: {
          padding: '8px 8px 0',

          [`${treePrefixCls}-treenode ${treePrefixCls}-node-content-wrapper:hover`]: {
            backgroundColor: token.controlItemBgHover,
          },

          [`${treePrefixCls}-treenode-checkbox-checked ${treePrefixCls}-node-content-wrapper`]: {
            '&, &:hover': {
              backgroundColor: token.colorPrimaryActive,
            },
          },
        },

        [`${tableFilterDropdownPrefixCls}-search`]: {
          padding: '8px',
          borderBottom: tableBorder,

          '&-input': {
            input: {
              // FIXME
              minWidth: '140px',
            },
            [iconCls]: {
              color: token.colorTextDisabled,
            },
          },
        },

        [`${tableFilterDropdownPrefixCls}-checkall`]: {
          width: '100%',
          marginBottom: '4px',
          marginLeft: '4px',
        },

        // Operation
        [`${tableFilterDropdownPrefixCls}-btns`]: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '7px 8px',
          overflow: 'hidden',
          backgroundColor: 'inherit',
          borderTop: tableBorder,
        },
      },

      // submenu of table filter dropdown
      [`${tableFilterDropdownPrefixCls}, ${tableFilterDropdownPrefixCls}-submenu`]: {
        // Checkbox
        [`${antCls}-checkbox-wrapper + span`]: {
          paddingLeft: 8,
          color: token.colorText,
        },
      },

      [`${tableFilterDropdownPrefixCls}-submenu > ul`]: {
        maxHeight: 'calc(100vh - 130px)',
        overflowX: 'hidden',
        overflowY: 'auto',
      },
    },
  ];
};

export default genFilterStyle;
