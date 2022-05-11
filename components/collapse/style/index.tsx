// import '../../style/index.less';
// import './index.less';

// deps-lint-skip-all
import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';

type CollapseToken = FullToken<'Collapse'> & {
  collapseContentBg: string;
  collapseContentPadding: number;
  collapseHeaderBg: string;
  collapseHeaderPadding: string;
  collapseHeaderPaddingExtra: number;
  collapsePanelBorderRadius: number;
};

export const genBaseStyle: GenerateStyle<CollapseToken> = token => {
  const {
    componentCls,
    collapseContentBg,
    collapseContentPadding,
    collapseHeaderBg,
    collapseHeaderPadding,
    collapseHeaderPaddingExtra,
    collapsePanelBorderRadius,

    controlLineWidth,
    controlLineType,
    colorBorder,
    colorText,
    colorTextHeading,
    colorTextDisabled,
    lineHeight,
    marginSM,
    padding,
    paddingSM,
    fontSizeSM,
  } = token;

  const borderBase = `${controlLineWidth}px ${controlLineType} ${colorBorder}`;

  return {
    [componentCls]: {
      ...resetComponent(token),
      backgroundColor: collapseHeaderBg,
      border: borderBase,
      borderBottom: 0,
      borderRadius: `${collapsePanelBorderRadius}px`,

      [`&-rtl`]: {
        direction: 'rtl',
      },

      [`& > ${componentCls}-item`]: {
        borderBottom: borderBase,
        [`&:last-child`]: {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`,
          },
        },

        [`> ${componentCls}-header`]: {
          position: 'relative', // Compatible with old version of antd, should remove in next version
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          padding: collapseHeaderPadding,
          color: colorTextHeading,
          lineHeight,
          cursor: 'pointer',
          transition: `all 0.3s, visibility 0s`,

          [`${componentCls}-arrow`]: {
            display: 'inline-block',
            marginInlineEnd: marginSM,
            fontSize: fontSizeSM,
            // FIXME
            verticalAlign: '-1px',

            [`${componentCls}-rtl &`]: {},

            [`& svg`]: {
              // FIXME
              transition: 'transform 0.24s',
            },
          },

          [`${componentCls}-extra`]: {
            marginInlineStart: 'auto',
          },

          [`&:focus`]: {
            outline: 'none',
          },
        },

        [`${componentCls}-header-collapsible-only`]: {
          cursor: 'default',

          [`${componentCls}-header-text`]: {
            cursor: 'pointer',
          },
        },

        [`&${componentCls}-no-arrow`]: {
          [`> ${componentCls}-header`]: {
            paddingInlineStart: paddingSM,
          },
        },
      },

      [`&-icon-position-right`]: {
        [`& > ${componentCls}-item `]: {
          [`> ${componentCls}-header`]: {
            position: 'relative',
            padding: collapseHeaderPadding,
            paddingInlineEnd: collapseHeaderPaddingExtra,

            [`${componentCls}-arrow`]: {
              position: 'absolute',
              top: '50%',
              insetInlineEnd: padding,
              insetInlineStart: 'auto',
              margin: 0,
              transform: 'translateY(-50%)',
            },
          },
        },
      },

      [`${componentCls}-content`]: {
        color: colorText,
        backgroundColor: collapseContentBg,
        borderTop: borderBase,

        [`& > ${componentCls}-content-box`]: {
          padding: collapseContentPadding,
        },

        [`&-hidden`]: {
          display: 'none',
        },
      },

      [`${componentCls}-item:last-child`]: {
        [`> ${componentCls}-content`]: {
          borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`,
        },
      },

      [`& ${componentCls}-item-disabled > ${componentCls}-header`]: {
        [`
          &,
          & > .arrow
        `]: {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      [`&-ghost`]: {
        backgroundColor: 'transparent',
        border: 0,
        [`> ${componentCls}-item`]: {
          borderBottom: 0,
          [`> ${componentCls}-content`]: {
            backgroundColor: 'transparent',
            border: 0,
            [`> ${componentCls}-content-box`]: {
              // FIXME
              paddingTop: 12,
              paddingBottom: 12,
            },
          },
        },
      },
    },
  };
};

const genBorderlessStyle: GenerateStyle<CollapseToken> = token => {
  const {
    componentCls,
    collapseHeaderBg,

    colorBorder,
  } = token;

  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: collapseHeaderBg,
      border: 0,

      [`> ${componentCls}-item`]: {
        borderBottom: `1px solid ${colorBorder}`,
      },

      [`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: {
        borderRadius: 0,
      },

      [`> ${componentCls}-item:last-child`]: {
        borderBottom: 0,
      },

      [`> ${componentCls}-item > ${componentCls}-content`]: {
        backgroundColor: 'transparent',
        borderTop: 0,
      },

      [`> ${componentCls}-item > ${componentCls}-content > ${componentCls}-content-box`]: {
        // FIXME
        paddingTop: 4,
      },
    },
  };
};

export const genCollapseStyle: GenerateStyle<CollapseToken> = (
  token: CollapseToken,
): CSSInterpolation => [genBaseStyle(token), genBorderlessStyle(token)];

export default genComponentStyleHook('Collapse', token => {
  const collapseToken = mergeToken<CollapseToken>(token, {
    collapseContentBg: token.colorBgComponent,
    collapseContentPadding: token.padding,
    collapseHeaderBg: token.colorBgComponentSecondary,
    collapseHeaderPadding: `${token.paddingSM}px ${token.padding}px`,
    // FIXME
    collapseHeaderPaddingExtra: 40,
    collapsePanelBorderRadius: token.radiusBase,
  });

  return [genCollapseStyle(collapseToken)];
});
