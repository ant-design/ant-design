// import '../../style/index.less';
// import './index.less';

// // style dependencies
// // deps-lint-skip: tree, form
// import '../../select/style';
// import '../../empty/style';

// deps-lint-skip-all
import { CSSInterpolation } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
} from '../../_util/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { genTreeStyle } from '../../tree/style';

interface TreeSelectToken extends DerivativeToken {
  selectCls: string;
  treePrefixCls: string;
}

// =============================== Base ===============================
const genBaseStyle = (token: TreeSelectToken, hashId: string): CSSInterpolation => {
  const { selectCls, treePrefixCls } = token;
  const treeCls = `.${treePrefixCls}`;

  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${selectCls}-dropdown`]: [
        {
          padding: `${token.paddingXS}px ${token.paddingXS / 2}px`,
        },

        // ====================== Tree ======================
        genTreeStyle(treePrefixCls, token, hashId),
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
        getCheckboxStyle(`${treePrefixCls}-checkbox`, token, hashId),

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
export default function useStyle(
  prefixCls: string,
  treePrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const treeSelectToken: TreeSelectToken = {
    ...token,
    selectCls: `.${prefixCls}`,
    treePrefixCls,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(treeSelectToken, hashId),
    ]),
    hashId,
  ];
}
