import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
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
  const {
    componentCls,
    iconCls,
    breadcrumbBaseColor,
    breadcrumbFontSize,
    breadcrumbIconFontSize,
    breadcrumbLinkColor,
    motionDurationFast,
    paddingXXS,
    borderRadiusSM,
    lineHeight,
    fontSize,
    marginXXS,
    breadcrumbLinkColorHover,
    colorBgTextHover,
    breadcrumbSeparatorMargin,
    breadcrumbSeparatorColor,
    fontSizeIcon,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      color: breadcrumbBaseColor,
      fontSize: breadcrumbFontSize,

      [iconCls]: {
        fontSize: breadcrumbIconFontSize,
      },

      ol: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      a: {
        color: breadcrumbLinkColor,
        transition: `color ${motionDurationFast}`,
        padding: `0 ${paddingXXS}px`,
        borderRadius: borderRadiusSM,
        height: lineHeight * fontSize,
        display: 'inline-block',
        marginInline: -marginXXS,

        '&:hover': {
          color: breadcrumbLinkColorHover,
          backgroundColor: colorBgTextHover,
        },

        ...genFocusStyle(token),
      },

      [`li:last-child > ${componentCls}-separator`]: {
        display: 'none',
      },

      [`${componentCls}-separator`]: {
        marginInline: breadcrumbSeparatorMargin,
        color: breadcrumbSeparatorColor,
      },

      [`${componentCls}-link`]: {
        [`
          > ${iconCls} + span,
          > ${iconCls} + a
        `]: {
          marginInlineStart: marginXXS,
        },
      },

      [`${componentCls}-overlay-link`]: {
        borderRadius: borderRadiusSM,
        height: lineHeight * fontSize,
        display: 'inline-block',
        padding: `0 ${paddingXXS}px`,
        marginInline: -marginXXS,

        [`> ${iconCls}`]: {
          marginInlineStart: marginXXS,
          fontSize: fontSizeIcon,
        },

        '&:hover': {
          color: breadcrumbLinkColorHover,
          backgroundColor: colorBgTextHover,

          a: {
            color: breadcrumbLinkColorHover,
          },
        },

        a: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },

      // rtl style
      [`&${componentCls}-rtl`]: {
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
