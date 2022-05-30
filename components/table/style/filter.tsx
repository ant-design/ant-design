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
          marginBlock: -token.paddingXXS,
          marginInline: `${token.paddingXXS}px ${-token.tablePaddingHorizontal / 2}px`,
          padding: `0 ${token.paddingXXS}px`,
          color: token.tableHeaderIconColor,
          fontSize: token.fontSizeSM,
          borderRadius: token.radiusBase,
          cursor: 'pointer',
          transition: `all ${token.motionDurationSlow}`,

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
      [`${antCls}-dropdown`]: {
        [tableFilterDropdownPrefixCls]: {
          ...resetComponent(token),
          // FIXME
          minWidth: 120,
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

            '&:empty::after': {
              display: 'block',
              padding: `${token.paddingXS}px 0`,
              color: token.colorTextDisabled,
              fontSize: token.fontSizeSM,
              textAlign: 'center',
              content: '"Not Found"',
            },
          },

          [`${tableFilterDropdownPrefixCls}-tree`]: {
            paddingBlock: `${token.paddingXS}px 0`,
            paddingInline: token.paddingXS,

            [treePrefixCls]: {
              padding: 0,
            },

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
            padding: token.paddingXS,
            borderBottom: tableBorder,

            '&-input': {
              input: {
                // FIXME
                minWidth: 140,
              },
              [iconCls]: {
                color: token.colorTextDisabled,
              },
            },
          },

          [`${tableFilterDropdownPrefixCls}-checkall`]: {
            width: '100%',
            marginBottom: token.paddingXXS,
            marginInlineStart: token.paddingXXS,
          },

          // Operation
          [`${tableFilterDropdownPrefixCls}-btns`]: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${token.paddingXS - 1}px ${token.paddingXS}px`,
            overflow: 'hidden',
            backgroundColor: 'inherit',
            borderTop: tableBorder,
          },
        },
      },
    },
    // Dropdown Menu & SubMenu
    {
      // submenu of table filter dropdown
      [`${antCls}-dropdown ${tableFilterDropdownPrefixCls}, ${tableFilterDropdownPrefixCls}-submenu`]:
        {
          // Checkbox
          [`${antCls}-checkbox-wrapper + span`]: {
            paddingInlineStart: token.paddingXS,
            color: token.colorText,
          },

          [`> ul`]: {
            maxHeight: 'calc(100vh - 130px)',
            overflowX: 'hidden',
            overflowY: 'auto',
          },
        },
    },
  ];
};

export default genFilterStyle;
