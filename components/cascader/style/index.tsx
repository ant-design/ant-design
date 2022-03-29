// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../empty/style';
// import '../../select/style';

// // deps-lint-skip: form

// deps-lint-skip-all
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';

export interface ComponentToken {
  controlWidth: number;
  controlItemWidth: number;
  dropdownHeight: number;
}

interface CascaderToken extends DerivativeToken, ComponentToken {
  prefixCls: string;
  cascaderCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<CascaderToken> = (token, hashId) => {
  const { prefixCls, cascaderCls } = token;
  const cascaderMenuItemCls = `${cascaderCls}-menu-item`;
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
      [cascaderCls]: {
        width: token.controlWidth,
      },
    },

    // =====================================================
    // ==                      Popup                      ==
    // =====================================================
    {
      [`${cascaderCls}-dropdown`]: [
        // ==================== Checkbox ====================
        getCheckboxStyle(`${prefixCls}-checkbox`, token, hashId!),
        {
          [cascaderCls]: {
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

              [`&${cascaderCls}-menu-empty`]: {
                [`${cascaderCls}-menu`]: {
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
      [`${cascaderCls}-dropdown-rtl`]: {
        direction: 'rtl',
      },
    },
  ];
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { Cascader = {} } = token;

      const cascaderToken: CascaderToken = {
        ...token,
        prefixCls,
        cascaderCls: `.${prefixCls}`,

        controlWidth: 184,
        controlItemWidth: 111,
        dropdownHeight: 180,

        // Override
        ...Cascader,
      };

      return [genBaseStyle(cascaderToken, hashId)];
    }),
    hashId,
  ];
}
