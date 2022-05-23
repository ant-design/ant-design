// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';

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

const genBreadcrumbStyle: GenerateStyle<BreadcrumbToken, CSSObject> = token => {
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
        transition: `color ${token.motionDurationSlow}`,

        '&:hover': {
          color: token.breadcrumbLinkColorHover,
        },
      },

      'li:last-child': {
        color: token.breadcrumbLastItemColor,

        a: {
          color: token.breadcrumbLastItemColor,
        },
      },

      [`li:last-child ${componentCls}-separator`]: {
        display: 'none',
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
        [`> ${iconCls}`]: {
          marginInlineStart: token.marginXXS,
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
export default genComponentStyleHook('Breadcrumb', token => {
  const BreadcrumbToken = mergeToken<BreadcrumbToken>(token, {
    // FIXME: missing token
    breadcrumbBaseColor: token.colorTextSecondary,
    breadcrumbFontSize: token.fontSizeBase,
    breadcrumbIconFontSize: token.fontSizeBase,
    breadcrumbLinkColor: token.colorTextSecondary,
    breadcrumbLinkColorHover: token.colorText,
    breadcrumbLastItemColor: token.colorText,
    breadcrumbSeparatorMargin: token.paddingXS,
    breadcrumbSeparatorColor: token.colorTextSecondary,
  });

  return [genBreadcrumbStyle(BreadcrumbToken)];
});
