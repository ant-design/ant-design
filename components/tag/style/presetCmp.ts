// Style as status component
import { FastColor } from '@ant-design/fast-color';

import { prepareComponentToken, prepareToken } from '.';
import type { TagToken } from '.';
import { genPresetColor, genSubStyleComponent } from '../../theme/internal';

// ============================== Preset ==============================
const genPresetStyle = (token: TagToken) => {
  const isDarkMode = new FastColor(token.colorBgBase).toHsl().l < 0.5;

  return genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({
    [`${token.componentCls}${token.componentCls}-${colorKey}:not(${token.componentCls}-disabled)`]:
      {
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
        [`&${token.componentCls}-filled`]: isDarkMode
          ? {
              backgroundColor: new FastColor(darkColor).setA(0.15).toRgbString(),
              color: darkColor,
            }
          : {
              backgroundColor: lightColor,
              color: textColor,
            },
      },
  }));
};

// ============================== Export ==============================
export default genSubStyleComponent<'Tag'>(
  ['Tag', 'preset'],
  (token) => {
    const tagToken = prepareToken(token);
    return genPresetStyle(tagToken);
  },
  prepareComponentToken,
);
