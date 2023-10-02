import type { CSSObject } from '@ant-design/cssinjs';
import { genFocusStyle, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 面包屑项文字颜色
   * @descEN Text color of Breadcrumb item
   */
  itemColor: string;
  /**
   * @desc 图标大小
   * @descEN Icon size
   */
  iconFontSize: number;
  /**
   * @desc 链接文字颜色
   * @descEN Text color of link
   */
  linkColor: string;
  /**
   * @desc 链接文字悬浮颜色
   * @descEN Color of hovered link
   */
  linkHoverColor: string;
  /**
   * @desc 最后一项文字颜色
   * @descEN Text color of the last item
   */
  lastItemColor: string;
  /**
   * @desc 分隔符外间距
   * @descEN Margin of separator
   */
  separatorMargin: number;
  /**
   * @desc 分隔符颜色
   * @descEN Color of separator
   */
  separatorColor: string;
}

interface BreadcrumbToken extends FullToken<'Breadcrumb'> {}

const genBreadcrumbStyle: GenerateStyle<BreadcrumbToken, CSSObject> = (token) => {
  const { componentCls, iconCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      color: token.itemColor,
      fontSize: token.fontSize,

      [iconCls]: {
        fontSize: token.iconFontSize,
      },

      ol: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      a: {
        color: token.linkColor,
        transition: `color ${token.motionDurationMid}`,
        padding: `0 ${token.paddingXXS}px`,
        borderRadius: token.borderRadiusSM,
        height: token.lineHeight * token.fontSize,
        display: 'inline-block',
        marginInline: -token.marginXXS,

        '&:hover': {
          color: token.linkHoverColor,
          backgroundColor: token.colorBgTextHover,
        },

        ...genFocusStyle(token),
      },

      [`li:last-child`]: {
        color: token.lastItemColor,
      },

      [`${componentCls}-separator`]: {
        marginInline: token.separatorMargin,
        color: token.separatorColor,
      },

      [`${componentCls}-link`]: {
        [`
          > ${iconCls} + span,
          > ${iconCls} + a
        `]: {
          marginInlineStart: token.marginXXS,
        },
      },

      [`${componentCls}-overlay-link`]: {
        borderRadius: token.borderRadiusSM,
        height: token.lineHeight * token.fontSize,
        display: 'inline-block',
        padding: `0 ${token.paddingXXS}px`,
        marginInline: -token.marginXXS,

        [`> ${iconCls}`]: {
          marginInlineStart: token.marginXXS,
          fontSize: token.fontSizeIcon,
        },

        '&:hover': {
          color: token.linkHoverColor,
          backgroundColor: token.colorBgTextHover,

          a: {
            color: token.linkHoverColor,
          },
        },

        a: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },

      // rtl style
      [`&${token.componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Breadcrumb',
  (token) => {
    const BreadcrumbToken = mergeToken<BreadcrumbToken>(token, {});
    return [genBreadcrumbStyle(BreadcrumbToken)];
  },
  (token) => ({
    itemColor: token.colorTextDescription,
    lastItemColor: token.colorText,
    iconFontSize: token.fontSize,
    linkColor: token.colorTextDescription,
    linkHoverColor: token.colorText,
    separatorColor: token.colorTextDescription,
    separatorMargin: token.marginXS,
  }),
);
