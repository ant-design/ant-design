import type { DerivativeFunc } from '@ant-design/cssinjs';

import type { MapToken, SeedToken } from '../../interface';
import defaultAlgorithm from '../default';
import genControlHeight from '../shared/genControlHeight';
import genFontMapToken from '../shared/genFontMapToken';
import genCompactSizeMapToken from './genCompactSizeMapToken';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  const fontSize = mergedMapToken.fontSizeSM; // Smaller size font-size as base
  const fontMapToken = genFontMapToken(fontSize);
  const controlHeight = mergedMapToken.controlHeight - 4;
  const controlHeightMapToken = genControlHeight({ ...mergedMapToken, controlHeight });

  return {
    ...mergedMapToken,
    ...genCompactSizeMapToken(mapToken ?? token),

    // font
    ...fontMapToken,

    // controlHeight
    controlHeight,
    ...controlHeightMapToken,
    controlHeightSM: Math.max(
      controlHeightMapToken.controlHeightSM,
      fontMapToken.fontHeight + mergedMapToken.lineWidth * 2,
    ),
  };
};

export default derivative;
