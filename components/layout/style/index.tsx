// deps-lint-skip-all
// import '../../style/index.less';
// import './index.less';
import { TinyColor } from '@ctrl/tinycolor';
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import genLayoutLightStyle from './light';

export interface LayoutToken extends FullToken<'Layout'> {
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
    antCls, // .ant
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
    motionDurationMid,
    motionDurationSlow,
    fontSizeBase,
    radiusBase,
  } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',

      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0, // FIXME: hardcode in v4
      background: layoutBodyBackground,

      '&, *': {
        boxSizing: 'border-box',
      },

      [`&${componentCls}-has-sider`]: {
        flexDirection: 'row',
        [`> ${componentCls}, > ${componentCls}-content`]: {
          width: 0, // https://segmentfault.com/a/1190000019498300 // FIXME: hardcode in v4
        },
      },

      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: '0 0 auto', // FIXME: hardcode in v4
      },

      [`${componentCls}-header`]: {
        height: layoutHeaderHeight,
        padding: layoutHeaderPadding,
        color: layoutHeaderColor,
        lineHeight: `${layoutHeaderHeight}px`,
        background: layoutHeaderBackground,
        // Other components/menu/style/index.less line:686
        // Integration with header element so menu items have the same height
        [`${antCls}-menu`]: {
          lineHeight: 'inherit',
        },
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
        minHeight: 0, // FIXME: hardcode in v4
      },

      [`${componentCls}-sider`]: {
        position: 'relative',

        // fix firefox can't set width smaller than content on flex item
        minWidth: 0, // FIXME: hardcode in v4
        background: layoutSiderBackground,
        transition: `all ${motionDurationMid}`,

        '&-children': {
          height: '100%', // FIXME: hardcode in v4
          marginTop: -0.1, // FIXME: hardcode in v4
          // Hack for fixing margin collaspe bug
          // https://github.com/ant-design/ant-design/issues/7967
          // solution from https://stackoverflow.com/a/33132624/3040605
          paddingTop: 0.1, // FIXME: hardcode in v4

          [`${antCls}-menu${antCls}menu-inline-collapsed`]: {
            width: 'auto',
          },
        },

        '&-has-trigger': {
          paddingBottom: layoutTriggerHeight,
        },

        '&-right': {
          order: 1, // FIXME: hardcode in v4
        },

        '&-trigger': {
          position: 'fixed',
          bottom: 0, // FIXME: hardcode in v4
          zIndex: 1, // FIXME: hardcode in v4
          height: layoutTriggerHeight,
          color: layoutTriggerColor,
          lineHeight: `${layoutTriggerHeight}px`,
          textAlign: 'center',
          background: layoutTriggerBackground,
          cursor: 'pointer',
          transition: `all ${motionDurationMid}`,
        },

        '&-zero-width': {
          '> *': {
            overflow: 'hidden',
          },

          '&-trigger': {
            position: 'absolute',
            top: layoutHeaderHeight,
            insetInlineEnd: -layoutZeroTriggerWidth,
            zIndex: 1, // FIXME: hardcode in v4
            width: layoutZeroTriggerWidth,
            height: layoutZeroTriggerHeight,
            color: layoutTriggerColor,
            fontSize: layoutZeroTriggerWidth / 2, // FIXME: hardcode in v4
            lineHeight: `${layoutZeroTriggerHeight}px`,
            textAlign: 'center',
            background: layoutSiderBackground,
            // borderRadius: `0 ${radiusBase} ${radiusBase} 0`,
            borderStartStartRadius: 0, // FIXME: hardcode in v4
            borderStartEndRadius: radiusBase,
            borderEndEndRadius: radiusBase,
            borderEndStartRadius: 0, // FIXME: hardcode in v4

            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&::after': {
              position: 'absolute',
              top: 0, // FIXME: hardcode in v4
              insetInlineEnd: 0, // FIXME: hardcode in v4
              bottom: 0, // FIXME: hardcode in v4
              insetInlineStart: 0, // FIXME: hardcode in v4
              background: 'transparent',
              transition: `all ${motionDurationSlow}`,
              content: '""',
            },

            '&:hover::after': {
              background: new TinyColor('#fff').setAlpha(0.1).toRgbString(), // FIXME: hardcode in v4
            },

            '&-right': {
              insetInlineStart: -layoutZeroTriggerWidth,
              // borderRadius: `${radiusBase} 0 0 ${radiusBase}`,
              borderStartStartRadius: radiusBase,
              borderStartEndRadius: 0, // FIXME: hardcode in v4
              borderEndEndRadius: 0, // FIXME: hardcode in v4
              borderEndStartRadius: radiusBase,
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
  const layoutBodyBackground = '#f0f2f5'; // FIXME: hardcode in v4
  const { colorText } = token;

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
    layoutTriggerColor: '#fff', // FIXME: hardcode in v4
    layoutZeroTriggerWidth: 36, // FIXME: hardcode in v4
    layoutZeroTriggerHeight: 42, // FIXME: hardcode in v4
    // Layout Light Theme
    layoutSiderBackgroundLight: '#fff', // FIXME: hardcode in v4
    layoutTriggerBackgroundLight: '#fff', // FIXME: hardcode in v4
    layoutTriggerColorLight: colorText,
  });

  return [genLayoutStyle(layoutToken)];
});
