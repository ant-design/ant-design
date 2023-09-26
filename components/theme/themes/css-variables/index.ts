import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { MapToken, SeedToken } from '../../interface';
import defaultAlgorithm from '../default';
import genColorMapToken from './genColorMapToken';

const derivative: DerivativeFunc<SeedToken, MapToken> = (token, mapToken) => {
  const mergedMapToken = mapToken ?? defaultAlgorithm(token);

  return {
    ...mergedMapToken,
    ...genColorMapToken(mergedMapToken),
  };
};

export default derivative;
