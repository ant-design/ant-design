import type { CSSProperties } from 'react';

import { genCompactItemStyle } from '../../style/compact-item';
import type { GlobalToken } from '../../theme';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';
import getColumnsStyle from './columns';

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
  /**
   * @desc 选项选中时背景色
   * @descEN Background color of selected item
   */
  optionSelectedBg: string;
  /**
   * @desc 选项选中时字重
   * @descEN Font weight of selected item
   */
  optionSelectedFontWeight: CSSProperties['fontWeight'];
  /**
   * @desc 选项内间距
   * @descEN Padding of menu item
   */
  optionPadding: CSSProperties['padding'];
  /**
   * @desc 选项菜单（单列）内间距
   * @descEN Padding of menu item (single column)
   */
  menuPadding: CSSProperties['padding'];
}

export type CascaderToken = FullToken<'Cascader'>;

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<CascaderToken> = (token) => {
  const { componentCls, antCls } = token;

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
        {
          [`&${antCls}-select-dropdown`]: {
            padding: 0,
          },
        },
        getColumnsStyle(token),
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
export const prepareComponentToken = (token: GlobalToken) => {
  const itemPaddingVertical = Math.round(
    (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  );

  return {
    controlWidth: 184,
    controlItemWidth: 111,
    dropdownHeight: 180,
    optionSelectedBg: token.controlItemBgActive,
    optionSelectedFontWeight: token.fontWeightStrong,
    optionPadding: `${itemPaddingVertical}px ${token.paddingSM}px`,
    menuPadding: token.paddingXXS,
  };
};

export default genComponentStyleHook(
  'Cascader',
  (token) => [genBaseStyle(token)],
  prepareComponentToken,
);
