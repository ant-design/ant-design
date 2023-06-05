import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genLayoutLightStyle from './light';

export interface ComponentToken {
  colorBgHeader: string;
  colorBgBody: string;
  colorBgTrigger: string;
}

export interface LayoutToken extends FullToken<'Layout'> {
  // Layout
  layoutHeaderHeight: number;
  layoutHeaderPaddingInline: number;
  layoutHeaderColor: string;
  layoutFooterPadding: string;
  layoutTriggerHeight: number;
  layoutZeroTriggerSize: number;
}

const genLayoutStyle: GenerateStyle<LayoutToken, CSSObject> = (token) => {
  const {
    antCls, // .ant
    componentCls, // .ant-layout
    colorText,
    colorTextLightSolid,
    colorBgHeader,
    colorBgBody,
    colorBgTrigger,
    layoutHeaderHeight,
    layoutHeaderPaddingInline,
    layoutHeaderColor,
    layoutFooterPadding,
    layoutTriggerHeight,
    layoutZeroTriggerSize,
    motionDurationMid,
    motionDurationSlow,
    fontSize,
    borderRadius,
  } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flex: 'auto',
      flexDirection: 'column',

      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: colorBgBody,

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

      [`${componentCls}-sider`]: {
        position: 'relative',

        // fix firefox can't set width smaller than content on flex item
        minWidth: 0,
        background: colorBgHeader,
        transition: `all ${motionDurationMid}, background 0s`,

        '&-children': {
          height: '100%',
          // Hack for fixing margin collapse bug
          // https://github.com/ant-design/ant-design/issues/7967
          // solution from https://stackoverflow.com/a/33132624/3040605
          marginTop: -0.1,
          paddingTop: 0.1,

          [`${antCls}-menu${antCls}-menu-inline-collapsed`]: {
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
          color: colorTextLightSolid,
          lineHeight: `${layoutTriggerHeight}px`,
          textAlign: 'center',
          background: colorBgTrigger,
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
            insetInlineEnd: -layoutZeroTriggerSize,
            zIndex: 1,
            width: layoutZeroTriggerSize,
            height: layoutZeroTriggerSize,
            color: colorTextLightSolid,
            fontSize: token.fontSizeXL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colorBgHeader,
            borderStartStartRadius: 0,
            borderStartEndRadius: borderRadius,
            borderEndEndRadius: borderRadius,
            borderEndStartRadius: 0,

            cursor: 'pointer',
            transition: `background ${motionDurationSlow} ease`,

            '&::after': {
              position: 'absolute',
              inset: 0,
              background: 'transparent',
              transition: `all ${motionDurationSlow}`,
              content: '""',
            },

            '&:hover::after': {
              // FIXME: Hardcode, but seems no need to create a token for this
              background: `rgba(255, 255, 255, 0.2)`,
            },

            '&-right': {
              insetInlineStart: -layoutZeroTriggerSize,
              borderStartStartRadius: borderRadius,
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
              borderEndStartRadius: borderRadius,
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

    // ==================== Header ====================
    [`${componentCls}-header`]: {
      height: layoutHeaderHeight,
      paddingInline: layoutHeaderPaddingInline,
      color: layoutHeaderColor,
      lineHeight: `${layoutHeaderHeight}px`,
      background: colorBgHeader,

      // Other components/menu/style/index.less line:686
      // Integration with header element so menu items have the same height
      [`${antCls}-menu`]: {
        lineHeight: 'inherit',
      },
    },

    // ==================== Footer ====================
    [`${componentCls}-footer`]: {
      padding: layoutFooterPadding,
      color: colorText,
      fontSize,
      background: colorBgBody,
    },

    // =================== Content ====================
    [`${componentCls}-content`]: {
      flex: 'auto',

      // fix firefox can't set height smaller than content on flex item
      minHeight: 0,
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Layout',
  (token) => {
    const { colorText, controlHeightSM, controlHeight, controlHeightLG, marginXXS } = token;
    const layoutHeaderPaddingInline = controlHeightLG * 1.25;

    const layoutToken = mergeToken<LayoutToken>(token, {
      // Layout
      layoutHeaderHeight: controlHeight * 2,
      layoutHeaderPaddingInline,
      layoutHeaderColor: colorText,
      layoutFooterPadding: `${controlHeightSM}px ${layoutHeaderPaddingInline}px`,
      layoutTriggerHeight: controlHeightLG + marginXXS * 2, // = item height + margin
      layoutZeroTriggerSize: controlHeightLG,
    });

    return [genLayoutStyle(layoutToken)];
  },
  (token) => {
    const { colorBgLayout } = token;

    return {
      colorBgHeader: '#001529',
      colorBgBody: colorBgLayout,
      colorBgTrigger: '#002140',
    };
  },
);
