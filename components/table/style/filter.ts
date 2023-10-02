import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

const genFilterStyle: GenerateStyle<TableToken> = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    tableFilterDropdownWidth,
    tableFilterDropdownSearchWidth,
    paddingXXS,
    paddingXS,
    colorText,
    lineWidth,
    lineType,
    tableBorderColor,
    tableHeaderIconColor,
    fontSizeSM,
    tablePaddingHorizontal,
    borderRadius,
    motionDurationSlow,
    colorTextDescription,
    colorPrimary,
    tableHeaderFilterActiveBg,
    colorTextDisabled,
    tableFilterDropdownBg,
    tableFilterDropdownHeight,
    controlItemBgHover,
    controlItemBgActive,
    boxShadowSecondary,
    filterDropdownMenuBg,
  } = token;
  const dropdownPrefixCls = `${antCls}-dropdown`;
  const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
  const treePrefixCls = `${antCls}-tree`;
  const tableBorder = `${lineWidth}px ${lineType} ${tableBorderColor}`;

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
          marginInline: `${paddingXXS}px ${-tablePaddingHorizontal / 2}px`,
          padding: `0 ${paddingXXS}px`,
          color: tableHeaderIconColor,
          fontSize: fontSizeSM,
          borderRadius,
          cursor: 'pointer',
          transition: `all ${motionDurationSlow}`,

          '&:hover': {
            color: colorTextDescription,
            background: tableHeaderFilterActiveBg,
          },

          '&.active': {
            color: colorPrimary,
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
          backgroundColor: tableFilterDropdownBg,
          borderRadius,
          boxShadow: boxShadowSecondary,
          overflow: 'hidden',

          // Reset menu
          [`${dropdownPrefixCls}-menu`]: {
            // https://github.com/ant-design/ant-design/issues/4916
            // https://github.com/ant-design/ant-design/issues/19542
            maxHeight: tableFilterDropdownHeight,
            overflowX: 'hidden',
            border: 0,
            boxShadow: 'none',
            borderRadius: 'unset',
            backgroundColor: filterDropdownMenuBg,

            '&:empty::after': {
              display: 'block',
              padding: `${paddingXS}px 0`,
              color: colorTextDisabled,
              fontSize: fontSizeSM,
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
              backgroundColor: controlItemBgHover,
            },

            [`${treePrefixCls}-treenode-checkbox-checked ${treePrefixCls}-node-content-wrapper`]: {
              '&, &:hover': {
                backgroundColor: controlItemBgActive,
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
                color: colorTextDisabled,
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
            color: colorText,
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
