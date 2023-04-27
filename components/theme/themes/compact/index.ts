import type { DerivativeFunc } from '@ant-design/cssinjs';
import genControlHeight from '../shared/genControlHeight';
import type { SeedToken, MapToken } from '../../interface';
import defaultAlgorithm from '../default';
import genCompactSizeMapToken from './genCompactSizeMapToken';
import getFontSizes from '../shared/genFontSizes';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  const fontSize = mergedMapToken.fontSizes[0]; // Smaller size font-size as base
  const fontSizes = getFontSizes(fontSize);
  const controlHeight = mergedMapToken.controlHeight - 4;

  return {
    ...mergedMapToken,
    ...genCompactSizeMapToken(mapToken ?? token),

    // font
    fontSizes: fontSizes.map((fs) => fs.size),
    lineHeights: fontSizes.map((fs) => fs.lineHeight),

    // controlHeight
    controlHeight,
    ...genControlHeight({ ...mergedMapToken, controlHeight }),
  };
};

export default derivative;
