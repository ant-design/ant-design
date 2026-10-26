import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc Footer 区域背景色
   * @descEN Background color of Footer
   */
  footerBg: string;
  /**
   * @desc Footer 标题颜色
   * @descEN Title color of Footer
   */
  footerTitleColor: string;
  /**
   * @desc Footer 文本颜色
   * @descEN Text color of Footer
   */
  footerColor: string;
  /**
   * @desc Footer 链接颜色
   * @descEN Link color of Footer
   */
  footerLinkColor: string;
  /**
   * @desc Footer 链接悬停颜色
   * @descEN Link hover color of Footer
   */
  footerLinkHoverColor: string;
  /**
   * @desc Footer 最大宽度
   * @descEN Max width of Footer
   */
  footerMaxWidth: number | string;
  /**
   * @desc Footer 底部边框颜色（暗色主题）
   * @descEN Footer bottom border color (dark theme)
   */
  footerBottomBorderColor: string;
}

interface FooterToken extends FullToken<'Footer'> {
  footerBg: string;
  footerTitleColor: string;
  footerColor: string;
  footerLinkColor: string;
  footerLinkHoverColor: string;
  footerMaxWidth: number | string;
  footerBottomBorderColor: string;
}

// 布局样式
const genLayoutStyle: GenerateStyle<FooterToken, CSSObject> = (token) => {
  const {
    componentCls,
    fontSize,
    lineHeight,
    padding,
    margin,
    marginXS,
    fontSizeLG,
    lineHeightLG,
    fontWeightStrong,
    motionDurationSlow,
    footerBg,
    footerTitleColor,
    footerColor,
    footerLinkColor,
    footerLinkHoverColor,
    footerMaxWidth,
    footerBottomBorderColor,
  } = token;

  return {
    // 根元素 - 暗色主题默认样式
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      clear: 'both',
      color: footerColor,
      fontSize,
      lineHeight,
      backgroundColor: footerBg,

      h2: {
        position: 'relative',
        margin: 0,
        fontWeight: fontWeightStrong,
        color: footerTitleColor,
        fontSize: fontSizeLG,
      },

      a: {
        color: footerLinkColor,
        textDecoration: 'none',
        transition: `color ${motionDurationSlow}`,

        '&:hover': {
          color: footerLinkHoverColor,
        },
      },

      // 上部分容器
      [`${componentCls}-container`]: {
        width: '100%',
        maxWidth: footerMaxWidth,
        margin: '0 auto',
        paddingInline: padding,
        paddingBlock: token.calc(padding).mul(3).equal(),
      },

      // 列容器
      [`${componentCls}-columns`]: {
        display: 'flex',
        justifyContent: 'space-around',

        [`${componentCls}-column`]: {
          marginBottom: unit(margin * 4),

          // 列图标
          [`${componentCls}-column-icon`]: {
            position: 'relative',
            top: -1,
            display: 'inline-block',
            width: 22,
            textAlign: 'center',
            verticalAlign: 'middle',
            marginInlineEnd: marginXS,

            '> span, > svg, img': {
              display: 'block',
              width: '100%',
            },
          },

          // 列项
          [`${componentCls}-item`]: {
            marginBlock: margin,

            // 列项图标
            [`${componentCls}-item-icon`]: {
              position: 'relative',
              top: -1,
              display: 'inline-block',
              width: 16,
              textAlign: 'center',
              verticalAlign: 'middle',
              marginInlineEnd: marginXS,

              '> span, > svg, img': {
                display: 'block',
                width: '100%',
              },
            },

            // 分隔符
            [`${componentCls}-item-separator`]: {
              marginInline: '0.3em',
            },
          },
        },
      },

      // 底部区域
      [`${componentCls}-bottom-container`]: {
        width: '100%',
        maxWidth: footerMaxWidth,
        margin: '0 auto',
        paddingBlock: padding,
        fontSize,
        lineHeight: lineHeightLG,
        textAlign: 'center',
        borderTop: `1px solid ${footerBottomBorderColor}`,
      },

      // 亮色主题
      [`&${componentCls}-light`]: {
        color: token.colorText,
        backgroundColor: 'transparent',

        h2: {
          color: token.colorTextHeading,
        },

        a: {
          color: token.colorText,
          '&:hover': {
            color: token.footerLinkHoverColor,
          },
        },

        [`${componentCls}-bottom-container`]: {
          borderTopColor: token.colorBorder,
        },

        [`${componentCls}-item-separator, ${componentCls}-item-description`]: {
          color: token.colorTextDescription,
        },
      },
    },

    // 响应式
    '@media only screen and (max-width: 767.99px)': {
      [componentCls]: {
        textAlign: 'center',
        [`${componentCls}-container`]: {
          padding: `${unit(padding * 2.5)} 0`,
        },
        [`${componentCls}-columns`]: {
          display: 'block',
        },
        [`${componentCls}-column`]: {
          display: 'block',
          marginBottom: unit(margin * 2.5),

          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Footer'> = (token) => ({
  footerBg: '#000',
  footerTitleColor: '#fff',
  footerColor: 'rgba(255, 255, 255, 0.65)',
  footerLinkColor: 'rgba(255, 255, 255, 0.88)',
  footerLinkHoverColor: token.colorPrimary,
  footerMaxWidth: 1200,
  footerBottomBorderColor: 'rgba(255, 255, 255, 0.15)',
});

// ============================== Export ==============================
export default genStyleHooks('Footer', genLayoutStyle, prepareComponentToken);
