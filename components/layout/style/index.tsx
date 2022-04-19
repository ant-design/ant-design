// deps-lint-skip-all
// import '../../style/index.less';
// import './index.less';
// import { TinyColor } from '@ctrl/tinycolor';
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import genLayoutLightStyle from './light';

export interface LayoutToken extends FullToken<'Steps'> {
  // Layout
  layoutBodyBackground: string;
  layoutHeaderBackground: string;
  layoutHeaderHeight: number;
  layoutHeaderPadding: string;
  layoutHeaderColor: string;
  layoutFooterPadding: string;
  layoutFooterBackground: string;
  layoutSiderBackground: string;
  layoutTriggerHeight: number;
  layoutTriggerBackground: string;
  layoutTriggerColor: string;
  layoutZeroTriggerWidth: number;
  layoutZeroTriggerHeight: number;
  // Layout Light Theme
  layoutSiderBackgroundLight: string;
  layoutTriggerBackgroundLight: string;
  layoutTriggerColorLight: string;
}

const genLayoutStyle: GenerateStyle<LayoutToken, CSSObject> = token => {
  const {
    antCls,
    componentCls, // .ant-layout
    colorText,
    layoutBodyBackground,
    layoutHeaderHeight,
    layoutHeaderPadding,
    layoutHeaderColor,
    layoutHeaderBackground,
    layoutFooterPadding,
    layoutFooterBackground,
    layoutSiderBackground,
    layoutTriggerHeight,
    layoutTriggerColor,
    layoutTriggerBackground,
    layoutZeroTriggerWidth,
    layoutZeroTriggerHeight,
    fontSizeBase,
    radiusBase,
  } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',

      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: layoutBodyBackground,

      '&, *': {
        boxSizing: 'border-box',
      },

      [`&${componentCls}-has-sider`]: {
        flexDirection: 'row',
        [`> ${componentCls}, > ${componentCls}-content`]: {
          width: 0, // https://segmentfault.com/a/1190000019498300
        },
      },

      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: '0 0 auto',
      },

      [`${componentCls}-header`]: {
        height: layoutHeaderHeight,
        padding: layoutHeaderPadding,
        color: layoutHeaderColor,
        lineHeight: `${layoutHeaderHeight}px`,
        background: layoutHeaderBackground,
      },

      [`${componentCls}-footer`]: {
        padding: layoutFooterPadding,
        color: colorText,
        fontSize: fontSizeBase,
        background: layoutFooterBackground,
      },

      [`${componentCls}-content`]: {
        flex: 'auto',

        // fix firefox can't set height smaller than content on flex item
        minHeight: 0,
      },

      [`${componentCls}-sider`]: {
        position: 'relative',

        // fix firefox can't set width smaller than content on flex item
        minWidth: 0,
        background: layoutSiderBackground,
        transition: 'all 0.2s',

        '&-children': {
          height: '100%',
          marginTop: -0.1,
          // Hack for fixing margin collaspe bug
          // https://github.com/ant-design/ant-design/issues/7967
          // solution from https://stackoverflow.com/a/33132624/3040605
          paddingTop: 0.1,

          [`${antCls}-menu${antCls}menu-inline-collapsed`]: {
            width: 'auto',
          },
        },

        '&-has-trigger': {
          paddingBottom: layoutTriggerHeight,
        },

        '&-right': {
          order: 1,
        },

        '&-trigger': {
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
          height: layoutTriggerHeight,
          color: layoutTriggerColor,
          lineHeight: layoutTriggerHeight,
          textAlign: 'center',
          background: layoutTriggerBackground,
          cursor: 'pointer',
          transition: 'all 0.2s',
        },

        '&-zero-width': {
          '> *': {
            overflow: 'hidden',
          },

          '&-trigger': {
            position: 'absolute',
            top: layoutHeaderHeight,
            right: -layoutZeroTriggerWidth,
            zIndex: 1,
            width: layoutZeroTriggerWidth,
            height: layoutZeroTriggerHeight,
            color: layoutTriggerColor,
            fontSize: layoutZeroTriggerWidth / 2,
            lineHeight: layoutZeroTriggerHeight,
            textAlign: 'center',
            background: layoutSiderBackground,
            borderRadius: `0 ${radiusBase} ${radiusBase} 0`,
            cursor: 'pointer',
            transition: 'background 0.3s ease',

            '&::after': {
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: 'transparent',
              transition: 'all 0.3s',
              content: '',
            },

            '&:hover::after': {
              background: 'rgba(255, 255, 255, 0.1)',
            },

            '&-right': {
              left: -layoutZeroTriggerWidth,
              borderRadius: `${radiusBase} 0 0 ${radiusBase}`,
            },
          },
        },
      },
      // Light
      ...genLayoutLightStyle(token),
      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Layout', token => {
  const layoutHeaderBackground = '#001529'; // FIXME: hardcode in v4
  const layoutBodyBackground = '#F0f2f5'; // FIXME: hardcode in v4
  const { colorText } = token;
  console.log('@@@:', token);

  const layoutToken = mergeToken<LayoutToken>(token, {
    // Layout
    layoutBodyBackground,
    layoutHeaderBackground,
    layoutHeaderHeight: 64, // FIXME: hardcode in v4
    layoutHeaderPadding: '0 50px', // FIXME: hardcode in v4
    layoutHeaderColor: colorText,
    layoutFooterPadding: '24px 50px', // FIXME: hardcode in v4
    layoutFooterBackground: layoutBodyBackground,
    layoutSiderBackground: layoutHeaderBackground,
    layoutTriggerHeight: 48, // FIXME: hardcode in v4
    layoutTriggerBackground: '#002140', // FIXME: hardcode in v4
    layoutTriggerColor: '#Fff', // FIXME: hardcode in v4
    layoutZeroTriggerWidth: 36, // FIXME: hardcode in v4
    layoutZeroTriggerHeight: 42, // FIXME: hardcode in v4
    // Layout Light Theme
    layoutSiderBackgroundLight: '#Fff', // FIXME: hardcode in v4
    layoutTriggerBackgroundLight: '#Fff', // FIXME: hardcode in v4
    layoutTriggerColorLight: colorText,

    // Layout component less variable
  });

  return [genLayoutStyle(layoutToken)];
});
