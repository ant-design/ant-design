import { generate } from '@ant-design/colors';
import type { DerivativeFunc } from '@ant-design/cssinjs';

import type {
  ColorPalettes,
  LegacyColorPalettes,
  MapToken,
  PresetColorType,
  SeedToken,
} from '../../interface';
import defaultAlgorithm from '../default';
import { defaultPresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey) => {
      const colors = generate(token[colorKey as keyof PresetColorType], { theme: 'dark' });

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        prev[`${colorKey}${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes & LegacyColorPalettes;
    })
    .reduce(
      (prev, cur) => {
        prev = {
          ...prev,
          ...cur,
        };
        return prev;
      },
      {} as ColorPalettes & LegacyColorPalettes,
    );

  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,

    // Dark tokens
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
