import type { DerivativeFunc } from '@ant-design/cssinjs';
import { generate } from '@ant-design/colors';
import genColorMapToken from '../shared/genColorMapToken';
import { generateNeutralColorPalettes } from '../dark/palettes';
import type { MapToken, SeedToken } from '../../interface';
import defaultAlgorithm from '../dark';
import type { GenerateColorPalettes } from '../IPalettes';

export const generateColorPalettes: GenerateColorPalettes = (baseColor: string) => {
  const colors = generate(baseColor, { theme: 'dark' });
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[6],
    6: colors[5],
    7: colors[4],
    8: colors[6],
    9: colors[5],
    10: colors[4],
  };
};

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,

    // Radius
    radiusLG: token.radiusBase,
    radiusSM: token.radiusBase,
    radiusXS: token.radiusBase,
    radiusOuter: 5,

    // Colors
    ...genColorMapToken(
      { ...mergedMapToken },
      {
        generateColorPalettes,
        generateNeutralColorPalettes,
      },
    ),
  };
};

export default derivative;
