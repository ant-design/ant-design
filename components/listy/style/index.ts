import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @nameZH 列表项纵向内间距
   * @nameEN Item Vertical Padding
   * @desc 列表项的纵向内间距。
   * @descEN Vertical padding of a list item.
   */
  itemPaddingBlock: number;
  /**
   * @nameZH 列表项横向内间距
   * @nameEN Item Horizontal Padding
   * @desc 列表项的横向内间距。
   * @descEN Horizontal padding of a list item.
   */
  itemPaddingInline: number;
}

type ListyToken = FullToken<'Listy'>;

const genListyStyle: GenerateStyle<ListyToken, CSSObject> = (token) => {
  const { componentCls, itemPaddingBlock, itemPaddingInline } = token;

  return {
    [componentCls]: {
      position: 'relative',
      color: token.colorText,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,

      // ======================== Item ========================
      [`${componentCls}-item`]: {
        boxSizing: 'border-box',
        padding: `${unit(itemPaddingBlock)} ${unit(itemPaddingInline)}`,
        borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        transition: `background-color ${token.motionDurationMid} ${token.motionEaseInOut}`,

        '&:hover': {
          backgroundColor: token.controlItemBgHover,
        },
      },

      // ==================== Group header ====================
      [`${componentCls}-group-header`]: {
        boxSizing: 'border-box',
        padding: `${unit(token.paddingXS)} ${unit(itemPaddingInline)}`,
        color: token.colorTextDescription,
        fontWeight: token.fontWeightStrong,
        backgroundColor: token.colorBgContainer,
        backgroundImage: `linear-gradient(${token.colorFillAlter}, ${token.colorFillAlter})`,

        '&-sticky': {
          position: 'sticky',
          top: 0,
          insetInline: 0,
          zIndex: 1,
        },

        '&-fixed': {
          position: 'absolute',
          top: 0,
          insetInline: 0,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        },

        '&-holder': {
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        },
      },

      [`${componentCls}-group-section`]: {
        position: 'relative',
      },

      [`${componentCls}-scrollbar`]: {
        zIndex: 1,
      },

      // ========================= RTL ========================
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Listy'> = (token) => ({
  itemPaddingBlock: token.paddingSM,
  itemPaddingInline: token.padding,
});

export default genStyleHooks('Listy', genListyStyle, prepareComponentToken);
