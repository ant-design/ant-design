import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { genFocusStyle, resetComponent } from '../../style';

interface BreadcrumbToken extends FullToken<'Breadcrumb'> {
  breadcrumbBaseColor: string;
  breadcrumbFontSize: number;
  breadcrumbIconFontSize: number;
  breadcrumbLinkColor: string;
  breadcrumbLinkColorHover: string;
  breadcrumbLastItemColor: string;
  breadcrumbSeparatorMargin: number;
  breadcrumbSeparatorColor: string;
}

const genBreadcrumbStyle: GenerateStyle<BreadcrumbToken, CSSObject> = (token) => {
  const { componentCls, iconCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      color: token.breadcrumbBaseColor,
      fontSize: token.breadcrumbFontSize,

      [iconCls]: {
        fontSize: token.breadcrumbIconFontSize,
      },

      ol: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      a: {
        color: token.breadcrumbLinkColor,
        transition: `color ${token.motionDurationMid}`,
        padding: `0 ${token.paddingXXS}px`,
        borderRadius: token.borderRadiusSM,
        height: token.lineHeight * token.fontSize,
        display: 'inline-block',
        marginInline: -token.marginXXS,

        '&:hover': {
          color: token.breadcrumbLinkColorHover,
          backgroundColor: token.colorBgTextHover,
        },

        ...genFocusStyle(token),
      },

      [`li:last-child`]: {
        color: token.breadcrumbLastItemColor,
      },

      [`${componentCls}-separator`]: {
        marginInline: token.breadcrumbSeparatorMargin,
        color: token.breadcrumbSeparatorColor,
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
          color: token.breadcrumbLinkColorHover,
          backgroundColor: token.colorBgTextHover,

          a: {
            color: token.breadcrumbLinkColorHover,
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
export default genComponentStyleHook('Breadcrumb', (token) => {
  const BreadcrumbToken = mergeToken<BreadcrumbToken>(token, {
    breadcrumbBaseColor: token.colorTextDescription,
    breadcrumbFontSize: token.fontSize,
    breadcrumbIconFontSize: token.fontSize,
    breadcrumbLinkColor: token.colorTextDescription,
    breadcrumbLinkColorHover: token.colorText,
    breadcrumbLastItemColor: token.colorText,
    breadcrumbSeparatorMargin: token.marginXS,
    breadcrumbSeparatorColor: token.colorTextDescription,
  });

  return [genBreadcrumbStyle(BreadcrumbToken)];
});
