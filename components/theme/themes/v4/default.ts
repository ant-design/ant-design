import type { DerivativeFunc } from '@ant-design/cssinjs';
import { generate } from '@ant-design/colors';
import genColorMapToken from '../shared/genColorMapToken';
import { generateNeutralColorPalettes } from '../default/palettes';
import type { MapToken, SeedToken } from '../../interface';
import defaultAlgorithm from '../default';
import type { GenerateColorPalettes } from '../IPalettes';

export const generateColorPalettes: GenerateColorPalettes = (baseColor: string) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6],
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
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
