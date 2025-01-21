import type { CSSProperties } from 'react';
import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  /** @deprecated Use headerBg instead */
  colorBgHeader: string;
  /** @deprecated Use bodyBg instead */
  colorBgBody: string;
  /** @deprecated Use triggerBg instead */
  colorBgTrigger: string;

  /**
   * @desc 主体部分背景色
   * @descEN Background Color of body
   */
  bodyBg: string;
  /**
   * @desc 顶部背景色
   * @descEN Background Color of header
   */
  headerBg: string;
  /**
   * @desc 顶部高度
   * @descEN Height of header
   */
  headerHeight: number | string;
  /**
   * @desc 顶部内边距
   * @descEN Padding of header
   */
  headerPadding: CSSProperties['padding'];
  /**
   * @desc 顶部文字颜色
   * @descEN Text color of header
   */
  headerColor: string;
  /**
   * @desc 页脚内边距
   * @descEN Padding of footer
   */
  footerPadding: CSSProperties['padding'];
  /**
   * @desc 页脚背景色
   * @descEN Background Color of footer
   */
  footerBg: string;
  /**
   * @desc 侧边栏背景色
   * @descEN Background Color of sider
   */
  siderBg: string;
  /**
   * @desc 侧边栏开关高度
   * @descEN Height of sider trigger
   */
  triggerHeight: number | string;
  /**
   * @desc 侧边栏开关背景色
   * @descEN Background Color of sider trigger
   */
  triggerBg: string;
  /**
   * @desc 侧边栏开关颜色
   * @descEN Color of sider trigger
   */
  triggerColor: string;
  /**
   * @desc collapse 为 0 时侧边栏开关宽度
   * @descEN Width of sider trigger when collapse is 0
   */
  zeroTriggerWidth: number;
  /**
   * @desc collapse 为 0 时侧边栏开关高度
   * @descEN Height of sider trigger when collapse is 0
   */
  zeroTriggerHeight: number;
  /**
   * @desc 亮色主题侧边栏背景色
   * @descEN Background Color of light theme sider
   */
  lightSiderBg: string;
  /**
   * @desc 亮色主题侧边栏开关背景色
   * @descEN Background Color of light theme sider trigger
   */
  lightTriggerBg: string;
  /**
   * @desc 亮色主题侧边栏开关颜色
   * @descEN Color of light theme sider trigger
   */
  lightTriggerColor: string;
}

export interface LayoutToken extends FullToken<'Layout'> {}

const genLayoutStyle: GenerateStyle<LayoutToken, CSSObject> = (token) => {
  const {
    antCls, // .ant
    componentCls, // .ant-layout
    colorText,
    footerBg,
    headerHeight,
    headerPadding,
    headerColor,
    footerPadding,
    fontSize,
    bodyBg,
    headerBg,
  } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',

      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: bodyBg,

      '&, *': {
        boxSizing: 'border-box',
      },

      [`&${componentCls}-has-sider`]: {
        flexDirection: 'row',
        [`> ${componentCls}, > ${componentCls}-content`]: {
          // https://segmentfault.com/a/1190000019498300
          width: 0,
        },
      },

      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: '0 0 auto',
      },

      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },

    // ==================== Header ====================
    [`${componentCls}-header`]: {
      height: headerHeight,
      padding: headerPadding,
      color: headerColor,
      lineHeight: unit(headerHeight),
      background: headerBg,

      // Other components/menu/style/index.less line:686
      // Integration with header element so menu items have the same height
      [`${antCls}-menu`]: {
        lineHeight: 'inherit',
      },
    },

    // ==================== Footer ====================
    [`${componentCls}-footer`]: {
      padding: footerPadding,
      color: colorText,
      fontSize,
      background: footerBg,
    },

    // =================== Content ====================
    [`${componentCls}-content`]: {
      flex: 'auto',
      color: colorText,

      // fix firefox can't set height smaller than content on flex item
      minHeight: 0,
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Layout'> = (token) => {
  const {
    colorBgLayout,
    controlHeight,
    controlHeightLG,
    colorText,
    controlHeightSM,
    marginXXS,
    colorTextLightSolid,
    colorBgContainer,
  } = token;

  const paddingInline = controlHeightLG * 1.25;

  return {
    // Deprecated
    colorBgHeader: '#001529',
    colorBgBody: colorBgLayout,
    colorBgTrigger: '#002140',

    bodyBg: colorBgLayout,
    headerBg: '#001529',
    headerHeight: controlHeight * 2,
    headerPadding: `0 ${paddingInline}px`,
    headerColor: colorText,
    footerPadding: `${controlHeightSM}px ${paddingInline}px`,
    footerBg: colorBgLayout,
    siderBg: '#001529',
    triggerHeight: controlHeightLG + marginXXS * 2,
    triggerBg: '#002140',
    triggerColor: colorTextLightSolid,
    zeroTriggerWidth: controlHeightLG,
    zeroTriggerHeight: controlHeightLG,
    lightSiderBg: colorBgContainer,
    lightTriggerBg: colorBgContainer,
    lightTriggerColor: colorText,
  };
};

// ============================== Export ==============================
export const DEPRECATED_TOKENS: [keyof ComponentToken, keyof ComponentToken][] = [
  ['colorBgBody', 'bodyBg'],
  ['colorBgHeader', 'headerBg'],
  ['colorBgTrigger', 'triggerBg'],
];

export default genStyleHooks('Layout', (token) => [genLayoutStyle(token)], prepareComponentToken, {
  deprecatedTokens: DEPRECATED_TOKENS,
});
