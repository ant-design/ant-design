// import '../../style/index.less';
// import './index.less';

// // style dependencies
// // deps-lint-skip: tree, form
// import '../../select/style';
// import '../../empty/style';

// deps-lint-skip-all
import { GenerateStyle, genComponentStyleHook, FullToken } from '../../_util/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { genTreeStyle } from '../../tree/style';

interface TreeSelectToken extends FullToken<'TreeSelect'> {
  treeCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TreeSelectToken> = (token, hashId) => {
  const { componentCls, treeCls } = token;

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
        genTreeStyle(treeCls, token, hashId!),
        {
          [treeCls]: {
            borderRadius: 0,
            '&-list-holder-inner': {
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
        getCheckboxStyle(`${treeCls}-checkbox`, token, hashId!),

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
  return genComponentStyleHook('TreeSelect', (token, { hashId }) => {
    const treeSelectToken: TreeSelectToken = {
      ...token,
      treeCls: `.${treePrefixCls}`,
    };
    return [genBaseStyle(treeSelectToken, hashId)];
  })(prefixCls);
}
