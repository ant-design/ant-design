import { unit } from '@ant-design/cssinjs';

import { prepareComponentToken, prepareToken } from '.';
import type { BadgeToken } from '.';
import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/internal';
import { genPresetColor, genStyleHooks } from '../../theme/internal';

// ============================== Ribbon ==============================
const genRibbonStyle: GenerateStyle<BadgeToken> = (token) => {
  const { antCls, badgeFontHeight, marginXS, badgeRibbonOffset, calc } = token;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;

  const statusRibbonPreset = genPresetColor(token, (colorKey, { darkColor }) => ({
    [`&${ribbonPrefixCls}-color-${colorKey}`]: {
      background: darkColor,
      color: darkColor,
    },
  }));

  return {
    [`${ribbonWrapperPrefixCls}`]: {
      position: 'relative',
    },
    [`${ribbonPrefixCls}`]: {
      ...resetComponent(token),
      position: 'absolute',
      top: marginXS,
      padding: `0 ${unit(token.paddingXS)}`,
      color: token.colorPrimary,
      lineHeight: unit(badgeFontHeight),
      whiteSpace: 'nowrap',
      backgroundColor: token.colorPrimary,
      borderRadius: token.borderRadiusSM,
      [`${ribbonPrefixCls}-text`]: {
        color: token.colorTextLightSolid,
      },
      [`${ribbonPrefixCls}-corner`]: {
        position: 'absolute',
        top: '100%',
        width: badgeRibbonOffset,
        height: badgeRibbonOffset,
        color: 'currentcolor',
        border: `${unit(calc(badgeRibbonOffset).div(2).equal())} solid`,
        transform: token.badgeRibbonCornerTransform,
        transformOrigin: 'top',
        filter: token.badgeRibbonCornerFilter,
      },
      ...statusRibbonPreset,
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndEndRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderInlineEndColor: 'transparent',
          borderBlockEndColor: 'transparent',
        },
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndStartRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderBlockEndColor: 'transparent',
          borderInlineStartColor: 'transparent',
        },
      },

      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  ['Badge', 'Ribbon'],
  (token) => {
    const badgeToken = prepareToken(token);
    return genRibbonStyle(badgeToken);
  },
  prepareComponentToken,
);
