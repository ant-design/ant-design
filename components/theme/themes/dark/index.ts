import { generate } from '@ant-design/colors';
import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import genCommonMapToken from '../shared/genCommonMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './palettes';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token[colorKey], { theme: 'dark' });

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  const colorBgBase = token.colorBgBase || '#000';
  const colorTextBase = token.colorTextBase || '#fff';

  return {
    ...token,

    // Other tokens
    ...(mapToken ?? genCommonMapToken(token)),

    // Dark tokens
    ...colorPalettes,
    colorBgBase,
    colorTextBase,
    // Colors
    ...genColorMapToken(
      { ...token, colorBgBase, colorTextBase },
      {
        generateColorPalettes,
        generateNeutralColorPalettes,
      },
    ),
  };
};

export default derivative;
