// Style as status component
import { prepareCommonToken, prepareToken, type TagToken } from '.';
import { genPresetColor, genSubStyleComponent } from '../../theme/internal';

// ============================== Preset ==============================
const genPresetStyle = (token: TagToken) =>
  genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({
    [`${token.componentCls}-${colorKey}`]: {
      color: textColor,
      background: lightColor,
      borderColor: lightBorderColor,
      // Inverse color
      '&-inverse': {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor,
      },
      [`&${token.componentCls}-borderless`]: {
        borderColor: 'transparent',
      },
    },
  }));

// ============================== Export ==============================
export default genSubStyleComponent(
  ['Tag', 'preset'],
  (token) => {
    const tagToken = prepareToken(token);

    return genPresetStyle(tagToken);
  },
  prepareCommonToken,
);
