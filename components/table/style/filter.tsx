import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { resetComponent } from '../../_util/theme';
import type { TableToken } from './index';

const genFilterStyle: GenerateStyle<TableToken, CSSInterpolation> = token => {
  const {
    componentCls,
    antCls,
    iconCls,
    tableFilterDropdownWidth,
    tableFilterDropdownSearchWidth,
    paddingXXS,
    paddingXS,
    lineWidth,
  } = token;
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
          marginBlock: -paddingXXS,
          marginInline: `${paddingXXS}px ${-token.tablePaddingHorizontal / 2}px`,
          padding: `0 ${paddingXXS}px`,
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

          minWidth: tableFilterDropdownWidth,
          backgroundColor: token.tableFilterDropdownBg,
          borderRadius: token.radiusBase,
          boxShadow: token.boxShadow,

          // Reset menu
          [`${dropdownPrefixCls}-menu`]: {
            // https://github.com/ant-design/ant-design/issues/4916
            // https://github.com/ant-design/ant-design/issues/19542
            maxHeight: token.tableFilterDropdownHeight,
            overflowX: 'hidden',
            border: 0,
            boxShadow: 'none',

            '&:empty::after': {
              display: 'block',
              padding: `${paddingXS}px 0`,
              color: token.colorTextDisabled,
              fontSize: token.fontSizeSM,
              textAlign: 'center',
              content: '"Not Found"',
            },
          },

          [`${tableFilterDropdownPrefixCls}-tree`]: {
            paddingBlock: `${paddingXS}px 0`,
            paddingInline: paddingXS,

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
            padding: paddingXS,
            borderBottom: tableBorder,

            '&-input': {
              input: {
                minWidth: tableFilterDropdownSearchWidth,
              },
              [iconCls]: {
                color: token.colorTextDisabled,
              },
            },
          },

          [`${tableFilterDropdownPrefixCls}-checkall`]: {
            width: '100%',
            marginBottom: paddingXXS,
            marginInlineStart: paddingXXS,
          },

          // Operation
          [`${tableFilterDropdownPrefixCls}-btns`]: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${paddingXS - lineWidth}px ${paddingXS}px`,
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
            paddingInlineStart: paddingXS,
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
