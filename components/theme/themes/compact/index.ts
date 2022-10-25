import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { SeedToken, MapToken } from '../../interface';
import defaultAlgorithm from '../default';
import genCompactSizeMapToken from './genCompactSizeMapToken';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,
    ...genCompactSizeMapToken(token),
  };
};

export default derivative;
