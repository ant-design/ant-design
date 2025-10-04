import { generate } from '@ant-design/colors';
import type { DerivativeFunc } from '@ant-design/cssinjs';

import type { MapToken, PresetColorType, SeedToken } from '../../interface';
import defaultAlgorithm from '../default';
import { defaultPresetColors } from '../seed';
import genColorMapToken from '../shared/genColorMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey) => {
      const colors = generate(token[colorKey as keyof PresetColorType], { theme: 'dark' });
      return Array.from({ length: 10 }, () => 1).reduce<Record<string, string>>((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        prev[`${colorKey}${i + 1}`] = colors[i];
        return prev;
      }, {});
    })
    .reduce((prev, cur) => {
      prev = { ...prev, ...cur };
      return prev;
    }, {});

  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  const colorMapToken = genColorMapToken(token, {
    generateColorPalettes,
    generateNeutralColorPalettes,
  });

  return {
    ...mergedMapToken,

    // Dark tokens
    ...colorPalettes,

    // Colors
    ...colorMapToken,

    // Customize selected item background color
    // https://github.com/ant-design/ant-design/issues/30524#issuecomment-871961867
    colorPrimaryBg: colorMapToken.colorPrimaryBorder,
    colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover,
  };
};

export default derivative;
