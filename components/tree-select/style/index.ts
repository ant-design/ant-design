import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import type { AliasToken, FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { TreeSharedToken } from '../../tree/style';
import { genTreeStyle, initComponentToken } from '../../tree/style';

export interface ComponentToken extends TreeSharedToken {}

interface TreeSelectToken extends FullToken<'TreeSelect'> {
  treePrefixCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TreeSelectToken> = (token) => {
  const { componentCls, treePrefixCls, colorBgElevated } = token;
  const treeCls = `.${treePrefixCls}`;

  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${componentCls}-dropdown`]: [
        {
          padding: `${token.paddingXS}px ${token.paddingXS / 2}px`,
        },

        // ====================== Tree ======================
        genTreeStyle(
          treePrefixCls,
          mergeToken<AliasToken & TreeSharedToken>(token, { colorBgContainer: colorBgElevated }),
        ),
        {
          [treeCls]: {
            borderRadius: 0,
            [`${treeCls}-list-holder-inner`]: {
              alignItems: 'stretch',

              [`${treeCls}-treenode`]: {
                [`${treeCls}-node-content-wrapper`]: {
                  flex: 'auto',
                },
              },
            },
          },
        },

        // ==================== Checkbox ====================
        getCheckboxStyle(`${treePrefixCls}-checkbox`, token),

        // ====================== RTL =======================
        {
          '&-rtl': {
            direction: 'rtl',

            [`${treeCls}-switcher${treeCls}-switcher_close`]: {
              [`${treeCls}-switcher-icon svg`]: {
                transform: 'rotate(90deg)',
              },
            },
          },
        },
      ],
    },
  ];
};

// ============================== Export ==============================
export default function useTreeSelectStyle(prefixCls: string, treePrefixCls: string) {
  return genComponentStyleHook(
    'TreeSelect',
    (token) => {
      const treeSelectToken = mergeToken<TreeSelectToken>(token, { treePrefixCls });
      return [genBaseStyle(treeSelectToken)];
    },
    initComponentToken,
  )(prefixCls);
}
