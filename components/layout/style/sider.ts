import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { DEPRECATED_TOKENS, prepareComponentToken } from '.';
import type { LayoutToken } from '.';
import type { GenerateStyle } from '../../theme/interface';
import { genStyleHooks } from '../../theme/internal';

const genSiderStyle: GenerateStyle<LayoutToken, CSSObject> = (token) => {
  const {
    componentCls,
    siderBg,
    motionDurationMid,
    motionDurationSlow,
    antCls,
    triggerHeight,
    triggerColor,
    triggerBg,
    headerHeight,
    zeroTriggerWidth,
    zeroTriggerHeight,
    borderRadiusLG,
    lightSiderBg,
    lightTriggerColor,
    lightTriggerBg,
    bodyBg,
  } = token;

  return {
    [componentCls]: {
      position: 'relative',

      // fix firefox can't set width smaller than content on flex item
      minWidth: 0,
      background: siderBg,
      transition: `all ${motionDurationMid}, background 0s`,

      '&-has-trigger': {
        paddingBottom: triggerHeight,
      },

      '&-right': {
        order: 1,
      },

      [`${componentCls}-children`]: {
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

      [`&-zero-width ${componentCls}-children`]: {
        overflow: 'hidden',
      },

      [`${componentCls}-trigger`]: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        height: triggerHeight,
        color: triggerColor,
        lineHeight: unit(triggerHeight),
        textAlign: 'center',
        background: triggerBg,
        cursor: 'pointer',
        transition: `all ${motionDurationMid}`,
      },

      [`${componentCls}-zero-width-trigger`]: {
        position: 'absolute',
        top: headerHeight,
        insetInlineEnd: token.calc(zeroTriggerWidth).mul(-1).equal(),
        zIndex: 1,
        width: zeroTriggerWidth,
        height: zeroTriggerHeight,
        color: triggerColor,
        fontSize: token.fontSizeXL,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: siderBg,
        borderRadius: `0 ${unit(borderRadiusLG)} ${unit(borderRadiusLG)} 0`,
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
          background: `rgba(255, 255, 255, 0.2)`,
        },

        '&-right': {
          insetInlineStart: token.calc(zeroTriggerWidth).mul(-1).equal(),
          borderRadius: `${unit(borderRadiusLG)} 0 0 ${unit(borderRadiusLG)}`,
        },
      },

      // Light
      '&-light': {
        background: lightSiderBg,

        [`${componentCls}-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg,
        },

        [`${componentCls}-zero-width-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg,
          border: `1px solid ${bodyBg}`, // Safe to modify to any other color
          borderInlineStart: 0,
        },
      },
    },
  };
};

export default genStyleHooks(
  ['Layout', 'Sider'],
  (token) => [genSiderStyle(token)],
  prepareComponentToken,
  {
    deprecatedTokens: DEPRECATED_TOKENS,
  },
);
