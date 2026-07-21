// Style as status component
import { prepareComponentToken, prepareToken } from '.';
import type { TagToken } from '.';
import { genPresetColor, genSubStyleComponent } from '../../theme/internal';

// ============================== Preset ==============================
const genPresetStyle = (token: TagToken) =>
  genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({
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
        [`&${token.componentCls}-filled`]: {
          // `xxxFilledBg` is resolved in `prepareComponentToken` (dark-mode-aware there;
          // a plain passthrough of `lightColor` in light mode), since color math can't
          // safely happen in this function under `cssVar` theming.
          backgroundColor: token[`${colorKey}FilledBg`] ?? lightColor,
          color: textColor,
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
