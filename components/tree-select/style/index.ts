import { unit } from '@ant-design/cssinjs';

import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GetDefaultToken,
  CSSUtil,
} from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { TreeSharedToken } from '../../tree/style';
import { genTreeStyle, initComponentToken } from '../../tree/style';

export interface ComponentToken extends TreeSharedToken {}

interface TreeSelectToken extends FullToken<'TreeSelect'> {
  treePrefixCls: string;
}
const disabledStyle = {
  opacity: 0.5,
  cursor: 'not-allowed',
  transition: 'none !important',
};
// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TreeSelectToken> = (token) => {
  const { componentCls, treePrefixCls, colorBgElevated, paddingXS, calc } = token;
  const treeCls = `.${treePrefixCls}`;
  // Pre-calculate padding values.
  const paddingX = unit(paddingXS);
  const paddingY = unit(calc(paddingXS).div(2).equal());

  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${componentCls}-dropdown`]: [
        {
          padding: `${paddingX} ${paddingY}`,
        },

        // ====================== Tree ======================
        genTreeStyle(
          treePrefixCls,
          mergeToken<AliasToken & TreeSharedToken & CSSUtil>(token, {
            colorBgContainer: colorBgElevated,
          }),
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

        // ==================== MaxCount ====================
        {
          '&-max-count-reached': {
            // 直接定位目标元素，避免多层嵌套
            [`${treeCls}-treenode:not(.ant-select-tree-node-selected)`]: {
              [`${treeCls}-checkbox:not(.ant-select-tree-checkbox-checked)`]: disabledStyle,
              [`${treeCls}-checkbox:not(.ant-select-tree-checkbox-checked) + span`]: disabledStyle,
              [`${treeCls}-node-content-wrapper:not(.ant-select-tree-node-content-wrapper-checked):hover`]:
                {
                  backgroundColor: 'transparent',
                },
            },
          },
        },
      ],
    },
  ];
};

export const prepareComponentToken: GetDefaultToken<'TreeSelect'> = initComponentToken;

// ============================== Export ==============================
export default function useTreeSelectStyle(
  prefixCls: string,
  treePrefixCls: string,
  rootCls: string,
) {
  return genStyleHooks(
    'TreeSelect',
    (token) => {
      const treeSelectToken = mergeToken<TreeSelectToken>(token, { treePrefixCls });
      return [genBaseStyle(treeSelectToken)];
    },
    initComponentToken,
  )(prefixCls, rootCls);
}
