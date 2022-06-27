// deps-lint-skip-all
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook } from '../../theme';

export interface ComponentToken {
  controlWidth: number;
  controlItemWidth: number;
  dropdownHeight: number;
}

type CascaderToken = FullToken<'Cascader'>;

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<CascaderToken> = token => {
  const { prefixCls, componentCls } = token;
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
                    cursor: 'default',
                    pointerEvents: 'none',
                  },
                },
              },
            },

            // >>> Menu
            '&-menu': {
              flexGrow: 1,
              minWidth: token.controlItemWidth,
              height: token.dropdownHeight,
              margin: `-${token.paddingXS}px 0`,
              padding: `${token.paddingXS}px 0`,
              overflow: 'auto',
              verticalAlign: 'top',
              listStyle: 'none',
              borderInlineEnd: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorSplit}`,
              '-ms-overflow-style': '-ms-autohiding-scrollbar', // https://github.com/ant-design/ant-design/issues/11857

              '&-item': {
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                padding: `${itemPaddingVertical}px ${token.paddingSM}px`,
                overflow: 'hidden',
                lineHeight: token.lineHeight,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
                transition: `all ${token.motionDurationSlow}`,

                '&:hover': {
                  background: token.controlItemBgHover,
                },
                ' &-disabled': {
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
                  color: token.colorTextSecondary,
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
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Cascader', token => [genBaseStyle(token)], {
  controlWidth: 184,
  controlItemWidth: 111,
  dropdownHeight: 180,
});
