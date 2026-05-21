// Style as status component
import { prepareComponentToken, prepareToken } from '.';
import type { TagToken } from '.';
import { genPresetColor, genSubStyleComponent } from '../../theme/internal';

// ============================== Preset ==============================
const genPresetStyle = (token: TagToken) =>
  genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({
    [`${token.componentCls}${token.componentCls}-${colorKey}:not(${token.componentCls}-disabled)`]: {
      [`&${token.componentCls}-outlined`]: {
        backgroundColor: lightColor,
        borderColor: lightBorderColor,
        color: textColor,
      },
      [`&${token.componentCls}-solid`]: {
        backgroundColor: darkColor,
        borderColor: darkColor,
        color: token.colorTextLightSolid,
      },
      [`&${token.componentCls}-filled`]: {
        backgroundColor: lightColor,
        color: textColor,
      },

      // CheckableTag preset color support
      [`&${token.componentCls}-checkable`]: {
        color: textColor,

        [`&:not(${token.componentCls}-checkable-checked):hover`]: {
          color: textColor,
          backgroundColor: lightColor,
        },

        [`&${token.componentCls}-checkable-checked`]: {
          color: token.colorTextLightSolid,
          backgroundColor: darkColor,
          '&:hover': {
            backgroundColor: darkColor,
          },
        },

        '&:active': {
          backgroundColor: darkColor,
        },
      },
    },
  }));

// ============================== Export ==============================
export default genSubStyleComponent<'Tag'>(
  ['Tag', 'preset'],
  (token) => {
    const tagToken = prepareToken(token);
    return genPresetStyle(tagToken);
  },
  prepareComponentToken,
);
