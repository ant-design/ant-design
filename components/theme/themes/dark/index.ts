import { generate } from '@ant-design/colors';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import genCommonMapToken from '../shared/genCommonMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './palettes';

export default function derivative(token: SeedToken): MapToken {
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

    ...genCommonMapToken(token),
  };
}
