import type { CSSProperties } from 'react';

import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle, GlobalToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';
import getColumnsStyle from './columns';

export interface ComponentToken {
  /**
   * @desc 选择器宽度
   * @descEN Width of Cascader
   */
  controlWidth: number | string;
  /**
   * @desc 选项宽度
   * @descEN Width of item
   */
  controlItemWidth: number | string;
  /**
   * @desc 下拉菜单高度
   * @descEN Height of dropdown
   */
  dropdownHeight: number | string;
  /**
   * @desc 选项选中时背景色
   * @descEN Background color of selected item
   */
  optionSelectedBg: string;
  /**
   * @desc 选项选中时文本颜色
   * @descEN Text color when option is selected
   */
  optionSelectedColor: string;
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
          // Right-aligned placement anchors the popup's right edge to the trigger.
          // Reverse the column order so newly expanded child columns grow leftwards
          // and the parent column stays fixed, avoiding the parent shifting/jittering.
          // Only apply in LTR: in RTL `direction: rtl` already lays columns out
          // right-to-left, so reversing again would flip the layout incorrectly.
          [`&${antCls}-select-dropdown-placement-bottomRight:not(${componentCls}-dropdown-rtl),
            &${antCls}-select-dropdown-placement-topRight:not(${componentCls}-dropdown-rtl)`]: {
            [`${componentCls}-menus`]: {
              flexDirection: 'row-reverse',
            },
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
export const prepareComponentToken = (token: GlobalToken): ComponentToken => {
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
    optionSelectedColor: token.colorText,
  };
};

export default genStyleHooks('Cascader', genBaseStyle, prepareComponentToken, {
  resetFont: false,
  unitless: {
    optionSelectedFontWeight: true,
  },
});
