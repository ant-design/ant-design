import type { DerivativeFunc } from '@ant-design/cssinjs';
import { generate } from '@ant-design/colors';
import genColorMapToken from './genColorMapToken';
import type { MapToken, SeedToken } from '../../interface';
import defaultAlgorithm from '../dark';
import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';
import { getAlphaColor, getSolidColor } from '../dark/colorAlgorithm';

const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
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

const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => {
  const colorBgBase = bgBaseColor || '#000';
  const colorTextBase = textBaseColor || '#fff';

  return {
    colorBgBase,
    colorTextBase,

    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.45), // Different from v5
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

    colorBgElevated: getSolidColor(colorBgBase, 12),
    colorBgContainer: getSolidColor(colorBgBase, 8),
    colorBgLayout: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getSolidColor(colorBgBase, 26),

    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19),
    colorSplit: getAlphaColor(colorTextBase, 0.12),
  };
};

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,

    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes,
    }),
  };
};

export default derivative;
