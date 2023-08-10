import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 选择器宽度
   * @descEN Width of Cascader
   */
  controlWidth: number;
  /**
   * @desc 选项宽度
   * @descEN Width of item
   */
  controlItemWidth: number;
  /**
   * @desc 下拉菜单高度
   * @descEN Height of dropdown
   */
  dropdownHeight: number;
}

type CascaderToken = FullToken<'Cascader'>;

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<CascaderToken> = (token) => {
  const { prefixCls, componentCls, antCls } = token;
  const cascaderMenuItemCls = `${componentCls}-menu-item`;
  const iconCls = `
    &${cascaderMenuItemCls}-expand ${cascaderMenuItemCls}-expand-icon,
    ${cascaderMenuItemCls}-loading-icon
  `;

  const itemPaddingVertical = Math.round(
    (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  );

  return [
    // =====================================================
    // ==                     Control                     ==
    // =====================================================
    {
      [componentCls]: {
        width: token.controlWidth,
      },
    },
    // =====================================================
    // ==                      Popup                      ==
    // =====================================================
    {
      [`${componentCls}-dropdown`]: [
        // ==================== Checkbox ====================
        getCheckboxStyle(`${prefixCls}-checkbox`, token),
        {
          [`&${antCls}-select-dropdown`]: {
            padding: 0,
          },
        },
        {
          [componentCls]: {
            // ================== Checkbox ==================
            '&-checkbox': {
              top: 0,
              marginInlineEnd: token.paddingXS,
            },

            // ==================== Menu ====================
            // >>> Menus
            '&-menus': {
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'flex-start',

              [`&${componentCls}-menu-empty`]: {
                [`${componentCls}-menu`]: {
                  width: '100%',
                  height: 'auto',

                  [cascaderMenuItemCls]: {
                    color: token.colorTextDisabled,
                  },
                },
              },
            },

            // >>> Menu
            '&-menu': {
              flexGrow: 1,
              minWidth: token.controlItemWidth,
              height: token.dropdownHeight,
              margin: 0,
              padding: token.paddingXXS,
              overflow: 'auto',
              verticalAlign: 'top',
              listStyle: 'none',
              '-ms-overflow-style': '-ms-autohiding-scrollbar', // https://github.com/ant-design/ant-design/issues/11857

              '&:not(:last-child)': {
                borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              },

              '&-item': {
                ...textEllipsis,
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                padding: `${itemPaddingVertical}px ${token.paddingSM}px`,
                lineHeight: token.lineHeight,
                cursor: 'pointer',
                transition: `all ${token.motionDurationMid}`,
                borderRadius: token.borderRadiusSM,

                '&:hover': {
                  background: token.controlItemBgHover,
                },
                '&-disabled': {
                  color: token.colorTextDisabled,
                  cursor: 'not-allowed',

                  '&:hover': {
                    background: 'transparent',
                  },

                  [iconCls]: {
                    color: token.colorTextDisabled,
                  },
                },

                [`&-active:not(${cascaderMenuItemCls}-disabled)`]: {
                  [`&, &:hover`]: {
                    fontWeight: token.fontWeightStrong,
                    backgroundColor: token.controlItemBgActive,
                  },
                },

                '&-content': {
                  flex: 'auto',
                },

                [iconCls]: {
                  marginInlineStart: token.paddingXXS,
                  color: token.colorTextDescription,
                  fontSize: token.fontSizeIcon,
                },

                '&-keyword': {
                  color: token.colorHighlight,
                },
              },
            },
          },
        },
      ],
    },
    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-dropdown-rtl`]: {
        direction: 'rtl',
      },
    },
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Cascader', (token) => [genBaseStyle(token)], {
  controlWidth: 184,
  controlItemWidth: 111,
  dropdownHeight: 180,
});
